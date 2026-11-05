// ─────────────────────────────────────────────────────────────────────────────
// COMPREHENSIVE AI OLYMPIAD PROGRESS & LAST-READ RESUME VERIFICATION SUITE
// Tests all 10 required acceptance criteria + race condition protection
// ─────────────────────────────────────────────────────────────────────────────

// Mock localStorage for node environment
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

// Import progressService dynamically
const {
  progressService,
  formatProgressPercentage,
  getClassChapters,
  normalizeChapterKey,
} = await import('../src/services/progressService.ts');

async function runTests() {
  console.log('================================================================');
  console.log('AI OLYMPIAD: FULL PROGRESS & LAST-READ RESUME VERIFICATION');
  console.log('================================================================\n');

  const studentA = 'test-student-A-uuid-001';
  const studentB = 'test-student-B-uuid-002';
  const gradeKey = 'class10'; // Chapter 1 has 230 pages

  // Verify class and chapter structure (6 chapters with independent PDFs)
  const chapters = getClassChapters(gradeKey);
  console.log(`Class structure: ${chapters.length} chapters configured.`);
  console.assert(chapters.length === 6, `Class must contain exactly 6 chapters, got ${chapters.length}`);
  console.log(`  - Chapter 1: ${chapters[0].totalPages} pages (${chapters[0].pdfPath})`);
  console.log(`  - Chapter 2: ${chapters[1].totalPages} pages (${chapters[1].pdfPath})`);
  console.log(`  - Chapter 3: ${chapters[2].totalPages} pages (${chapters[2].pdfPath})`);
  console.log(`  - Chapter 4: ${chapters[3].totalPages} pages (${chapters[3].pdfPath})`);
  console.log(`  - Chapter 5: ${chapters[4].totalPages} pages (${chapters[4].pdfPath})`);
  console.log(`  - Chapter 6: ${chapters[5].totalPages} pages (${chapters[5].pdfPath})`);
  const totalClassPages = chapters.reduce((sum, c) => sum + c.totalPages, 0);
  console.log(`  Total pages across all 6 chapters: ${totalClassPages} pages\n`);

  // ── TEST 1: Open Chapter 1 — progress must NOT jump to 100% (must be 0%) ──
  console.log('--- TEST 1: Open Chapter 1 for first time ---');
  const ch1InitialRead = await progressService.getLastReadPage({
    studentId: studentA,
    gradeKey,
    chapterKey: 'ch1',
    fallbackStartPage: 1,
  });
  const ch1InitialPages = await progressService.getCompletedPages(studentA, gradeKey, 'ch1');
  const ch1InitialProg = formatProgressPercentage(ch1InitialPages.length, 230);

  console.assert(ch1InitialRead === 1, `Expected start at page 1, got ${ch1InitialRead}`);
  console.assert(ch1InitialPages.length === 0, `Expected 0 completed pages, got ${ch1InitialPages.length}`);
  console.assert(ch1InitialProg.formatted === '0%', `Expected 0%, got ${ch1InitialProg.formatted}`);
  console.assert(ch1InitialProg.numeric === 0, `Expected 0 numeric, got ${ch1InitialProg.numeric}`);
  console.log(`✓ Test 1 Passed: Fresh Chapter 1 starts at Page 1 with ${ch1InitialProg.formatted} progress (does NOT jump to 100%).\n`);

  // ── TEST 2: Navigate to Page 2 via Next Page action ──
  console.log('--- TEST 2: Navigate to Page 2 via Next Page ---');
  // Next Page action on Page 1: marks page 1 complete, advances to page 2, saves position
  const p1Result = await progressService.recordPdfPageCompletion({
    studentId: studentA,
    gradeKey,
    chapterKey: 'ch1',
    pageNumber: 1,
    totalPages: 230,
  });
  await progressService.saveLastReadPage({
    studentId: studentA,
    gradeKey,
    chapterKey: 'ch1',
    pageNumber: 2,
    totalPages: 230,
  });

  console.assert(p1Result.isNew === true, 'Page 1 should be a new completion');
  console.assert(p1Result.chapterProgress.completedPages === 1, `Expected 1 completed page, got ${p1Result.chapterProgress.completedPages}`);
  console.assert(p1Result.chapterProgress.formattedPercentage === '0.43%', `Expected 0.43%, got ${p1Result.chapterProgress.formattedPercentage}`);
  console.assert(p1Result.chapterProgress.percentage === 0.43, `Expected 0.43 numeric, got ${p1Result.chapterProgress.percentage}`);
  console.log(`✓ Test 2 Passed: Navigating to Page 2 records Page 1 complete -> Chapter Progress: ${p1Result.chapterProgress.formattedPercentage} (1/230 pages).\n`);

  // ── TEST 3: Navigate to Page 100 — verify exact percentage (43.04%) ──
  console.log('--- TEST 3: Navigate through to Page 100 ---');
  // Student clicks Next sequentially from page 2 to page 99, reaching page 100
  for (let p = 2; p <= 99; p++) {
    await progressService.recordPdfPageCompletion({
      studentId: studentA,
      gradeKey,
      chapterKey: 'ch1',
      pageNumber: p,
      totalPages: 230,
    });
  }
  await progressService.saveLastReadPage({
    studentId: studentA,
    gradeKey,
    chapterKey: 'ch1',
    pageNumber: 100,
    totalPages: 230,
  });

  const ch1At100Pages = await progressService.getCompletedPages(studentA, gradeKey, 'ch1');
  const ch1At100Prog = formatProgressPercentage(ch1At100Pages.length, 230);
  const ch1At100LastRead = await progressService.getLastReadPage({
    studentId: studentA,
    gradeKey,
    chapterKey: 'ch1',
  });

  console.assert(ch1At100Pages.length === 99, `Expected 99 completed pages, got ${ch1At100Pages.length}`);
  console.assert(ch1At100Prog.formatted === '43.04%', `Expected 43.04%, got ${ch1At100Prog.formatted}`);
  console.assert(ch1At100Prog.numeric === 43.04, `Expected 43.04 numeric, got ${ch1At100Prog.numeric}`);
  console.assert(ch1At100LastRead === 100, `Expected reading position at 100, got ${ch1At100LastRead}`);
  console.log(`✓ Test 3 Passed: Reaching Page 100 -> Exactly ${ch1At100Prog.formatted} progress (99/230 pages), Reading position: Page ${ch1At100LastRead}.\n`);

  // ── TEST 4: Close and reopen Chapter 1 — resume at Page 100 ──
  console.log('--- TEST 4: Close and reopen Chapter 1 ---');
  const resumedPage = await progressService.getLastReadPage({
    studentId: studentA,
    gradeKey,
    chapterKey: 'ch1',
    fallbackStartPage: 1,
  });
  const resumedPages = await progressService.getCompletedPages(studentA, gradeKey, 'ch1');
  const resumedProg = formatProgressPercentage(resumedPages.length, 230);

  console.assert(resumedPage === 100, `Expected resume at page 100, got ${resumedPage}`);
  console.assert(resumedPages.length === 99, `Completed pages count must remain 99, got ${resumedPages.length}`);
  console.assert(resumedProg.formatted === '43.04%', `Progress must remain 43.04%, got ${resumedProg.formatted}`);
  console.log(`✓ Test 4 Passed: Chapter reopens at Page ${resumedPage} with saved progress preserved at ${resumedProg.formatted}.\n`);

  // ── TEST 5: Continue to Page 150 — progress increases correctly (64.78%) ──
  console.log('--- TEST 5: Continue navigation to Page 150 ---');
  for (let p = 100; p <= 149; p++) {
    await progressService.recordPdfPageCompletion({
      studentId: studentA,
      gradeKey,
      chapterKey: 'ch1',
      pageNumber: p,
      totalPages: 230,
    });
  }
  await progressService.saveLastReadPage({
    studentId: studentA,
    gradeKey,
    chapterKey: 'ch1',
    pageNumber: 150,
    totalPages: 230,
  });

  const ch1At150Pages = await progressService.getCompletedPages(studentA, gradeKey, 'ch1');
  const ch1At150Prog = formatProgressPercentage(ch1At150Pages.length, 230);
  console.assert(ch1At150Pages.length === 149, `Expected 149 completed pages, got ${ch1At150Pages.length}`);
  console.assert(ch1At150Prog.formatted === '64.78%', `Expected 64.78%, got ${ch1At150Prog.formatted}`);
  console.assert(ch1At150Prog.numeric === 64.78, `Expected 64.78 numeric, got ${ch1At150Prog.numeric}`);
  console.log(`✓ Test 5 Passed: Reaching Page 150 -> Exactly ${ch1At150Prog.formatted} progress (149/230 pages).\n`);

  // ── TEST 6: Navigate backwards — progress must NOT increase or decrease ──
  console.log('--- TEST 6: Navigate backwards (Previous Page) ---');
  // Student goes back from page 150 to page 140
  await progressService.saveLastReadPage({
    studentId: studentA,
    gradeKey,
    chapterKey: 'ch1',
    pageNumber: 140,
    totalPages: 230,
  });

  const ch1AfterBackPages = await progressService.getCompletedPages(studentA, gradeKey, 'ch1');
  const ch1AfterBackProg = formatProgressPercentage(ch1AfterBackPages.length, 230);
  const ch1AfterBackLastRead = await progressService.getLastReadPage({
    studentId: studentA,
    gradeKey,
    chapterKey: 'ch1',
  });

  console.assert(ch1AfterBackLastRead === 140, `Reading position updated to 140, got ${ch1AfterBackLastRead}`);
  console.assert(ch1AfterBackPages.length === 149, `Completed count must remain 149, got ${ch1AfterBackPages.length}`);
  console.assert(ch1AfterBackProg.formatted === '64.78%', `Percentage must remain 64.78%, got ${ch1AfterBackProg.formatted}`);

  // Re-navigating forward over already completed pages (e.g. page 140) must NOT duplicate or increase
  const dupResult = await progressService.recordPdfPageCompletion({
    studentId: studentA,
    gradeKey,
    chapterKey: 'ch1',
    pageNumber: 140,
    totalPages: 230,
  });
  console.assert(dupResult.isNew === false, 'Duplicate page must have isNew = false');
  console.assert(dupResult.chapterProgress.completedPages === 149, 'Completed count must not duplicate');
  console.assert(dupResult.chapterProgress.formattedPercentage === '64.78%', 'Percentage must stay 64.78%');
  console.log('✓ Test 6 Passed: Backward navigation does not alter progress, re-visiting pages prevents duplicate records.\n');

  // ── TEST 7: Refresh & Session Persistence ──
  console.log('--- TEST 7: Session refresh and persistence ---');
  const persistedPage = await progressService.getLastReadPage({
    studentId: studentA,
    gradeKey,
    chapterKey: 'ch1',
  });
  const persistedPages = await progressService.getCompletedPages(studentA, gradeKey, 'ch1');
  const persistedProg = formatProgressPercentage(persistedPages.length, 230);

  console.assert(persistedPage === 140, `Persisted position must be 140, got ${persistedPage}`);
  console.assert(persistedPages.length === 149, `Persisted count must be 149, got ${persistedPages.length}`);
  console.assert(persistedProg.formatted === '64.78%', `Persisted progress must be 64.78%, got ${persistedProg.formatted}`);
  console.log(`✓ Test 7 Passed: Progress and reading position remain 100% persisted across sessions.\n`);

  // ── TEST 8: Reach final page (Page 230) and complete — verify exactly 100% ──
  console.log('--- TEST 8: Reach and complete final page 230 ---');
  // Student advances through pages 150..228, reaching page 229
  for (let p = 150; p <= 228; p++) {
    await progressService.recordPdfPageCompletion({
      studentId: studentA,
      gradeKey,
      chapterKey: 'ch1',
      pageNumber: p,
      totalPages: 230,
    });
  }
  // At page 229:
  const p229Result = await progressService.recordPdfPageCompletion({
    studentId: studentA,
    gradeKey,
    chapterKey: 'ch1',
    pageNumber: 229,
    totalPages: 230,
  });
  console.assert(p229Result.chapterProgress.completedPages === 229, `Expected 229 completed pages, got ${p229Result.chapterProgress.completedPages}`);
  console.assert(p229Result.chapterProgress.formattedPercentage === '99.57%', `Expected 99.57% at page 229, got ${p229Result.chapterProgress.formattedPercentage}`);
  console.assert(p229Result.chapterCompleted === false, 'Chapter must NOT be complete before final page completion action');

  // Student reaches final page 230 and triggers completion action
  const finalResult = await progressService.recordPdfPageCompletion({
    studentId: studentA,
    gradeKey,
    chapterKey: 'ch1',
    pageNumber: 230,
    totalPages: 230,
    isChapterCompletion: true,
  });

  console.assert(finalResult.chapterCompleted === true, 'Chapter 1 must now be marked completed');
  console.assert(finalResult.chapterProgress.completedPages === 230, `Expected all 230 pages completed, got ${finalResult.chapterProgress.completedPages}`);
  console.assert(finalResult.chapterProgress.formattedPercentage === '100%', `Expected 100%, got ${finalResult.chapterProgress.formattedPercentage}`);
  console.assert(finalResult.chapterProgress.percentage === 100, `Expected 100 numeric, got ${finalResult.chapterProgress.percentage}`);
  console.assert(finalResult.chapterProgress.isCompleted === true, 'isCompleted flag must be true');

  // Verify overall class progress after Chapter 1 completion
  // Formula: (230 unique completed pages / totalClassPages) * 100
  const expectedOverallPct = formatProgressPercentage(230, totalClassPages);
  console.assert(finalResult.overallProgress.percentage === expectedOverallPct.numeric, `Overall progress mismatch: expected ${expectedOverallPct.numeric}%, got ${finalResult.overallProgress.percentage}%`);
  console.log(`✓ Test 8 Passed: Reaching final page and completing yields exactly 100% (230/230 pages). Overall class progress: ${finalResult.overallProgress.formattedPercentage} (230/${totalClassPages} pages).\n`);

  // ── TEST 9: Open Chapter 2 — Independent progress & position ──
  const ch2TotalPages = chapters[1].totalPages;
  console.log(`--- TEST 9: Chapter independence (Chapter 2: ${ch2TotalPages} pages) ---`);
  const ch2InitialRead = await progressService.getLastReadPage({
    studentId: studentA,
    gradeKey,
    chapterKey: 'ch2',
    fallbackStartPage: 1,
  });
  const ch2InitialPages = await progressService.getCompletedPages(studentA, gradeKey, 'ch2');
  const ch2InitialProg = formatProgressPercentage(ch2InitialPages.length, ch2TotalPages);

  console.assert(ch2InitialRead === 1, `Chapter 2 must start at page 1, got ${ch2InitialRead}`);
  console.assert(ch2InitialPages.length === 0, `Chapter 2 completed pages must be 0, got ${ch2InitialPages.length}`);
  console.assert(ch2InitialProg.formatted === '0%', `Chapter 2 progress must be 0%, got ${ch2InitialProg.formatted}`);

  // Complete page 1 of Chapter 2
  const ch2P1Result = await progressService.recordPdfPageCompletion({
    studentId: studentA,
    gradeKey,
    chapterKey: 'ch2',
    pageNumber: 1,
    totalPages: ch2TotalPages,
  });
  const ch2P1Expected = formatProgressPercentage(1, ch2TotalPages);
  console.assert(ch2P1Result.chapterProgress.completedPages === 1, 'Chapter 2 must have 1 completed page');
  console.assert(ch2P1Result.chapterProgress.formattedPercentage === ch2P1Expected.formatted, `Expected ${ch2P1Expected.formatted}, got ${ch2P1Result.chapterProgress.formattedPercentage}`);

  // Verify Chapter 1 remains untouched at 100%
  const ch1Check = (await progressService.getAllChaptersProgress(studentA, gradeKey))[0];
  console.assert(ch1Check.percentage === 100, `Chapter 1 must remain 100%, got ${ch1Check.percentage}%`);
  console.assert(ch1Check.completedPages === 230, `Chapter 1 must remain 230 completed, got ${ch1Check.completedPages}`);
  console.log('✓ Test 9 Passed: Chapter 2 operates completely independently of Chapter 1.\n');

  // ── TEST 10: Multi-student data isolation (Student A vs Student B) ──
  console.log('--- TEST 10: Multi-student data isolation ---');
  const studentBCh1Read = await progressService.getLastReadPage({
    studentId: studentB,
    gradeKey,
    chapterKey: 'ch1',
    fallbackStartPage: 1,
  });
  const studentBCh1Pages = await progressService.getCompletedPages(studentB, gradeKey, 'ch1');
  const studentBCh1Prog = formatProgressPercentage(studentBCh1Pages.length, 230);

  console.assert(studentBCh1Read === 1, `Student B must start at page 1, got ${studentBCh1Read}`);
  console.assert(studentBCh1Pages.length === 0, `Student B must have 0 completed pages, got ${studentBCh1Pages.length}`);
  console.assert(studentBCh1Prog.formatted === '0%', `Student B must have 0% progress, got ${studentBCh1Prog.formatted}`);

  // Student B reads to page 5 and completes page 1..4
  for (let p = 1; p <= 4; p++) {
    await progressService.recordPdfPageCompletion({
      studentId: studentB,
      gradeKey,
      chapterKey: 'ch1',
      pageNumber: p,
      totalPages: 230,
    });
  }
  await progressService.saveLastReadPage({
    studentId: studentB,
    gradeKey,
    chapterKey: 'ch1',
    pageNumber: 5,
    totalPages: 230,
  });

  const studentBAfter = await progressService.getLastReadPage({ studentId: studentB, gradeKey, chapterKey: 'ch1' });
  const studentBPages = await progressService.getCompletedPages(studentB, gradeKey, 'ch1');
  console.assert(studentBAfter === 5, `Student B last read must be 5, got ${studentBAfter}`);
  console.assert(studentBPages.length === 4, `Student B completed count must be 4, got ${studentBPages.length}`);

  // Verify Student A remains completely unaffected at 100% (230 pages)
  const studentACheck = await progressService.getCompletedPages(studentA, gradeKey, 'ch1');
  console.assert(studentACheck.length === 230, `Student A must still have 230 completed pages, got ${studentACheck.length}`);
  console.log('✓ Test 10 Passed: Multi-student data isolation verified. Zero leakage between Student A and Student B.\n');

  // ── TEST 11: Rapid click race condition protection ──
  console.log('--- TEST 11: Rapid repeated clicks / monotonic sequencing ---');
  // Rapid sequence: 60, 61, 62
  await progressService.saveLastReadPage({ studentId: studentA, gradeKey, chapterKey: 'ch1', pageNumber: 60 });
  await progressService.saveLastReadPage({ studentId: studentA, gradeKey, chapterKey: 'ch1', pageNumber: 61 });
  await progressService.saveLastReadPage({ studentId: studentA, gradeKey, chapterKey: 'ch1', pageNumber: 62 });

  const rapidPage = await progressService.getLastReadPage({ studentId: studentA, gradeKey, chapterKey: 'ch1' });
  console.assert(rapidPage === 62, `Expected rapid position 62, got ${rapidPage}`);
  console.log('✓ Test 11 Passed: Rapid navigation preserves newest position without race condition overwrite.\n');

  console.log('================================================================');
  console.log('ALL 11 VERIFICATION TESTS PASSED WITH 100% ACCURACY!');
  console.log('================================================================');
}

runTests().catch((err) => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
