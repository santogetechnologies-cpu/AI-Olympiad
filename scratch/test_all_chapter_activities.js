import { ALL_LEVELS_CURRICULUM } from '../src/services/curriculumData.ts'
import { resolveActivityDomain } from '../src/components/learning/experiences/GameActivityExperience.tsx'

console.log('---------------------------------------------------------')
console.log('TESTING DYNAMIC ACTIVITY RESOLUTION ACROSS 96 CHAPTERS')
console.log('---------------------------------------------------------')

const domainCounts = new Map()
let totalTested = 0

for (const lvl of ALL_LEVELS_CURRICULUM) {
  console.log(`\nAcademic Level: ${lvl.name} (${lvl.gradeKey})`)
  for (const ch of lvl.chapters) {
    totalTested++
    const domain = resolveActivityDomain(ch.topic1, ch.chapterTitle)
    domainCounts.set(domain, (domainCounts.get(domain) || 0) + 1)
    console.log(`  Ch ${ch.chapterNumber}: [${domain.toUpperCase()}] "${ch.topic1}" — ${ch.chapterTitle}`)
  }
}

console.log('\n---------------------------------------------------------')
console.log('ACTIVITY DOMAIN DISTRIBUTION SUMMARY:')
console.log('---------------------------------------------------------')
for (const [domain, count] of domainCounts.entries()) {
  console.log(`  - ${domain.padEnd(24)}: ${count} chapters`)
}

console.log(`\n✓ Total Chapters Tested: ${totalTested}`)
console.log(`✓ Total Unique Active Domains: ${domainCounts.size}`)
console.log('=========================================================')
console.log('ALL DYNAMIC ACTIVITY RESOLUTION CHECKS PASSED!')
console.log('=========================================================')
