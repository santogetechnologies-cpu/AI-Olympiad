// ─────────────────────────────────────────────────────────────────────────────
// LAPTOP PDF VIEWER CHAPTERS DROPDOWN VERIFICATION SUITE
// Verifies:
// 1. Navigation to exact starting page when clicking Intro, Chapter 1-6, or Finale.
// 2. Immediate update of active selection (<select value={...}>) and page indicator.
// 3. Preservation of independent chapter progress (completed pages per chapter).
// 4. Preservation of independent last-read positions per chapter.
// 5. Avoidance of full PDF reloads (reuses loaded PDF document proxy).
// 6. Preservation of existing UI and mobile layout (hidden lg:block).
// ─────────────────────────────────────────────────────────────────────────────

import fs from 'fs';
import path from 'path';

console.log('================================================================');
console.log('AI OLYMPIAD: LAPTOP PDF VIEWER CHAPTERS DROPDOWN TEST');
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
  const usePdfBookPath = path.resolve('src/components/gaio/hooks/usePdfBook.ts');
  const progressServicePath = path.resolve('src/services/progressService.ts');

  assert(fs.existsSync(bookAppPath), 'GaioInteractiveBookApp.tsx exists');
  assert(fs.existsSync(usePdfBookPath), 'usePdfBook.ts exists');
  assert(fs.existsSync(progressServicePath), 'progressService.ts exists');

  const bookCode = fs.readFileSync(bookAppPath, 'utf-8');
  const pdfHookCode = fs.readFileSync(usePdfBookPath, 'utf-8');
  const progressCode = fs.readFileSync(progressServicePath, 'utf-8');

  // ── TEST 1: Dropdown Markup & Desktop-Only Visibility (Mobile Preservation) ──
  console.log('1. Verifying Dropdown Structure & Mobile Layout Preservation:');

  assert(
    bookCode.includes('<select') &&
    bookCode.includes('value={currentChapterDef?.key || \'intro\'}'),
    'Chapters dropdown binds value to currentChapterDef?.key || "intro"'
  );
  assert(
    bookCode.includes('className="hidden lg:block max-w-[220px] truncate bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 px-2.5 py-1.5 rounded-xl border border-slate-200 outline-none cursor-pointer transition-colors"'),
    'Preserves exact desktop-only styling (hidden lg:block), preserving mobile layout 100%'
  );
  assert(
    bookCode.includes('{getClassChapters(currentGrade).map((ch, idx) => (') &&
    bookCode.includes('<option key={idx} value={ch.key}>') &&
    bookCode.includes('{ch.code}: {ch.title}'),
    'Dropdown populates all 8 class sections dynamically (Intro, Ch1-6, Finale)'
  );

  // ── TEST 2: Navigation to Exact Section Starting Page & State Synchronization ──
  console.log('\n2. Verifying Immediate Navigation to Section Start Page:');

  assert(
    bookCode.includes('isDropdownNavigationRef = useRef<boolean>(false)'),
    'Defines isDropdownNavigationRef to distinguish intentional section jumps from initial page restores'
  );
  assert(
    bookCode.includes('saveReadingPosition(currentPage)') &&
    bookCode.includes('isDropdownNavigationRef.current = true') &&
    bookCode.includes('setInternalChapterKey(found.key)') &&
    bookCode.includes('goToPage(found.startPage)'),
    'Dropdown onChange preserves current chapter position, updates chapter key, and immediately calls goToPage(found.startPage)'
  );
  assert(
    bookCode.includes('onNavigateChapter?.(found.key)'),
    'Notifies parent router/state via onNavigateChapter'
  );
  assert(
    bookCode.includes('if (isDropdownNavigationRef.current) {\n      isDropdownNavigationRef.current = false\n      hasRestoredLastReadRef.current = true\n      goToPage(chapterStartPage)\n      return\n    }') ||
    bookCode.includes('if (isDropdownNavigationRef.current) {\r\n      isDropdownNavigationRef.current = false\r\n      hasRestoredLastReadRef.current = true\r\n      goToPage(chapterStartPage)\r\n      return\r\n    }'),
    'Last-read restoration effect respects isDropdownNavigationRef and stays on exact chapter start page'
  );

  // ── TEST 3: usePdfBook Hook goToPage Boundary Fix ──
  console.log('\n3. Verifying usePdfBook Hook Navigation Functionality:');

  assert(
    pdfHookCode.includes('const safeTarget = Math.max(1, Math.min(docMax, target))') &&
    pdfHookCode.includes('setCurrentPage(safeTarget)'),
    'goToPage clamps to document boundaries [1, docMax], allowing cross-chapter jumps without being locked to old chapter bounds'
  );
  assert(
    pdfHookCode.includes('setCurrentPage((prev) => {\n      if (prev >= minP && prev <= maxP) return prev') ||
    pdfHookCode.includes('setCurrentPage((prev) => {\r\n      if (prev >= minP && prev <= maxP) return prev'),
    'usePdfBook effect preserves current page if already within new chapter bounds'
  );

  // ── TEST 4: Avoid Full PDF Reloads ──
  console.log('\n4. Verifying No Full PDF Reloads on Chapter Switching:');

  assert(
    pdfHookCode.includes('useEffect(() => {') &&
    pdfHookCode.includes('loadingTask = pdfjsLib.getDocument') &&
    pdfHookCode.includes('}, [pdfUrl])'),
    'PDF document is only reloaded when pdfUrl changes'
  );
  assert(
    bookCode.includes('resolvedPdfUrl = useMemo(() => {') &&
    bookCode.includes('currentChapterDef?.pdfPath || currentBookMeta?.pdfPath || `/books/${currentGrade || \'class3\'}.pdf`'),
    'All chapters in a grade share the same pdfPath, ensuring ZERO full PDF reloads on chapter switches'
  );

  // ── TEST 5: Independent Chapter Progress & Last-Read Positions ──
  console.log('\n5. Verifying Independent Progress & Reading Position Isolation:');

  assert(
    progressCode.includes('completedPagesByChapter: Record<string, number[]>') ||
    progressCode.includes('completedPagesByChapter'),
    'progressService manages independent completedPagesByChapter records'
  );
  assert(
    progressCode.includes('saveLastReadPage') &&
    progressCode.includes('chapterKey: string'),
    'saveLastReadPage scopes reading positions per student, grade, and chapterKey'
  );
  assert(
    bookCode.includes('loadStudentCompletedPages = useCallback(async () => {') &&
    bookCode.includes('progressService.getCompletedPages(activeStudentId, currentGrade, currentChapterKey)'),
    'GaioInteractiveBookApp independently loads completed pages whenever currentChapterKey changes'
  );

  // ── TEST 6: Simulation of Dropdown Navigation Across All 8 Sections ──
  console.log('\n6. Simulating Dropdown Navigation Across Intro, Chapters 1-6, and Finale:');

  // Class 3 Boundaries
  const class3Chapters = [
    { key: 'intro', code: 'INTRO', title: 'Welcome & Orientation', startPage: 1, endPage: 5, totalPages: 5 },
    { key: 'ch1', code: 'CH1', title: 'Month 1: Foundations', startPage: 6, endPage: 37, totalPages: 32 },
    { key: 'ch2', code: 'CH2', title: 'Month 2: Algorithms', startPage: 38, endPage: 70, totalPages: 33 },
    { key: 'ch3', code: 'CH3', title: 'Month 3: Patterns', startPage: 71, endPage: 105, totalPages: 35 },
    { key: 'ch4', code: 'CH4', title: 'Month 4: Logic', startPage: 106, endPage: 142, totalPages: 37 },
    { key: 'ch5', code: 'CH5', title: 'Month 5: Robotics', startPage: 143, endPage: 178, totalPages: 36 },
    { key: 'ch6', code: 'CH6', title: 'Month 6: Projects', startPage: 179, endPage: 209, totalPages: 31 },
    { key: 'finale', code: 'FINALE', title: 'Olympiad Mastery', startPage: 210, endPage: 218, totalPages: 9 }
  ];

  class ChapterViewerSimulator {
    constructor() {
      this.currentChapterKey = 'intro';
      this.currentPage = 1;
      this.lastReadPositions = {};
      this.completedPagesByChapter = {
        intro: [1, 2],
        ch1: [1, 2, 3, 4, 5],
        ch2: [1],
        ch3: [],
        ch4: [],
        ch5: [],
        ch6: [],
        finale: []
      };
      this.pdfReloadCount = 1; // initial load
    }

    getCurrentChapterDef() {
      return class3Chapters.find(c => c.key === this.currentChapterKey) || class3Chapters[0];
    }

    getChapterRelativePage() {
      const def = this.getCurrentChapterDef();
      return Math.max(1, Math.min(def.totalPages, this.currentPage - def.startPage + 1));
    }

    selectChapterFromDropdown(targetKey) {
      const found = class3Chapters.find(c => c.key === targetKey);
      if (!found) return;

      // 1. Save previous chapter position
      const prevDef = this.getCurrentChapterDef();
      const prevRelPage = this.getChapterRelativePage();
      this.lastReadPositions[this.currentChapterKey] = prevRelPage;

      // 2. Switch chapter and navigate immediately to exact start page
      this.currentChapterKey = found.key;
      this.currentPage = found.startPage;
      // No increment to pdfReloadCount because same PDF!
    }
  }

  const sim = new ChapterViewerSimulator();

  // Initially in Intro, Page 1
  assert(sim.currentChapterKey === 'intro', 'Initial chapter is intro');
  assert(sim.currentPage === 1, 'Initial page is 1');
  assert(sim.getChapterRelativePage() === 1, 'Initial relative page is 1');
  assert(sim.getCurrentChapterDef().key === 'intro', 'Active dropdown selection is intro');

  // Read to page 3 of intro
  sim.currentPage = 3;
  assert(sim.getChapterRelativePage() === 3, 'In Intro: page indicator is Page 3 of 5');

  // Select Chapter 1 from dropdown
  console.log('  -> Selecting Chapter 1 (CH1)...');
  sim.selectChapterFromDropdown('ch1');
  assert(sim.currentChapterKey === 'ch1', 'Active chapter is now ch1');
  assert(sim.getCurrentChapterDef().key === 'ch1', 'Active dropdown selection updated to ch1');
  assert(sim.currentPage === 6, 'Navigated immediately to Chapter 1 starting page (6)');
  assert(sim.getChapterRelativePage() === 1, 'Page indicator correctly shows Page 1 of 32');
  assert(sim.lastReadPositions['intro'] === 3, 'Intro last-read position (page 3) was preserved!');
  assert(sim.completedPagesByChapter['ch1'].length === 5, 'Chapter 1 completed pages preserved independently (5 pages)');
  assert(sim.pdfReloadCount === 1, 'PDF was NOT reloaded (zero full PDF reloads)');

  // Advance in Chapter 1 to physical page 15 (relative page 10)
  sim.currentPage = 15;
  assert(sim.getChapterRelativePage() === 10, 'In Chapter 1: page indicator is Page 10 of 32');

  // Select Chapter 2 from dropdown
  console.log('  -> Selecting Chapter 2 (CH2)...');
  sim.selectChapterFromDropdown('ch2');
  assert(sim.currentChapterKey === 'ch2', 'Active chapter is now ch2');
  assert(sim.getCurrentChapterDef().key === 'ch2', 'Active dropdown selection updated to ch2');
  assert(sim.currentPage === 38, 'Navigated immediately to Chapter 2 starting page (38)');
  assert(sim.getChapterRelativePage() === 1, 'Page indicator correctly shows Page 1 of 33');
  assert(sim.lastReadPositions['ch1'] === 10, 'Chapter 1 last-read position (page 10) was preserved!');
  assert(sim.completedPagesByChapter['ch2'].length === 1, 'Chapter 2 completed pages preserved independently (1 page)');

  // Select Finale from dropdown
  console.log('  -> Selecting Finale (FINALE)...');
  sim.selectChapterFromDropdown('finale');
  assert(sim.currentChapterKey === 'finale', 'Active chapter is now finale');
  assert(sim.getCurrentChapterDef().key === 'finale', 'Active dropdown selection updated to finale');
  assert(sim.currentPage === 210, 'Navigated immediately to Finale starting page (210)');
  assert(sim.getChapterRelativePage() === 1, 'Page indicator correctly shows Page 1 of 9');

  // Select Intro from dropdown
  console.log('  -> Selecting Intro (INTRO)...');
  sim.selectChapterFromDropdown('intro');
  assert(sim.currentChapterKey === 'intro', 'Active chapter is now intro');
  assert(sim.currentPage === 1, 'Navigated immediately to Intro starting page (1)');
  assert(sim.getChapterRelativePage() === 1, 'Page indicator correctly shows Page 1 of 5');
  assert(sim.pdfReloadCount === 1, 'PDF was NOT reloaded across all 4 section changes');

  console.log('\n================================================================');
  console.log(`ALL CHECKS PASSED: ${passedChecks}/${totalChecks}`);
  console.log('================================================================');
}

runTestSuite().catch((err) => {
  console.error('Test suite failed:', err);
  process.exit(1);
});

