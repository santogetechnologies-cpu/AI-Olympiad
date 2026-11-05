// ============================================================
// VERIFICATION SUITE: PDF CHAPTER SEGMENTATION & PROGRESS
// ============================================================

import assert from 'assert';

// Mock localStorage and window for Node environment
const storageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = String(value); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
    _dump: () => ({ ...store }),
  };
})();

globalThis.localStorage = storageMock;
globalThis.window = {
  dispatchEvent: () => true,
  addEventListener: () => {},
  removeEventListener: () => {},
};
globalThis.CustomEvent = class CustomEvent {
  constructor(type, eventInitDict) {
    this.type = type;
    this.detail = eventInitDict?.detail;
  }
};

const {
  progressService,
  getClassChapters,
  normalizeChapterKey,
  formatProgressPercentage,
  CLASS_CHAPTER_BOUNDARIES
} = await import('../src/services/progressService.ts');

console.log('================================================================');
console.log('AI OLYMPIAD: PDF CHAPTER SEGMENTATION & PROGRESS VERIFICATION');
console.log('================================================================\n');

// 1. Structure Verification: Exactly 8 sections for all 16 grades
const ALL_GRADES = [
  'class3', 'class4', 'class5', 'class6', 'class7', 'class8', 'class9', 'class10',
  'class11', 'class12', 'ug1', 'ug2', 'ug3', 'ug4', 'pg1', 'pg2'
];

for (const grade of ALL_GRADES) {
  const chapters = getClassChapters(grade);
  assert.strictEqual(chapters.length, 8, `${grade} must have exactly 8 sections`);

  // Section 0: Welcome / Intro (Exactly 5 pages: 1–5)
  assert.strictEqual(chapters[0].key, 'intro', `${grade} section 0 must be intro`);
  assert.strictEqual(chapters[0].code, 'INTRO');
  assert.strictEqual(chapters[0].startPage, 1, `${grade} intro must start at page 1`);
  assert.strictEqual(chapters[0].endPage, 5, `${grade} intro must end at page 5`);
  assert.strictEqual(chapters[0].totalPages, 5, `${grade} intro must have 5 pages`);

  // Section 1: Month 1 (Starts at page 6)
  assert.strictEqual(chapters[1].key, 'ch1');
  assert.strictEqual(chapters[1].startPage, 6, `${grade} ch1 must start at page 6`);

  // Continuity across sections 1 to 6
  let prevEnd = 5;
  for (let i = 1; i <= 6; i++) {
    const ch = chapters[i];
    assert.strictEqual(ch.startPage, prevEnd + 1, `${grade} ch${i} must start at ${prevEnd + 1}`);
    assert.strictEqual(ch.totalPages, ch.endPage - ch.startPage + 1, `${grade} ch${i} totalPages formula mismatch`);
    prevEnd = ch.endPage;
  }

  // Section 7: Finale (Starts at Certificate page and ends on PDF final page)
  const finale = chapters[7];
  assert.strictEqual(finale.key, 'finale');
  assert.strictEqual(finale.startPage, prevEnd + 1, `${grade} finale must start at ${prevEnd + 1}`);
  assert.strictEqual(finale.totalPages, finale.endPage - finale.startPage + 1);

  // Total pages across all 8 sections must equal book total
  const sumPages = chapters.reduce((acc, c) => acc + c.totalPages, 0);
  const totalPdfPages = CLASS_CHAPTER_BOUNDARIES[grade].totalPages;
  assert.strictEqual(sumPages, totalPdfPages, `${grade} sum of 8 sections (${sumPages}) must equal total PDF pages (${totalPdfPages})`);
}
console.log('✓ TEST 1 PASSED: All 16 grades have exactly 8 contiguous sections with zero gaps and zero overlaps.\n');

// 2. Normalization verification
assert.strictEqual(normalizeChapterKey('0'), 'intro');
assert.strictEqual(normalizeChapterKey('intro'), 'intro');
assert.strictEqual(normalizeChapterKey('welcome'), 'intro');
assert.strictEqual(normalizeChapterKey('month 0'), 'intro');
assert.strictEqual(normalizeChapterKey('ch1'), 'ch1');
assert.strictEqual(normalizeChapterKey('1'), 'ch1');
assert.strictEqual(normalizeChapterKey('ch6'), 'ch6');
assert.strictEqual(normalizeChapterKey('6'), 'ch6');
assert.strictEqual(normalizeChapterKey('7'), 'finale');
assert.strictEqual(normalizeChapterKey('finale'), 'finale');
assert.strictEqual(normalizeChapterKey('certificate'), 'finale');
console.log('✓ TEST 2 PASSED: normalizeChapterKey correctly maps intro, ch1..ch6, and finale.\n');

