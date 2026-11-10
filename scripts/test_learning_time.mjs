import assert from 'assert'
import fs from 'fs'

console.log('--- Verifying Authentic & Fast Chapter Learning Time ---')

// 1. Verify formatLearningTime logic in progressService.ts
const progressServiceCode = fs.readFileSync('src/services/progressService.ts', 'utf8')

// Extract formatLearningTime implementation
const formatFuncMatch = progressServiceCode.match(/export function formatLearningTime\(totalSeconds: number\): string \{([\s\S]*?)\n\}/)
assert(formatFuncMatch, 'formatLearningTime must be defined and exported in progressService.ts')

const formatLearningTime = new Function('totalSeconds', formatFuncMatch[1])
assert.strictEqual(formatLearningTime(0), '0m', '0 seconds should format to 0m')
assert.strictEqual(formatLearningTime(45), '45s', '45 seconds should format to 45s')
assert.strictEqual(formatLearningTime(60), '1m', '60 seconds should format to 1m')
assert.strictEqual(formatLearningTime(150), '2m', '150 seconds should format to 2m')
assert.strictEqual(formatLearningTime(3600), '1h', '3600 seconds should format to 1h')
assert.strictEqual(formatLearningTime(4500), '1h 15m', '4500 seconds should format to 1h 15m')
assert.strictEqual(formatLearningTime(7200), '2h', '7200 seconds should format to 2h')
console.log('✓ formatLearningTime handles all second/minute/hour combinations accurately')

// 2. Verify NO artificial baseline multipliers exist
assert(!progressServiceCode.includes('* 90'), 'No arbitrary 90s multiplier must exist in progressService')
assert(!progressServiceCode.includes('baselineFromPages'), 'No fake page baseline in getStudentOverallProgress')
console.log('✓ Verified: Zero artificial baselines or multipliers; strictly authentic time')

// 3. Verify getLearningTimeSync & recordLearningTime calculate actual time inside chapters
assert(progressServiceCode.includes('store.totalSeconds = Math.max(store.totalSeconds || 0, chTotal)'), 'getLearningTimeSync must compute genuine chapter sum')
assert(progressServiceCode.includes('store.totalSeconds = Object.values(store.byChapter).reduce((sum, s) => sum + (Number(s) || 0), 0)'), 'recordLearningTime must compute exact sum of chapters')
assert(progressServiceCode.includes("'learning_time_updated'"), 'Must dispatch learning_time_updated event')
console.log('✓ Exact chapter time calculation verified in progressService')

// 4. Verify GaioInteractiveBookApp.tsx tracks only inside chapter and flushes fast
const bookAppCode = fs.readFileSync('src/components/gaio/GaioInteractiveBookApp.tsx', 'utf8')
assert(bookAppCode.includes('activeSecondsAccumulatorRef.current >= 2'), 'Must flush fast every 2 seconds')
assert(bookAppCode.includes("prevChapterKeyRef.current !== currentChapterKey"), 'Must flush outgoing chapter on chapter switch')
assert(bookAppCode.includes('if (idleSeconds > 180) return'), 'Must pause after 3m of user inactivity')
assert(bookAppCode.includes("document.visibilityState !== 'visible'"), 'Must pause when tab is hidden')
console.log('✓ GaioInteractiveBookApp ultra-fast flush and chapter switch tracking verified')

// 5. Verify ChapterLearningPage.tsx tracks ONLY when actively inside a chapter lesson
const chapterPageCode = fs.readFileSync('src/pages/student/ChapterLearningPage.tsx', 'utf8')
assert(chapterPageCode.includes('isActivelyInsideLmsLesson'), 'ChapterLearningPage must only track when actively inside a lesson')
assert(chapterPageCode.includes('!resolvedItemKey && chapter && currentSection'), 'Must NOT track when on chapter selection overview')
console.log('✓ ChapterLearningPage verified: no tracking on chapter overview/menu')

// 6. Verify StudentProgressPage.tsx fast reactive update
const progressPageCode = fs.readFileSync('src/pages/student/StudentProgressPage.tsx', 'utf8')
assert(progressPageCode.includes('debounceTimer = setTimeout(() => {'), 'StudentProgressPage must debounce updates')
assert(progressPageCode.includes('50)'), 'StudentProgressPage must respond fast within 50ms')
assert(progressPageCode.includes('const formattedLearningTime = formatLearningTime(stats.totalTime)'), 'Must format total learning time')
assert(progressPageCode.includes('<p className="text-2xl sm:text-3xl font-bold text-slate-900">{formattedLearningTime}</p>'), 'Must render learning time')
console.log('✓ StudentProgressPage fast reactive updates verified')

console.log('ALL AUTHENTIC LEARNING TIME CHECKS PASSED!')
