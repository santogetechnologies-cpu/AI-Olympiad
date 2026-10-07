import { type LessonJourneyData } from '../../services/curriculumData'
import { InteractivePlayfulLessonEngine } from './InteractivePlayfulLessonEngine'
import { Class3PlayfulGameExperience } from './Class3PlayfulGameExperience'
import { Class4PixelQuestExperience } from './Class4PixelQuestExperience'
import { Class5CyberDetectiveExperience } from './Class5CyberDetectiveExperience'
import { Class6AlgorithmArenaExperience } from './Class6AlgorithmArenaExperience'
import { Class7PythonOdysseyExperience } from './Class7PythonOdysseyExperience'
import { Class8NeuralForgeExperience } from './Class8NeuralForgeExperience'
import { Class9DataSciencePlanetExperience } from './Class9DataSciencePlanetExperience'
import { Class10SmartCityArchitectExperience } from './Class10SmartCityArchitectExperience'
import { Class11DeepNeuralForgeExperience } from './Class11DeepNeuralForgeExperience'
import { Class12TransformerNexusExperience } from './Class12TransformerNexusExperience'
import { UGSystemsEngineeringExperience } from './UGSystemsEngineeringExperience'
import { PGResearchOptimizationExperience } from './PGResearchOptimizationExperience'

export interface TierSpecificVisualLessonContentProps {
  gradeKey: string
  tier?: 'primary' | 'middle' | 'secondary' | 'ug' | 'pg'
  chapterNum: string | number
  lessonNumber: 1 | 2
  topicTitle: string
  chapterTitle: string
  journey?: LessonJourneyData
  htmlContent?: string
  isCompleted?: boolean
  onComplete?: () => void
}

export function TierSpecificVisualLessonContent({
  gradeKey,
  tier: _tier,
  chapterNum,
  lessonNumber,
  topicTitle,
  chapterTitle,
  journey,
  htmlContent,
  isCompleted = false,
  onComplete,
}: TierSpecificVisualLessonContentProps) {
  const gKey = (gradeKey || 'class3').toLowerCase().trim()

  // 1. CLASS 3: Playful Voice Pet, Sticker Toybox, Object Discovery
  if (gKey === 'class3') {
    return (
      <Class3PlayfulGameExperience
        chapterNum={chapterNum}
        chapterTitle={chapterTitle}
        topicTitle={topicTitle}
        lessonNumber={lessonNumber}
        onComplete={onComplete}
      />
    )
  }

  // 2. CLASS 4: Pixel Quest, Sprite Adventure & Grid Path
  if (gKey === 'class4') {
    return (
      <Class4PixelQuestExperience
        chapterNum={chapterNum}
        chapterTitle={chapterTitle}
        topicTitle={topicTitle}
        lessonNumber={lessonNumber}
        onComplete={onComplete}
      />
    )
  }

  // 3. CLASS 5: Cyber Detective, Mystery Clues & Evidence Board
  if (gKey === 'class5') {
    return (
      <Class5CyberDetectiveExperience
        chapterNum={chapterNum}
        chapterTitle={chapterTitle}
        topicTitle={topicTitle}
        lessonNumber={lessonNumber}
        journey={journey}
        onComplete={onComplete}
      />
    )
  }

  // 4. CLASS 6: Algorithm Arena, Speed Duel & Sorting Visualizer
  if (gKey === 'class6') {
    return (
      <Class6AlgorithmArenaExperience
        chapterNum={chapterNum}
        cNum={chapterNum}
        chapterTitle={chapterTitle}
        topicTitle={topicTitle}
        lessonNumber={lessonNumber}
        onComplete={onComplete}
      />
    )
  }

  // 5. CLASS 7: Python Odyssey, Rover Automation & Logic Games
  if (gKey === 'class7') {
    return (
      <Class7PythonOdysseyExperience
        chapterNum={chapterNum}
        chapterTitle={chapterTitle}
        topicTitle={topicTitle}
        lessonNumber={lessonNumber}
        onComplete={onComplete}
      />
    )
  }

  // 6. CLASS 8: Neural Forge, Synaptic Weights & Decision Simulation
  if (gKey === 'class8') {
    return (
      <Class8NeuralForgeExperience
        chapterNum={chapterNum}
        cNum={chapterNum}
        chapterTitle={chapterTitle}
        topicTitle={topicTitle}
        lessonNumber={lessonNumber}
        onComplete={onComplete}
      />
    )
  }

  // 7. CLASS 9: Data Science Planet, Bias Audit & Real-world Missions
  if (gKey === 'class9') {
    return (
      <Class9DataSciencePlanetExperience
        chapterNum={chapterNum}
        chapterTitle={chapterTitle}
        topicTitle={topicTitle}
        lessonNumber={lessonNumber}
        onComplete={onComplete}
      />
    )
  }

  // 8. CLASS 10: Smart City Architect, AI Fleet Routing & Urban Missions
  if (gKey === 'class10') {
    return (
      <Class10SmartCityArchitectExperience
        chapterNum={chapterNum}
        cNum={chapterNum}
        chapterTitle={chapterTitle}
        topicTitle={topicTitle}
        lessonNumber={lessonNumber}
        onComplete={onComplete}
      />
    )
  }

  // 9. CLASS 11: Deep Neural Forge, Loss Gradients & Backprop Sandbox
  if (gKey === 'class11') {
    return (
      <Class11DeepNeuralForgeExperience
        chapterNum={chapterNum}
        chapterTitle={chapterTitle}
        topicTitle={topicTitle}
        lessonNumber={lessonNumber}
        onComplete={onComplete}
      />
    )
  }

  // 10. CLASS 12: Transformer Nexus, Attention Visualizer & Multi-Agent Studio
  if (gKey === 'class12') {
    return (
      <Class12TransformerNexusExperience
        chapterNum={chapterNum}
        chapterTitle={chapterTitle}
        topicTitle={topicTitle}
        lessonNumber={lessonNumber}
        onComplete={onComplete}
      />
    )
  }

  // 11. UNDERGRADUATE: Practical Tensor Execution Lab & Interactive Tooling
  if (gKey.startsWith('ug')) {
    return (
      <UGSystemsEngineeringExperience
        chapterNum={chapterNum}
        chapterTitle={chapterTitle}
        topicTitle={topicTitle}
        lessonNumber={lessonNumber}
        onComplete={onComplete}
      />
    )
  }

  // 12. POSTGRADUATE: Distributed KV-Cache Optimizer & Research Simulation
  if (gKey.startsWith('pg')) {
    return (
      <PGResearchOptimizationExperience
        chapterNum={chapterNum}
        chapterTitle={chapterTitle}
        topicTitle={topicTitle}
        lessonNumber={lessonNumber}
        onComplete={onComplete}
      />
    )
  }

  // Fallback interactive game engine
  return (
    <InteractivePlayfulLessonEngine
      gradeKey={gradeKey}
      chapterNum={chapterNum}
      lessonNumber={lessonNumber}
      topicTitle={topicTitle}
      chapterTitle={chapterTitle}
      htmlContent={htmlContent}
      isCompleted={isCompleted}
      onComplete={onComplete}
    />
  )
}