// 3. Intro / Welcome Section (5 pages) Independent Progress
console.log('--- TEST 3: Intro / Welcome Page Segmentation (Pages 1–5) ---');
const student1 = 'student-test-segment-001';
const gradeKey = 'class3';

// Initial read starts at page 1
const introInitPage = await progressService.getLastReadPage({
  studentId: student1,
  gradeKey,
  chapterKey: 'intro',
  fallbackStartPage: 1
});
assert.strictEqual(introInitPage, 1, 'Intro must start at page 1');

// Page 1 completed
const introP1 = await progressService.recordPdfPageCompletion({
  studentId: student1,
  gradeKey,
  chapterKey: 'intro',
  pageNumber: 1
});
assert.strictEqual(introP1.chapterProgress.completedPages, 1);
assert.strictEqual(introP1.chapterProgress.totalPages, 5);
assert.strictEqual(introP1.chapterProgress.formattedPercentage, '20.00%');
assert.strictEqual(introP1.chapterProgress.isCompleted, false);

// Page 2 completed
const introP2 = await progressService.recordPdfPageCompletion({
  studentId: student1,
  gradeKey,
  chapterKey: 'intro',
  pageNumber: 2
});
assert.strictEqual(introP2.chapterProgress.completedPages, 2);
assert.strictEqual(introP2.chapterProgress.formattedPercentage, '40.00%');

// Page 3, 4 completed
await progressService.recordPdfPageCompletion({ studentId: student1, gradeKey, chapterKey: 'intro', pageNumber: 3 });
const introP4 = await progressService.recordPdfPageCompletion({
  studentId: student1,
  gradeKey,
  chapterKey: 'intro',
  pageNumber: 4
});
assert.strictEqual(introP4.chapterProgress.completedPages, 4);
assert.strictEqual(introP4.chapterProgress.formattedPercentage, '80.00%');
assert.strictEqual(introP4.chapterProgress.isCompleted, false);

// Save reading position on page 4
await progressService.saveLastReadPage({
  studentId: student1,
  gradeKey,
  chapterKey: 'intro',
  pageNumber: 4
});
const introSavedPage = await progressService.getLastReadPage({
  studentId: student1,
  gradeKey,
  chapterKey: 'intro'
});
assert.strictEqual(introSavedPage, 4, 'Saved reading position for intro must be 4');

// Finally completing page 5 results in 100%
const introP5 = await progressService.recordPdfPageCompletion({
  studentId: student1,
  gradeKey,
  chapterKey: 'intro',
  pageNumber: 5
});
assert.strictEqual(introP5.chapterProgress.completedPages, 5);
assert.strictEqual(introP5.chapterProgress.formattedPercentage, '100%');
assert.strictEqual(introP5.chapterProgress.isCompleted, true);
console.log('✓ TEST 3 PASSED: Intro progress accurately increases 20%, 40%, 60%, 80%, 100% and marks complete only when all 5 pages are done.\n');

// 4. Chapter 1 (Month 1, 33 pages in Class 3) Independent Progress
console.log('--- TEST 4: Chapter 1 Month 1 Page Segmentation (33 Pages: Physical 6–38) ---');
// Initial read starts at page 1 (relative)
const ch1InitPage = await progressService.getLastReadPage({
  studentId: student1,
  gradeKey,
  chapterKey: 'ch1',
  fallbackStartPage: 1
});
assert.strictEqual(ch1InitPage, 1, 'Chapter 1 must start at relative page 1');

// Verify Chapter 1 progress is 0% even though Intro is 100% (Independence!)
const ch1CompletedPages = await progressService.getCompletedPages(student1, gradeKey, 'ch1');
assert.strictEqual(ch1CompletedPages.length, 0, 'Chapter 1 must start with 0 completed pages');

// Complete relative page 1 of Chapter 1
const ch1P1 = await progressService.recordPdfPageCompletion({
  studentId: student1,
  gradeKey,
  chapterKey: 'ch1',
  pageNumber: 1
});
assert.strictEqual(ch1P1.chapterProgress.completedPages, 1);
assert.strictEqual(ch1P1.chapterProgress.totalPages, 33);
assert.strictEqual(ch1P1.chapterProgress.formattedPercentage, '3.03%');
assert.strictEqual(ch1P1.chapterProgress.isCompleted, false);

