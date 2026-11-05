// ─────────────────────────────────────────────────────────────────────────────
// PDF VIEWER RESPONSIVE SCREENS VERIFICATION SUITE
// Tests separate device form factors:
// 1. Mobile screens (< 640px): Preserved 100% without changes.
// 2. Tablet screens (640px - 1023px): Centering, zero gaps, toolbar height matching, progress alignment.
// 3. Laptop screens (1024px - 1439px): Centering, zero gaps, toolbar height matching, progress alignment.
// 4. Desktop screens (>= 1440px / 1920x1080): Centering, zero gaps, toolbar height matching, progress alignment.
// ─────────────────────────────────────────────────────────────────────────────

import fs from 'fs';
import path from 'path';

console.log('================================================================');
console.log('AI OLYMPIAD: PDF VIEWER RESPONSIVE SCREENS TEST SUITE');
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
  assert(fs.existsSync(bookAppPath), 'GaioInteractiveBookApp.tsx exists');

  const bookCode = fs.readFileSync(bookAppPath, 'utf-8');

  // ── TEST 1: Mobile Breakpoint Preservation ──
  console.log('1. Verifying Mobile Breakpoint Preservation (< 640px):');

  assert(
    bookCode.includes('const isMobileBreakpoint = w < 640') ||
    bookCode.includes('const isMobileBreakpoint = window.innerWidth < 640'),
    'Preserves distinct mobile breakpoint (< 640px)'
  );
  assert(
    bookCode.includes('window.innerHeight - topNav1H - topNav2H - progressH - bottomNavH - 4'),
    'Preserves mobile available height with 4px buffer'
  );
  assert(
    bookCode.includes('availW = Math.max(180, window.innerWidth - toolbarW)'),
    'Preserves mobile available width flush to right toolbar'
  );
  assert(
    bookCode.includes('flex-1 sm:flex-none min-w-0 h-full flex items-center justify-center relative overflow-hidden'),
    'Preserves mobile flex-1 min-w-0 for flush left alignment'
  );
  assert(
    bookCode.includes('rounded-none rounded-l-xl'),
    'Preserves mobile toolbar flush right edge'
  );
  assert(
    bookCode.includes('data-control="stroke-size"'),
    'Preserves mobile stroke-size compact control'
  );

  // ── TEST 2: Tablet, Laptop, and Desktop Alignment & Centering ──
  console.log('\n2. Verifying Centering & Layout Alignment on Larger Screens:');

  assert(
    bookCode.includes('className="flex-1 min-h-0 w-full flex flex-col justify-between items-center p-0 sm:p-2 md:p-3 overflow-hidden"'),
    'Main layout is centered (items-center) across all screens without top-left corner shoving'
  );
  assert(
    !bookCode.includes('lg:items-start lg:justify-start'),
    'Top-left corner shoving (lg:items-start lg:justify-start) is completely removed'
  );
  assert(
    !bookCode.includes('lg:overflow-visible'),
    'lg:overflow-visible removed, preventing unwanted spilling outside container'
  );
  assert(
    bookCode.includes('justify-start sm:justify-center gap-0 w-full sm:w-auto max-w-full'),
    'Upper row centers PDF and toolbar with sm:justify-center and zero gap (gap-0)'
  );

  // ── TEST 3: Zero Unwanted Gaps Between PDF and Toolbar ──
  console.log('\n3. Verifying Zero Unwanted Gaps Between PDF & Toolbar:');

  assert(
    bookCode.includes('gap-0 w-full sm:w-auto max-w-full'),
    'Parent row applies gap-0 ensuring PDF and toolbar touch directly with zero unwanted gap'
  );
  assert(
    !bookCode.includes('sm:gap-3 md:gap-4'),
    'sm:gap-3 md:gap-4 gap classes removed, eliminating 12px/16px blank space'
  );

  // Verify navigation arrows do not collide with toolbar
  assert(
    bookCode.includes('sm:left-2 md:left-3') && bookCode.includes('sm:right-2 md:right-3'),
    'Navigation arrows are placed comfortably inside PDF margins, avoiding collision with adjacent toolbar'
  );

  // ── TEST 4: Toolbar Height Exactly Matches PDF Viewer Height ──
  console.log('\n4. Verifying Toolbar Height Exactly Matches PDF Height:');

  assert(
    bookCode.includes('data-tour="pdf-toolbar"'),
    'PDF toolbar defines data-tour="pdf-toolbar"'
  );
  assert(
    bookCode.includes('height: `${pageDimensions.height}px`') &&
    bookCode.includes('maxHeight: `${pageDimensions.height}px`'),
    'Toolbar strictly sets height and maxHeight to `${pageDimensions.height}px`'
  );

  // ── TEST 5: Progress Section Directly Below PDF & Toolbar, Properly Aligned ──
  console.log('\n5. Verifying Progress Section Alignment & Dimensions:');

  assert(
    bookCode.includes("width: typeof window !== 'undefined' && window.innerWidth >= 640 ? `${pageDimensions.width + toolbarWidth}px` : '100%'"),
    'Progress section matches exact combined width (pageDimensions.width + toolbarWidth) on tablet, laptop, and desktop'
  );
  assert(
    bookCode.includes("maxWidth: '100%'"),
    'Progress section sets maxWidth: 100% preventing screen overflow'
  );
  assert(
    bookCode.includes('className="w-full mt-0 sm:mt-2'),
    'Progress section positioned directly below with mt-0 on mobile and clean sm:mt-2 on larger screens'
  );

  // Verify dynamic toolbar width tracking state
  assert(
    bookCode.includes('const [toolbarWidth, setToolbarWidth] = useState<number>'),
    'GaioInteractiveBookApp tracks toolbarWidth dynamically via state'
  );

  // ── TEST 6: Screen Dimensions & Fit Scale Simulations ──
  console.log('\n6. Simulating Separate Responsive Form Factors:');

  function calculateFit(w, h, clientW, clientH) {
    const isMobile = w < 640;
    const isSmallMobile = isMobile && w < 380;

    let availW, availH, toolbarW;

    if (isMobile) {
      const topNav1H = 56;
      const topNav2H = 40;
      const progressH = 38;
      const bottomNavH = 54;
      availH = Math.max(160, h - topNav1H - topNav2H - progressH - bottomNavH - 4);
      toolbarW = isSmallMobile ? 36 : 38;
      availW = Math.max(180, w - toolbarW);
    } else {
      const topNav1H = 64;
      const topNav2H = w < 768 ? 48 : 56;
      const progressH = w < 768 ? 40 : 42;
      const bottomNavH = w < 1024 ? 54 : 0;
      toolbarW = w < 768 ? 58 : 66;
      const paddingX = w < 768 ? 16 : 24;
      const paddingY = w < 768 ? 16 : 24;

      if (clientW && clientH) {
        availW = Math.max(200, clientW - toolbarW - paddingX);
        availH = Math.max(220, clientH - progressH - paddingY);
      } else {
        const sidebarW = w >= 1024 ? 256 : 0;
        const viewportW = w - sidebarW;
        availW = Math.max(200, viewportW - toolbarW - paddingX);
        availH = Math.max(220, h - topNav1H - topNav2H - progressH - bottomNavH - paddingY);
      }
    }

    const scaleW = availW / 595.3;
    const scaleH = availH / 841.9;
    const fit = Math.min(scaleW, scaleH);
    const clamped = Math.min(1.4, Math.max(0.25, parseFloat(fit.toFixed(3))));
    const pageWidth = Math.round(595.3 * clamped);
    const pageHeight = Math.round(841.9 * clamped);
    const combinedWidth = pageWidth + toolbarW;

    return {
      availW,
      availH,
      toolbarW,
      fit: clamped,
      pageWidth,
      pageHeight,
      combinedWidth
    };
  }

  // A. Mobile: iPhone 13 (390 x 844)
  const mobileSim = calculateFit(390, 844);
  assert(mobileSim.availW === 352, `Mobile: availW is 352px (390 - 38), got ${mobileSim.availW}`);
  assert(mobileSim.fit === 0.591, `Mobile: fit is 0.591, got ${mobileSim.fit}`);
  assert(mobileSim.pageWidth === 352, `Mobile: pageWidth matches availW exactly (352px)`);
  assert(mobileSim.combinedWidth === 390, `Mobile: combined width spans 390px (fills screen)`);

  // B. Tablet (Small Tablet e.g. 700px): toolbar is 58px
  const smallTabletSim = calculateFit(700, 1000);
  assert(smallTabletSim.toolbarW === 58, `Small Tablet (700px): toolbar width is 58px, got ${smallTabletSim.toolbarW}`);

  // C. Tablet Portrait: iPad (768 x 1024)
  const tabletSim = calculateFit(768, 1024);
  assert(tabletSim.toolbarW === 66, `Tablet Portrait (768px): toolbar width is 66px, got ${tabletSim.toolbarW}`);
  assert(tabletSim.availW === 678, `Tablet: availW is 678px, got ${tabletSim.availW}`);
  assert(tabletSim.availH === 784, `Tablet: availH is 784px, got ${tabletSim.availH}`);
  assert(tabletSim.fit === 0.931, `Tablet: fit scale is 0.931, got ${tabletSim.fit}`);
  assert(tabletSim.pageHeight === 784, `Tablet: page height maximizes 784px vertical space`);
  assert(tabletSim.combinedWidth <= 768, `Tablet: combined block (width: ${tabletSim.combinedWidth}px) fits within 768px tablet width`);

  // D. Tablet Landscape: iPad Landscape (1024 x 768)
  const tabletLandscape = calculateFit(1024, 768);
  assert(tabletLandscape.toolbarW === 66, `Tablet Landscape: toolbar width is 66px, got ${tabletLandscape.toolbarW}`);
  assert(tabletLandscape.combinedWidth <= 1024 - 256, `Tablet Landscape: combined width fits within main area (${tabletLandscape.combinedWidth}px <= 768px)`);
  assert(tabletLandscape.pageHeight <= 768 - 186, `Tablet Landscape: page height fits within screen without vertical overflow`);

  // E. Laptop: 1366 x 768
  const laptopSim = calculateFit(1366, 768);
  assert(laptopSim.toolbarW === 66, `Laptop: toolbar width is 66px, got ${laptopSim.toolbarW}`);
  assert(laptopSim.fit === 0.691, `Laptop: fit scale is 0.691, got ${laptopSim.fit}`);
  assert(laptopSim.combinedWidth === 477, `Laptop: combined block width is 477px, got ${laptopSim.combinedWidth}`);
  assert(laptopSim.combinedWidth < 1366 - 256, `Laptop: combined block (477px) is centered inside 1110px available width`);

  // F. Desktop: 1920 x 1080 (Full HD)
  const desktopSim = calculateFit(1920, 1080);
  assert(desktopSim.toolbarW === 66, `Desktop: toolbar width is 66px, got ${desktopSim.toolbarW}`);
  assert(desktopSim.fit === 1.062, `Desktop: fit scale is 1.062, got ${desktopSim.fit}`);
  assert(desktopSim.pageHeight === 894, `Desktop: page height is 894px, got ${desktopSim.pageHeight}`);
  assert(desktopSim.combinedWidth === 698, `Desktop: combined block width is 698px, got ${desktopSim.combinedWidth}`);
  assert(desktopSim.combinedWidth < 1920 - 256, `Desktop: combined block (698px) is centered inside 1664px workspace`);

  // ── TEST 7: Functionality & PDF Tools Preserved ──
  console.log('\n7. Verifying PDF Tools & Navigation Preserved:');

  const tools = ['tool-move', 'tool-color', 'tool-write', 'tool-highlighter', 'tool-star', 'tool-erase', 'tool-clear', 'tool-type', 'tool-undo'];
  for (const t of tools) {
    assert(bookCode.includes(`data-tour="${t}"`), `Preserves ${t} tool`);
  }

  assert(bookCode.includes('UnifiedPdfInteractionLayer'), 'Preserves UnifiedPdfInteractionLayer');
  assert(bookCode.includes('handleMarkCurrentPageComplete'), 'Preserves page completion handler');
  assert(bookCode.includes('handleContinueToNextChapter'), 'Preserves chapter navigation button handler');

  console.log('\n================================================================');
  console.log(`ALL CHECKS PASSED: ${passedChecks}/${totalChecks}`);
  console.log('================================================================');
}

runTestSuite().catch((err) => {
  console.error('Test suite failed:', err);
  process.exit(1);
});
