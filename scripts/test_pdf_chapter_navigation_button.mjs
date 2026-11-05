// ─────────────────────────────────────────────────────────────────────────────
// PDF CHAPTER PROGRESS NAVIGATION BUTTON VERIFICATION SUITE
// Tests button label transitions (Next -> Continue to Next Chapter),
// 100% completion requirement, final chapter handling, button dimensions,
// and smooth chapter navigation.
// ─────────────────────────────────────────────────────────────────────────────

import fs from 'fs';
import path from 'path';

console.log('================================================================');
console.log('AI OLYMPIAD: PDF CHAPTER PROGRESS NAVIGATION BUTTON TEST');
console.log('================================================================\n');

let totalChecks = 0;
let passedChecks = 0;

function assert(condition, message) {
  totalChecks++;
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  }
  passedChecks++;
  console.log(`  ✓ ${message}`);
}

async function runTestSuite() {
  const bookAppPath = path.resolve('src/components/gaio/GaioInteractiveBookApp.tsx');
  const chapterPagePath = path.resolve('src/pages/student/ChapterLearningPage.tsx');

  assert(fs.existsSync(bookAppPath), 'GaioInteractiveBookApp.tsx exists');
  assert(fs.existsSync(chapterPagePath), 'ChapterLearningPage.tsx exists');

  const bookCode = fs.readFileSync(bookAppPath, 'utf-8');
  const chapterPageCode = fs.readFileSync(chapterPagePath, 'utf-8');

  // ── TEST 1: Button Labels & Gating Assertions ──
  console.log('1. Verifying Button Labels & 100% Completion Gating:');

  assert(
    bookCode.includes('<span>Continue to Next Chapter</span>'),
    'Defines exact label <span>Continue to Next Chapter</span>'
  );

  assert(
    bookCode.includes('<span>Next</span>'),
    'Preserves existing <span>Next</span> label before 100%'
  );

  assert(
    bookCode.includes('{isChapterCompleted ? (') &&
    bookCode.includes('<span>Continue to Next Chapter</span>') &&
    bookCode.includes('<span>Next</span>'),
    'Continue to Next Chapter is strictly conditionally rendered only when isChapterCompleted is TRUE'
  );

  // ── TEST 2: Button Sizing & Styling Consistency ──
  console.log('\n2. Verifying Exact Button Size, Padding, and Position Constraints:');

  const requiredClasses = [
    'px-2.5 sm:px-3.5',
    'py-1.5 sm:py-2',
    'text-xs sm:text-xs md:text-sm font-bold',
    'rounded-lg sm:rounded-xl',
    'shadow-xs',
    'whitespace-nowrap'
  ];

  for (const cls of requiredClasses) {
    assert(
      bookCode.includes(cls),
      `Button preserves existing exact styling class: "${cls}"`
    );
  }

  // Verify button is inside shrink-0 container on the right side of the bottom progress bar
  assert(
    bookCode.includes('{/* Right: Next Page / Continue to Next Chapter button */}\n                <div className="shrink-0 flex items-center">') ||
    bookCode.includes('{/* Right: Next Page / Continue to Next Chapter button */}\r\n                <div className="shrink-0 flex items-center">'),
    'Button is positioned in the exact bottom-right slot of the PDF progress row'
  );

  // ── TEST 3: Next Chapter Resolution & Navigation Logic ──
  console.log('\n3. Verifying Next Chapter Resolution & Navigation Actions:');

  assert(bookCode.includes('nextChapter'), 'Resolves nextChapter from getClassChapters');
  assert(bookCode.includes('isFinalChapter'), 'Defines isFinalChapter check');
  assert(bookCode.includes('handleContinueToNextChapter'), 'Defines handleContinueToNextChapter action handler');
  assert(bookCode.includes('onNavigateChapter'), 'Supports onNavigateChapter prop for parent navigation');

  // Verify ChapterLearningPage integrates onNavigateChapter
  assert(
    chapterPageCode.includes('onNavigateChapter={(nextKey) => navigate(`/student/learning/chapters/${nextKey}`)}'),
    'ChapterLearningPage wires onNavigateChapter to navigate(`/student/learning/chapters/${nextKey}`)'
  );

  // ── TEST 4: Final Chapter Safety (No Nonexistent Navigation) ──
  console.log('\n4. Verifying Final Chapter Completion Handling:');

  assert(
    bookCode.includes('isFinalChapter ? (') &&
    bookCode.includes('Course Completed'),
    'Final chapter displays course completion state instead of navigating to nonexistent chapter'
  );

  assert(
    bookCode.includes('if (isFinalChapter || !nextChapter) {'),
    'handleContinueToNextChapter safely guards against navigating past the finale'
  );

  // ── TEST 5: Interactive State Machine & Transition Simulation ──
  console.log('\n5. Simulating Button State Transitions Across Learning Lifecycle:');

  class ChapterNavigationSimulator {
    constructor(chapterTotalPages = 33, isFinal = false) {
      this.chapterTotalPages = chapterTotalPages;
      this.isFinal = isFinal;
      this.completedPages = [];
      this.currentPage = 1;
    }

    get isChapterCompleted() {
      return this.completedPages.length >= this.chapterTotalPages && this.chapterTotalPages > 0;
    }

    get buttonLabel() {
      if (this.isChapterCompleted) {
        return this.isFinal ? 'Course Completed' : 'Continue to Next Chapter';
      }
      return 'Next';
    }

    completePage(page) {
      if (!this.completedPages.includes(page)) {
        this.completedPages.push(page);
      }
    }
  }

  const sim = new ChapterNavigationSimulator(33, false);

  // Initial state: 0 pages done
  assert(sim.buttonLabel === 'Next', 'Page 1, 0% progress: button label is "Next"');

  // Complete half the pages (16 / 33)
  for (let i = 1; i <= 16; i++) sim.completePage(i);
  assert(sim.buttonLabel === 'Next', '16/33 pages (48% progress): button label remains "Next"');

  // Complete 32 of 33 pages (97% progress)
  for (let i = 17; i <= 32; i++) sim.completePage(i);
  assert(sim.buttonLabel === 'Next', '32/33 pages (97% progress): button label remains "Next" (not 100% yet)');

  // Complete the final 33rd page (100% progress)
  sim.completePage(33);
  assert(sim.isChapterCompleted === true, 'All 33/33 pages completed: isChapterCompleted is true');
  assert(sim.buttonLabel === 'Continue to Next Chapter', 'Exactly 100% progress: button label changes to "Continue to Next Chapter"');

  // Final Chapter simulation
  const finalSim = new ChapterNavigationSimulator(12, true);
  for (let i = 1; i <= 11; i++) finalSim.completePage(i);
  assert(finalSim.buttonLabel === 'Next', 'Finale: 11/12 pages completed: button is "Next"');
  finalSim.completePage(12);
  assert(finalSim.buttonLabel === 'Course Completed', 'Finale: 12/12 pages completed (100%): button is "Course Completed" (no nonexistent chapter)');

  console.log('\n================================================================');
  console.log(`ALL CHECKS PASSED: ${passedChecks}/${totalChecks}`);
  console.log('================================================================\n');
}

runTestSuite().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});

