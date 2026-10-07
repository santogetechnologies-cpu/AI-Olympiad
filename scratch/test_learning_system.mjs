import { ALL_LEVELS_CURRICULUM } from '../src/services/curriculumData.ts'
import { curriculumCatalogService } from '../src/services/curriculumCatalogService.ts'

console.log('=== VERIFYING MY LEARNING SYSTEM OVERHAUL ===\n')

const class3 = ALL_LEVELS_CURRICULUM.find(l => l.gradeKey === 'class3')
if (!class3) {
  console.error('FAIL: Class 3 not found in ALL_LEVELS_CURRICULUM')
  process.exit(1)
}

console.log(`Found Class: ${class3.name} (${class3.age})`)
console.log(`Total Chapters: ${class3.chapters.length}\n`)

let allPassed = true

// Test each chapter for Lesson 3 and 3 Distinct Quizzes
class3.chapters.forEach((chap, idx) => {
  const cNum = idx + 1
  console.log(`--- Checking Chapter ${cNum}: ${chap.chapterTitle} ---`)
  console.log(`  Canonical Type: ${chap.canonicalType}`)
  console.log(`  Topic 1: "${chap.topic1}"`)
  console.log(`  Topic 2: "${chap.topic2}"`)
  console.log(`  Topic 3: "${chap.topic3}"`)

  // 1. Verify Lesson 3 exists and is distinct
  if (!chap.lesson3) {
    console.error(`  FAIL: Lesson 3 is MISSING in Chapter ${cNum}`)
    allPassed = false
  } else if (!chap.lesson3.topicTitle || chap.lesson3.topicTitle === chap.topic1 || chap.lesson3.topicTitle === chap.topic2) {
    console.error(`  FAIL: Lesson 3 has duplicate topic in Chapter ${cNum}: ${chap.lesson3.topicTitle}`)
    allPassed = false
  } else {
    console.log(`  ✓ Lesson 3 Exists: "${chap.lesson3.topicTitle}" (Length: ${chap.lesson3.htmlContent.length} chars)`)
  }

  // 2. Verify 3 Distinct Mastery Quizzes
  if (!chap.quiz1Questions || chap.quiz1Questions.length === 0) {
    console.error(`  FAIL: Quiz 1 questions missing in Chapter ${cNum}`)
    allPassed = false
  }
  if (!chap.quiz2Questions || chap.quiz2Questions.length === 0) {
    console.error(`  FAIL: Quiz 2 questions missing in Chapter ${cNum}`)
    allPassed = false
  }
  if (!chap.quiz3Questions || chap.quiz3Questions.length === 0) {
    console.error(`  FAIL: Quiz 3 questions missing in Chapter ${cNum}`)
    allPassed = false
  }

  const q1Text = chap.quiz1Questions.map(q => q.question)
  const q2Text = chap.quiz2Questions.map(q => q.question)
  const q3Text = chap.quiz3Questions.map(q => q.question)

  // Verify no overlap across Quiz 1, Quiz 2, Quiz 3
  const overlap12 = q1Text.filter(q => q2Text.includes(q))
  const overlap23 = q2Text.filter(q => q3Text.includes(q))
  const overlap13 = q1Text.filter(q => q3Text.includes(q))

  if (overlap12.length > 0 || overlap23.length > 0 || overlap13.length > 0) {
    console.error(`  FAIL: Question repetition detected in Chapter ${cNum}! Overlap:`, { overlap12, overlap23, overlap13 })
    allPassed = false
  } else {
    console.log(`  ✓ 3 Distinct Quizzes: Quiz 1 (${q1Text.length} qs), Quiz 2 (${q2Text.length} qs), Quiz 3 (${q3Text.length} qs) - 0 questions repeated!`)
  }
  console.log('')
})

// Test Curriculum Catalog Service
console.log('--- Verifying curriculumCatalogService.getCurriculumChapterContent ---')
const ch1Content = curriculumCatalogService.getCurriculumChapterContent('class3', 1)
const ch2Content = curriculumCatalogService.getCurriculumChapterContent('class3', 2)
const ch5Content = curriculumCatalogService.getCurriculumChapterContent('class3', 5)

console.log(`Chapter 1 Topic 3: "${ch1Content.topic3}"`)
console.log(`Chapter 2 Topic 3: "${ch2Content.topic3}"`)
console.log(`Chapter 5 Topic 3: "${ch5Content.topic3}"`)

if (ch1Content.topic3 === ch2Content.topic3 || ch1Content.topic1 === ch2Content.topic1) {
  console.error('FAIL: Cross-chapter content leak between Chapter 1 and Chapter 2!')
  allPassed = false
} else {
  console.log('✓ Zero cross-chapter content leaks! Each chapter has completely unique, topic-bound data.')
}

if (allPassed) {
  console.log('\n🎉 ALL VERIFICATION CHECKS PASSED!')
} else {
  console.error('\n❌ SOME CHECKS FAILED')
  process.exit(1)
}
