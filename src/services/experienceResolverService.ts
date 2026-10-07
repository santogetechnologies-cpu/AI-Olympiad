// ─────────────────────────────────────────────────────────────────────────────
// EXPERIENCE RESOLVER SERVICE
// Maps (classId, chapterId, lessonId, sectionId) -> ExperienceType & Configuration
// Guarantees:
// 1. One Chapter = 8 Completely Distinct Experience Types (Never duplicate within a chapter)
// 2. One Class = 6 Distinct Chapter Experience Systems (Different combinations per chapter)
// 3. Different Classes (Class 3 vs Class 8 vs UG) have different pedagogic mappings
// 4. Data-driven: Respects explicit DB / CMS experienceType when present
// ─────────────────────────────────────────────────────────────────────────────

export type ExperienceType =
  | 'exploration'
  | 'story'
  | 'mystery'
  | 'simulation'
  | 'puzzle'
  | 'discovery'
  | 'workshop'
  | 'creation'
  | 'investigation'
  | 'mission'
  | 'interactiveMap'
  | 'challenge'
  | 'workbook'
  | 'practical'
  | 'assignment'
  | 'quiz'

export interface ResolvedExperience {
  experienceType: ExperienceType
  flow: string
  experienceConfig: Record<string, any>
}

// Master Experience Combinations per Grade and Chapter
// Each chapter contains exactly 8 DIFFERENT experience types.
const GRADE_CHAPTER_EXPERIENCE_MATRIX: Record<string, ExperienceType[][]> = {
  // Class 3: Playful, Sensory, Touch-Friendly, Story & Toy Mechanics
  class3: [
    // Ch 1
    ['exploration', 'story', 'puzzle', 'discovery', 'workshop', 'creation', 'workbook', 'quiz'],
    // Ch 2
    ['mission', 'puzzle', 'story', 'workshop', 'discovery', 'challenge', 'practical', 'quiz'],
    // Ch 3
    ['discovery', 'exploration', 'story', 'creation', 'puzzle', 'workshop', 'assignment', 'quiz'],
    // Ch 4
    ['story', 'mission', 'discovery', 'simulation', 'puzzle', 'challenge', 'workbook', 'quiz'],
    // Ch 5
    ['puzzle', 'exploration', 'mystery', 'workshop', 'story', 'creation', 'practical', 'quiz'],
    // Ch 6
    ['mission', 'discovery', 'exploration', 'puzzle', 'creation', 'challenge', 'assignment', 'quiz'],
  ],

  // Class 4: Pixel Quest, Prompt Missions, App Simulations
  class4: [
    ['exploration', 'story', 'mission', 'puzzle', 'discovery', 'creation', 'workbook', 'quiz'],
    ['mystery', 'simulation', 'story', 'workshop', 'interactiveMap', 'challenge', 'practical', 'quiz'],
    ['discovery', 'mission', 'puzzle', 'exploration', 'creation', 'challenge', 'assignment', 'quiz'],
    ['story', 'puzzle', 'simulation', 'discovery', 'workshop', 'creation', 'workbook', 'quiz'],
    ['mission', 'mystery', 'exploration', 'puzzle', 'creation', 'challenge', 'practical', 'quiz'],
    ['interactiveMap', 'story', 'discovery', 'simulation', 'workshop', 'challenge', 'assignment', 'quiz'],
  ],

  // Class 5: Cyber Detective Agency, Evidence Dossiers, Hospital Triage
  class5: [
    ['mystery', 'story', 'investigation', 'simulation', 'puzzle', 'challenge', 'workbook', 'quiz'],
    ['discovery', 'mystery', 'mission', 'workshop', 'creation', 'challenge', 'practical', 'quiz'],
    ['investigation', 'interactiveMap', 'story', 'puzzle', 'simulation', 'challenge', 'assignment', 'quiz'],
    ['mystery', 'exploration', 'simulation', 'investigation', 'workshop', 'challenge', 'workbook', 'quiz'],
    ['mission', 'investigation', 'mystery', 'puzzle', 'creation', 'challenge', 'practical', 'quiz'],
    ['interactiveMap', 'mystery', 'discovery', 'simulation', 'creation', 'challenge', 'assignment', 'quiz'],
  ],

  // Class 6: Algorithm Arena, Pattern Classifiers, Smart Car Missions, Privacy
  class6: [
    ['exploration', 'simulation', 'puzzle', 'investigation', 'interactiveMap', 'challenge', 'practical', 'quiz'],
    ['mission', 'mystery', 'discovery', 'workshop', 'simulation', 'challenge', 'workbook', 'quiz'],
    ['investigation', 'interactiveMap', 'puzzle', 'creation', 'simulation', 'challenge', 'assignment', 'quiz'],
    ['discovery', 'simulation', 'mystery', 'workshop', 'investigation', 'challenge', 'practical', 'quiz'],
    ['interactiveMap', 'mission', 'puzzle', 'creation', 'simulation', 'challenge', 'workbook', 'quiz'],
    ['investigation', 'mystery', 'exploration', 'discovery', 'creation', 'challenge', 'assignment', 'quiz'],
  ],

  // Class 7: Python Code Odyssey, Decision Trees
  class7: [
    ['workshop', 'puzzle', 'simulation', 'investigation', 'mission', 'challenge', 'practical', 'quiz'],
    ['exploration', 'workshop', 'discovery', 'interactiveMap', 'simulation', 'challenge', 'workbook', 'quiz'],
    ['investigation', 'puzzle', 'workshop', 'creation', 'mystery', 'challenge', 'assignment', 'quiz'],
    ['simulation', 'mission', 'discovery', 'workshop', 'puzzle', 'challenge', 'practical', 'quiz'],
    ['interactiveMap', 'workshop', 'investigation', 'creation', 'simulation', 'challenge', 'workbook', 'quiz'],
    ['mystery', 'puzzle', 'exploration', 'workshop', 'creation', 'challenge', 'assignment', 'quiz'],
  ],

  // Class 8: Deepfake Forensics & Neural Decision Trees
  class8: [
    ['investigation', 'simulation', 'mystery', 'puzzle', 'interactiveMap', 'challenge', 'practical', 'quiz'],
    ['workshop', 'investigation', 'discovery', 'mission', 'simulation', 'challenge', 'workbook', 'quiz'],
    ['mystery', 'interactiveMap', 'investigation', 'creation', 'puzzle', 'challenge', 'assignment', 'quiz'],
    ['simulation', 'mystery', 'workshop', 'investigation', 'discovery', 'challenge', 'practical', 'quiz'],
    ['mission', 'interactiveMap', 'puzzle', 'creation', 'investigation', 'challenge', 'workbook', 'quiz'],
    ['investigation', 'exploration', 'mystery', 'discovery', 'creation', 'challenge', 'assignment', 'quiz'],
  ],

  // Class 9: Data Science Planet & Smart Sensor Networks
  class9: [
    ['simulation', 'interactiveMap', 'investigation', 'workshop', 'creation', 'challenge', 'practical', 'quiz'],
    ['discovery', 'simulation', 'mystery', 'mission', 'interactiveMap', 'challenge', 'workbook', 'quiz'],
    ['interactiveMap', 'investigation', 'puzzle', 'workshop', 'creation', 'challenge', 'assignment', 'quiz'],
    ['simulation', 'discovery', 'interactiveMap', 'investigation', 'mystery', 'challenge', 'practical', 'quiz'],
    ['mission', 'simulation', 'workshop', 'creation', 'interactiveMap', 'challenge', 'workbook', 'quiz'],
    ['investigation', 'interactiveMap', 'exploration', 'discovery', 'creation', 'challenge', 'assignment', 'quiz'],
  ],

  // Class 10: Smart City Architect & Ethical Governance
  class10: [
    ['interactiveMap', 'simulation', 'investigation', 'creation', 'workshop', 'challenge', 'practical', 'quiz'],
    ['mystery', 'interactiveMap', 'mission', 'simulation', 'discovery', 'challenge', 'workbook', 'quiz'],
    ['investigation', 'creation', 'interactiveMap', 'puzzle', 'simulation', 'challenge', 'assignment', 'quiz'],
    ['simulation', 'interactiveMap', 'mystery', 'workshop', 'investigation', 'challenge', 'practical', 'quiz'],
    ['creation', 'mission', 'simulation', 'puzzle', 'interactiveMap', 'challenge', 'workbook', 'quiz'],
    ['interactiveMap', 'investigation', 'exploration', 'discovery', 'creation', 'challenge', 'assignment', 'quiz'],
  ],

  // Class 11: Deep Neural Forge & Tensor Math
  class11: [
    ['simulation', 'workshop', 'investigation', 'puzzle', 'interactiveMap', 'challenge', 'practical', 'quiz'],
    ['discovery', 'simulation', 'mystery', 'creation', 'workshop', 'challenge', 'workbook', 'quiz'],
    ['investigation', 'simulation', 'interactiveMap', 'creation', 'puzzle', 'challenge', 'assignment', 'quiz'],
    ['workshop', 'simulation', 'discovery', 'investigation', 'mystery', 'challenge', 'practical', 'quiz'],
    ['interactiveMap', 'creation', 'simulation', 'puzzle', 'workshop', 'challenge', 'workbook', 'quiz'],
    ['simulation', 'investigation', 'exploration', 'discovery', 'creation', 'challenge', 'assignment', 'quiz'],
  ],

  // Class 12: Transformer Attention Nexus & Generative AI
  class12: [
    ['workshop', 'simulation', 'investigation', 'creation', 'interactiveMap', 'challenge', 'practical', 'quiz'],
    ['discovery', 'workshop', 'mystery', 'simulation', 'interactiveMap', 'challenge', 'workbook', 'quiz'],
    ['investigation', 'creation', 'simulation', 'puzzle', 'workshop', 'challenge', 'assignment', 'quiz'],
    ['simulation', 'workshop', 'investigation', 'discovery', 'mystery', 'challenge', 'practical', 'quiz'],
    ['interactiveMap', 'creation', 'puzzle', 'simulation', 'workshop', 'challenge', 'workbook', 'quiz'],
    ['workshop', 'investigation', 'exploration', 'discovery', 'creation', 'challenge', 'assignment', 'quiz'],
  ],

  // Higher Tier (UG / PG): Systems Engineering & Research Optimization
  higher: [
    ['simulation', 'investigation', 'workshop', 'interactiveMap', 'creation', 'challenge', 'practical', 'quiz'],
    ['investigation', 'simulation', 'mystery', 'discovery', 'workshop', 'challenge', 'workbook', 'quiz'],
    ['interactiveMap', 'creation', 'investigation', 'puzzle', 'simulation', 'challenge', 'assignment', 'quiz'],
    ['workshop', 'simulation', 'investigation', 'mystery', 'discovery', 'challenge', 'practical', 'quiz'],
    ['creation', 'interactiveMap', 'simulation', 'puzzle', 'workshop', 'challenge', 'workbook', 'quiz'],
    ['simulation', 'investigation', 'exploration', 'discovery', 'creation', 'challenge', 'assignment', 'quiz'],
  ],
}

