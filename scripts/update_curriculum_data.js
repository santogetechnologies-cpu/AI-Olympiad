import fs from 'fs'
import path from 'path'

const filePath = path.resolve('src/services/curriculumData.ts')
let content = fs.readFileSync(filePath, 'utf8')

// Find the start of function generateTopicKnowledge and end before function generateTopicHtml
const startMarker = 'function generateTopicKnowledge('
const endMarker = 'function generateTopicHtml('

const startIndex = content.indexOf(startMarker)
const endIndex = content.indexOf(endMarker)

if (startIndex === -1 || endIndex === -1) {
  console.error('Markers not found', { startIndex, endIndex })
  process.exit(1)
}

const newFunction = `function generateTopicKnowledge(
  topicTitle: string,
  tier: 'primary' | 'middle' | 'secondary' | 'ug' | 'pg',
  levelName: string,
  chapNum?: number,
  lessonNum?: 1 | 2
): TopicKnowledge {
  const profile: TopicProfile = getCurriculumTopicProfile(
    topicTitle,
    tier,
    levelName,
    chapNum || 1,
    lessonNum || 1
  )

  return {
    hook: profile.hook,
    goal: profile.goal,
    learnPoints: profile.learnPoints,
    analogy: profile.analogy,
    step1: profile.step1,
    step2: profile.step2,
    step3: profile.step3,
    realScenario: profile.realScenario,
    useCases: profile.useCases,
    simCode: profile.simCode,
    simOutput: profile.simOutput,
    pairs: profile.pairs,
    practice: profile.practice,
    quizzes: profile.quizzes,
    recall: profile.recall,
    takeaways: profile.takeaways,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// HTML CONTENT GENERATOR (Topic-Tailored Detailed Notes & Complete Theory)
// ─────────────────────────────────────────────────────────────────────────────

`

const updated = content.slice(0, startIndex) + newFunction + content.slice(endIndex)
fs.writeFileSync(filePath, updated, 'utf8')
console.log('Successfully updated src/services/curriculumData.ts!')