// Complete relative pages up to 15 (e.g. 15 / 33 = 45.45%)
for (let p = 2; p <= 15; p++) {
  await progressService.recordPdfPageCompletion({
    studentId: student1,
    gradeKey,
    chapterKey: 'ch1',
    pageNumber: p
  });
}
const ch1P15 = await progressService.recordPdfPageCompletion({
  studentId: student1,
  gradeKey,
  chapterKey: 'ch1',
  pageNumber: 15
});
assert.strictEqual(ch1P15.chapterProgress.completedPages, 15);
assert.strictEqual(ch1P15.chapterProgress.formattedPercentage, '45.45%');

// Save last-read page 15 for Chapter 1
await progressService.saveLastReadPage({
  studentId: student1,
  gradeKey,
  chapterKey: 'ch1',
  pageNumber: 15
});
const ch1SavedPage = await progressService.getLastReadPage({
  studentId: student1,
  gradeKey,
  chapterKey: 'ch1'
});
assert.strictEqual(ch1SavedPage, 15, 'Chapter 1 last read page must resume at 15');

// Verify Intro saved page is still 4 (no cross-contamination!)
const introStillSaved = await progressService.getLastReadPage({
  studentId: student1,
  gradeKey,
  chapterKey: 'intro'
});
assert.strictEqual(introStillSaved, 4, 'Intro last read page must still be 4');
console.log('✓ TEST 4 PASSED: Chapter 1 has independent progress (45.45%) and independent last-read page resumption (page 15) with zero cross-contamination.\n');

// 5. Finale Section (9 pages in Class 3, Physical 210–218)
console.log('--- TEST 5: Finale Section Page Segmentation (9 Pages: Physical 210–218) ---');
const finaleInitPage = await progressService.getLastReadPage({
  studentId: student1,
  gradeKey,
  chapterKey: 'finale',
  fallbackStartPage: 1
});
assert.strictEqual(finaleInitPage, 1, 'Finale must start at relative page 1');

// Complete relative page 1 of Finale
const finaleP1 = await progressService.recordPdfPageCompletion({
  studentId: student1,
  gradeKey,
  chapterKey: 'finale',
  pageNumber: 1
});
assert.strictEqual(finaleP1.chapterProgress.completedPages, 1);
assert.strictEqual(finaleP1.chapterProgress.totalPages, 9);
assert.strictEqual(finaleP1.chapterProgress.formattedPercentage, '11.11%');
assert.strictEqual(finaleP1.chapterProgress.isCompleted, false);

// Save reading position for Finale: page 3
await progressService.saveLastReadPage({
  studentId: student1,
  gradeKey,
  chapterKey: 'finale',
  pageNumber: 3
});
const finaleSavedPage = await progressService.getLastReadPage({
  studentId: student1,
  gradeKey,
  chapterKey: 'finale'
});
assert.strictEqual(finaleSavedPage, 3, 'Finale saved page must be 3');
console.log('✓ TEST 5 PASSED: Finale has independent 9-page segmentation, accurate progress, and last-read page resumption.\n');

// 6. Overall Progress across all 8 chapters
console.log('--- TEST 6: Overall Progress Calculation across All 8 Chapters ---');
const allProg = await progressService.getAllChaptersProgress(student1, gradeKey);
assert.strictEqual(allProg.length, 8, 'getAllChaptersProgress must return 8 chapters');
assert.strictEqual(allProg[0].key, 'intro');
assert.strictEqual(allProg[0].isCompleted, true);
assert.strictEqual(allProg[0].percentage, 100);
assert.strictEqual(allProg[1].key, 'ch1');
assert.strictEqual(allProg[1].isCompleted, false);
assert.strictEqual(allProg[1].completedPages, 15);
assert.strictEqual(allProg[1].totalPages, 33);
assert.strictEqual(allProg[7].key, 'finale');
assert.strictEqual(allProg[7].completedPages, 1);
assert.strictEqual(allProg[7].totalPages, 9);

const overall = await progressService.getPdfOverallProgress(student1, gradeKey);
assert.strictEqual(overall.totalPages, 218, 'Class 3 total pages must be exactly 218');
// Completed: 5 (intro) + 15 (ch1) + 1 (finale) = 21 pages
assert.strictEqual(overall.completedPages, 21, 'Overall completed pages must equal 21');
assert.strictEqual(overall.formattedPercentage, '9.63%'); // 21 / 218 * 100 = 9.63%
console.log(`✓ TEST 6 PASSED: Overall progress is dynamically aggregated across all 8 sections (${overall.completedPages}/${overall.totalPages} = ${overall.formattedPercentage}).\n`);

console.log('================================================================');
console.log('ALL VERIFICATION TESTS COMPLETED SUCCESSFULLY!');
console.log('================================================================');