class ExperienceResolverService {
  /**
   * Resolves the definitive ExperienceType and configuration for any given section
   */
  public resolveExperience(params: {
    gradeKey: string
    chapterNum: string | number
    sectionIndex: number // 0 to 7
    canonicalSection?: any
    topicTitle?: string
  }): ResolvedExperience {
    const { gradeKey, chapterNum, sectionIndex, canonicalSection, topicTitle } = params

    // 1. DATA-DRIVEN OVERRIDE: If CMS or section object explicitly specifies experienceType, use it!
    if (canonicalSection?.experienceType) {
      return {
        experienceType: canonicalSection.experienceType,
        flow: this.getFlowForExperience(canonicalSection.experienceType),
        experienceConfig: canonicalSection.experienceConfig || {},
      }
    }

    // 2. NORMALIZATION
    const normalizedGrade = this.normalizeGradeKey(gradeKey)
    const chapIdx = Math.max(0, Math.min(5, (parseInt(String(chapterNum || '1'), 10) || 1) - 1))
    const secIdx = Math.max(0, Math.min(7, sectionIndex))

    // 3. GRADE-CHAPTER MATRIX RESOLUTION (Guarantees 8 distinct experiences per chapter)
    const gradeMatrix = GRADE_CHAPTER_EXPERIENCE_MATRIX[normalizedGrade] || GRADE_CHAPTER_EXPERIENCE_MATRIX['class6']
    const chapterExperiences = gradeMatrix[chapIdx] || gradeMatrix[0]
    const resolvedType = chapterExperiences[secIdx] || 'exploration'

    const flow = this.getFlowForExperience(resolvedType)
    const experienceConfig = this.buildExperienceConfig(resolvedType, topicTitle || canonicalSection?.topicTitle || 'AI Core')

    return {
      experienceType: resolvedType,
      flow,
      experienceConfig,
    }
  }

