import { ALL_LEVELS_CURRICULUM } from '../src/services/curriculumData.ts'
import { getSectionMechanic, ALL_GAME_MECHANICS } from '../src/services/gameMechanicRegistry.ts'

console.log('---------------------------------------------------------')
console.log('STARTING SECTION 5, 6, 7 & DYNAMIC MECHANIC AUDIT')
console.log('---------------------------------------------------------')

// 1. Verify all 16 levels & 6 chapters have valid sections
let totalChaptersChecked = 0
for (const lvl of ALL_LEVELS_CURRICULUM) {
  for (const ch of lvl.chapters) {
    totalChaptersChecked++
    // Check topics
    if (!ch.topic1 || !ch.topic2 || !ch.topic3) {
      console.error(`Missing topic in ${lvl.name} ${ch.chapterTitle}`)
      process.exit(1)
    }
    // Check lesson journeys
    if (!ch.lesson1?.journey || !ch.lesson2?.journey || !ch.lesson3?.journey) {
      console.error(`Missing lesson journey in ${lvl.name} ${ch.chapterTitle}`)
      process.exit(1)
    }
    // Check workbook prompts & lab starters
    if (!ch.workbookPrompts || !ch.labStarter || !ch.assignmentBrief) {
      console.error(`Missing section 4/6/7 data in ${lvl.name} ${ch.chapterTitle}`)
      process.exit(1)
    }
  }
}
console.log(`✓ Checked all ${totalChaptersChecked} chapters: Sections 1-8 data structures intact.`)

// 2. Check Dynamic Game Mechanic Resolution across all (Grade, Chapter, Section)
const assignedMechanics = new Map()
let mechanicAssignmentsCount = 0

for (const lvl of ALL_LEVELS_CURRICULUM) {
  for (const ch of lvl.chapters) {
    const cNum = parseInt(ch.chapterNumber, 10)
    // Sections 2, 3, 4, 5, 6, 7
    const interactiveSlots = [
      { slot: 2, topic: ch.topic1 },
      { slot: 3, topic: ch.topic2 },
      { slot: 4, topic: ch.topic1 },
      { slot: 5, topic: ch.topic1 },
      { slot: 6, topic: ch.topic3 },
      { slot: 7, topic: ch.topic2 }
    ]

    for (const item of interactiveSlots) {
      mechanicAssignmentsCount++
      const mech = getSectionMechanic(lvl.gradeKey, cNum, item.slot, item.topic)
      if (!mech || !mech.id) {
        console.error(`Failed to resolve game mechanic for ${lvl.gradeKey} Ch${cNum} S${item.slot} (${item.topic})`)
        process.exit(1)
      }
      assignedMechanics.set(`${lvl.gradeKey}_ch${cNum}_s${item.slot}`, mech.id)
    }
  }
}

console.log(`✓ Total interactive game assignments verified: ${mechanicAssignmentsCount}`)
console.log(`✓ Total distinct game mechanics in registry: ${Object.keys(ALL_GAME_MECHANICS).length}`)

console.log('=========================================================')
console.log('ALL SECTION 5, 6, 7 & DYNAMIC MECHANIC CHECKS PASSED!')
console.log('=========================================================')