  private normalizeGradeKey(gradeKey: string): string {
    const g = (gradeKey || '').toLowerCase()
    if (g.includes('3')) return 'class3'
    if (g.includes('4')) return 'class4'
    if (g.includes('5')) return 'class5'
    if (g.includes('6')) return 'class6'
    if (g.includes('7')) return 'class7'
    if (g.includes('8')) return 'class8'
    if (g.includes('9')) return 'class9'
    if (g.includes('10')) return 'class10'
    if (g.includes('11')) return 'class11'
    if (g.includes('12')) return 'class12'
    if (g.includes('ug') || g.includes('pg') || g.includes('college') || g.includes('master')) return 'higher'
    return 'class6'
  }

  private getFlowForExperience(expType: ExperienceType): string {
    switch (expType) {
      case 'exploration':
        return 'Explore → Discover → Explain → Challenge'
      case 'story':
        return 'Story → Decision → Consequence → Learn'
      case 'mystery':
        return 'Observe → Analyze Clues → Deduce → Verify'
      case 'simulation':
        return 'Observe → Predict → Experiment → Result'
      case 'puzzle':
        return 'Problem → Unlock Gates → Reason → Master'
      case 'workshop':
        return 'Assemble → Connect → Test → Deploy'
      case 'creation':
        return 'Design → Build Blueprint → Review → Certify'
      case 'investigation':
        return 'Inspect → Filter Signals → Audit → Stamp'
      case 'mission':
        return 'Briefing → Plan Queue → Launch → Celebrate'
      case 'interactiveMap':
        return 'Survey Topology → Route Nodes → Balance Load → Transmit'
      case 'challenge':
        return 'Arena Trial → Rapid Reaction → Streak Combo → Victory'
      case 'workbook':
        return 'Reflect → Choose Tags → Draft Insights → Save Portfolio'
      case 'practical':
        return 'Code Task → Terminal Run → Check Output → Certify'
      case 'assignment':
        return 'Problem Brief → Rubric Plan → Submit Architecture → Score'
      case 'quiz':
        return 'Timed Assessment → Option Analysis → Feedback → Medal'
      default:
        return 'See → Try → Discover → Learn'
    }
  }

  private buildExperienceConfig(_expType: ExperienceType, title: string): Record<string, any> {
    return {
      title,
      timestamp: new Date().toISOString(),
    }
  }
}

export const experienceResolverService = new ExperienceResolverService()
