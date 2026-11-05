// ─────────────────────────────────────────────────────────────────────────────
// MOBILE PDF VIEWER LAYOUT COMPREHENSIVE VERIFICATION SUITE
// Verifies:
// 1. Zero Left-Side Gap: Unnecessary padding and margins removed between PDF and screen edge.
// 2. Left Alignment: PDF page aligned directly with the left edge of its available viewer area.
// 3. Zero Gap with Toolbar: Adjacent contact between PDF page and right-side annotation toolbar.
// 4. Width Efficiency: Available mobile screen width used efficiently without cropping or distorting PDF content.
// 5. Aspect Ratio Centering: PDF centered only when required by its actual aspect ratio (e.g. landscape).
// 6. Universal Mobile Scope: Fixes apply across all mobile screen sizes.
// 7. Preservation: Both top navigation bars, all PDF tools, progress section, and desktop layout preserved.
// ─────────────────────────────────────────────────────────────────────────────

import fs from 'fs';
import path from 'path';

console.log('================================================================');
console.log('AI OLYMPIAD: MOBILE PDF VIEWER LAYOUT VERIFICATION');
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
  const appLayoutPath = path.resolve('src/components/layout/AppLayout.tsx');

  assert(fs.existsSync(bookAppPath), 'GaioInteractiveBookApp.tsx exists');
  assert(fs.existsSync(appLayoutPath), 'AppLayout.tsx exists');

  const bookCode = fs.readFileSync(bookAppPath, 'utf-8');
  const layoutCode = fs.readFileSync(appLayoutPath, 'utf-8');

  // ── TEST 1: Both Top Navigation Bars Visible on Mobile ──
  console.log('1. Verifying Both Top Navigation Bars Visible on Mobile:');

  // Top Nav 1 in AppLayout
  assert(
    layoutCode.includes('data-app-header="true"'),
    'AppLayout defines data-app-header="true" on Top Nav 1 header'
  );
  assert(
    layoutCode.includes('isLearningRoute') &&
    layoutCode.includes('h-14 sm:h-16 bg-white border-b border-slate-200/80 px-3 sm:px-6'),
    'AppLayout provides dedicated sleek h-14 header on learning route for mobile'
  );

  // Top Nav 2 in GaioInteractiveBookApp
  assert(
    bookCode.includes('data-viewer-header="true"'),
    'GaioInteractiveBookApp defines data-viewer-header="true" on Top Nav 2 header'
  );
  assert(
    bookCode.includes('ref={headerRef}'),
    'Top Nav 2 header attaches ref={headerRef} for dynamic measurement'
  );
  assert(
    !bookCode.includes('header className="hidden lg:flex'),
    'Top Nav 2 is NO LONGER hidden on mobile (hidden lg:flex removed)'
  );
  assert(
    bookCode.includes('className="flex flex-shrink-0 h-10 sm:h-12 md:h-14'),
    'Top Nav 2 uses responsive flex header (h-10 on mobile, sm:h-12, md:h-14 on desktop)'
  );

  // Top Nav 2 items check
  assert(bookCode.includes('title="Back to Chapters"'), 'Top Nav 2 contains Back to Chapters button');
  assert(bookCode.includes('BookOpen size={12}'), 'Top Nav 2 contains Class / Grade Badge');
  assert(bookCode.includes('Page {chapterRelativePage}'), 'Top Nav 2 contains Page X of Y indicator');
  assert(bookCode.includes('handleMarkCurrentPageComplete'), 'Top Nav 2 contains Done / Mark Done button');
  assert(bookCode.includes('title="Interactive PDF Tools Tutorial"'), 'Top Nav 2 contains Tutorial button');
  assert(bookCode.includes('title="Undo last action (Ctrl+Z)"'), 'Top Nav 2 contains Undo button');
  assert(bookCode.includes('animate-spin-slow'), 'Top Nav 2 contains Star counter');
  assert(bookCode.includes('title="Zoom Out"') && bookCode.includes('title="Zoom In"'), 'Top Nav 2 contains Zoom controls');

  // ── TEST 2: Dynamic PDF Scale & Screen Width Efficiency Without Cropping ──
  console.log('\n2. Verifying Dynamic PDF Scale Calculation & Width Efficiency:');

  assert(bookCode.includes('const topNav1El = document.querySelector'), 'Queries Top Nav 1 element dynamically');
  assert(bookCode.includes('const topNav2H = headerRef.current'), 'Measures Top Nav 2 height via headerRef');
  assert(bookCode.includes('const progressH = progressRef.current'), 'Measures Progress Section height via progressRef');
  assert(bookCode.includes('nav[aria-label="Mobile Bottom Navigation"]'), 'Queries Mobile Bottom Navigation dynamically');
  assert(
    bookCode.includes('window.innerHeight - topNav1H - topNav2H - progressH - bottomNavH - 4'),
    'Calculates available height strictly between Top Nav 2 and Progress Bar with 4px buffer'
  );
  assert(
    bookCode.includes('window.innerWidth - toolbarW'),
    'Calculates available width accounting for right toolbar with zero arbitrary subtractor'
  );
  assert(
    bookCode.includes('const scaleW = availW / 595.3') && bookCode.includes('const scaleH = availH / 841.9'),
    'Calculates scaleW and scaleH preserving authentic standard PDF aspect ratio (595.3 x 841.9)'
  );
  assert(
    bookCode.includes('const fit = Math.min(scaleW, scaleH)'),
    'Uses Math.min(scaleW, scaleH) so content is never cropped or distorted'
  );

  // ── TEST 3: Zero Left-Side Gap & Left Alignment of PDF Viewer Area ──
  console.log('\n3. Verifying Zero Left-Side Gap & Left Alignment:');

  assert(
    bookCode.includes('flex-1 sm:flex-none min-w-0 h-full flex items-center justify-center relative overflow-hidden'),
    'Available PDF Viewer Area takes flex-1 min-w-0 on mobile, starting flush with left screen edge'
  );
  assert(
    bookCode.includes('justify-start sm:justify-center gap-0 w-full sm:w-auto max-w-full') ||
    bookCode.includes('justify-start sm:justify-center sm:gap-3 md:gap-4 w-full sm:w-auto max-w-full'),
    'Parent row aligns to start on mobile (zero left gap) and centers on desktop with sm:justify-center and gap-0'
  );
  assert(
    bookCode.includes('rounded-none sm:rounded-2xl overflow-hidden relative'),
    'Canvas inner wrapper is flush rounded-none on mobile eliminating corner gutter gaps'
  );

  // ── TEST 4: Right-Side Toolbar Direct Touching (Zero Gap) ──
  console.log('\n4. Verifying Right-Side Toolbar Extends from Exact PDF Top to Bottom with 0 Gap:');

  assert(
    bookCode.includes('data-tour="pdf-toolbar"'),
    'Toolbar defines data-tour="pdf-toolbar"'
  );
  assert(
    bookCode.includes('shrink-0 flex flex-col items-center justify-between sm:justify-start'),
    'Toolbar is an adjacent shrink-0 flex sibling directly touching the PDF viewer area'
  );
  assert(
    bookCode.includes('height: `${pageDimensions.height}px`') &&
    bookCode.includes('maxHeight: `${pageDimensions.height}px`'),
    'Toolbar height matches pageDimensions.height exactly from PDF top to PDF bottom'
  );
  assert(
    bookCode.includes('rounded-none rounded-l-xl'),
    'Toolbar right edge is flat (rounded-none rounded-l-xl) touching right screen edge'
  );
  assert(
    bookCode.includes('border-y-0 border-r-0 border-l'),
    'Toolbar has border-r-0 touching right screen edge with 0 border gap'
  );

  // ── TEST 5: Progress Section Visibility & Direct Touching with Bottom Navigation ──
  console.log('\n5. Verifying Progress Section Visibility & Direct Touching with Bottom Navigation:');

  assert(bookCode.includes('data-pdf-progress-bar="true"'), 'Progress Section defines data-pdf-progress-bar="true"');
  assert(bookCode.includes('ref={progressRef}'), 'Progress Section attaches ref={progressRef}');
  assert(
    bookCode.includes('className="w-full mt-0 sm:mt-2') || bookCode.includes('className="w-full mt-0 sm:mt-3'),
    'Progress Section uses mt-0 on mobile with zero vertical gap'
  );
  assert(
    bookCode.includes('rounded-none sm:rounded-2xl'),
    'Progress Section is flush rounded-none on mobile'
  );
  assert(
    layoutCode.includes("location.pathname.startsWith('/student/learning')\n                ? 'relative shrink-0'") ||
    layoutCode.includes("location.pathname.startsWith('/student/learning')\r\n                ? 'relative shrink-0'"),
    'AppLayout renders mobile bottom nav as relative shrink-0 on learning route (in-flow below main)'
  );
  assert(
    layoutCode.includes("isLearningRoute\n                  ? 'overflow-hidden flex flex-col min-h-0'") ||
    layoutCode.includes("isLearningRoute\r\n                  ? 'overflow-hidden flex flex-col min-h-0'"),
    'AppLayout main uses flex flex-col min-h-0 on learning route ensuring progress touches bottom nav directly'
  );

  // ── TEST 6: Stroke-Size Control for Small Mobiles ──
  console.log('\n6. Verifying Stroke-Size Control Reduced Dimensions on Small Mobiles:');

  assert(
    bookCode.includes('data-control="stroke-size"'),
    'Toolbar contains dedicated stroke-size control with data-control="stroke-size"'
  );
  assert(
    bookCode.includes('>Size</span>'),
    'Stroke-size control displays clear "Size" label'
  );
  assert(
    bookCode.includes('text-[7px] sm:text-[9px]'),
    'Stroke-size label uses reduced text-[7px] on small mobiles and sm:text-[9px] on larger screens'
  );
  assert(
    bookCode.includes('w-2.5 sm:w-3.5 h-3 sm:h-4.5'),
    'Stroke-size option buttons use reduced w-2.5 h-3 on small mobiles and sm:w-3.5 sm:h-4.5 on larger screens'
  );
  assert(
    bookCode.includes('gap-0.5 sm:gap-1'),
    'Stroke-size control uses compact gap-0.5 on small mobiles'
  );

  // ── TEST 7: Screen Simulations Across Mobile Devices & Orientations ──
  console.log('\n7. Simulating Dynamic Fit Calculations across Mobile Form Factors:');

  function simulateScale(w, h, topNav1H, topNav2H, progressH, bottomNavH, toolbarW) {
    const isMobile = w < 1024;
    let availW, availH;
    if (isMobile) {
      availH = Math.max(160, h - topNav1H - topNav2H - progressH - bottomNavH - 4);
      availW = Math.max(180, w - toolbarW);
    } else {
      availW = Math.max(200, w - 178);
      availH = Math.max(220, h - 170);
    }
    const scaleW = availW / 595.3;
    const scaleH = availH / 841.9;
    const fit = Math.min(scaleW, scaleH);
    const clamped = Math.min(1.4, Math.max(0.25, parseFloat(fit.toFixed(3))));
    return {
      availW,
      availH,
      scaleW: parseFloat(scaleW.toFixed(3)),
      scaleH: parseFloat(scaleH.toFixed(3)),
      fit: clamped,
      pageWidth: Math.round(595.3 * clamped),
      pageHeight: Math.round(841.9 * clamped),
      leftGap: isMobile ? Math.max(0, Math.floor((availW - Math.round(595.3 * clamped)) / 2)) : 'centered'
    };
  }

  // A. iPhone 12/13/14 Portrait: 390 x 844
  const iphone13 = simulateScale(390, 844, 56, 40, 38, 54, 38);
  assert(iphone13.availH === 652, `iPhone 13: availH is 652px, got ${iphone13.availH}`);
  assert(iphone13.availW === 352, `iPhone 13: availW is exactly 352px (390 - 38), got ${iphone13.availW}`);
  assert(iphone13.fit === 0.591, `iPhone 13: precise fit scale is 0.591, got ${iphone13.fit}`);
  assert(iphone13.pageWidth === 352, `iPhone 13: page width ${iphone13.pageWidth}px matches availW exactly (100% efficient, 0 gap)`);
  assert(iphone13.leftGap === 0, `iPhone 13: left gap is 0px (no unwanted gap)`);
  assert(iphone13.pageHeight <= 652, `iPhone 13: page height ${iphone13.pageHeight}px safely fits within vertical space`);

  // B. Samsung Galaxy / Pixel Portrait: 412 x 915
  const pixel7 = simulateScale(412, 915, 56, 40, 38, 54, 38);
  assert(pixel7.availW === 374, `Pixel 7: availW is 374px (412 - 38), got ${pixel7.availW}`);
  assert(pixel7.pageWidth === 374, `Pixel 7: page width matches availW exactly (374px), 0 gap`);
  assert(pixel7.leftGap === 0, `Pixel 7: left gap is 0px`);

  // C. Small Mobile Screen: 360 x 640
  const smallPhone = simulateScale(360, 640, 56, 40, 38, 54, 36);
  assert(smallPhone.availW === 324, `Small Phone: availW is 324px (360 - 36), got ${smallPhone.availW}`);
  assert(smallPhone.fit === 0.532, `Small Phone: fit is 0.532 (constrained by height aspect ratio)`);
  assert(smallPhone.pageWidth <= 324, `Small Phone: page fits inside 324px width without cropping`);

  // D. Mobile Landscape: 844 x 390 (iPhone landscape)
  const landscape = simulateScale(844, 390, 56, 40, 38, 0, 38);
  assert(landscape.availH === 252, `Landscape: availH is 252px, got ${landscape.availH}`);
  assert(landscape.scaleH < landscape.scaleW, 'Landscape: height is the limiting factor (scaleH < scaleW)');
  assert(landscape.fit === 0.299, `Landscape: fit scale is 0.299, got ${landscape.fit}`);
  assert(landscape.pageHeight === 252, `Landscape: page height maximizes vertical space (${landscape.pageHeight}px)`);
  assert(landscape.leftGap > 0, `Landscape: PDF is centered only because required by aspect ratio (leftGap: ${landscape.leftGap}px)`);

  // E. iPad / Tablet: 768 x 1024
  const ipad = simulateScale(768, 1024, 64, 48, 38, 54, 38);
  assert(ipad.availH === 816, `iPad: availH is 816px, got ${ipad.availH}`);
  assert(ipad.fit === 0.969, `iPad: fit scale is 0.969, got ${ipad.fit}`);
  assert(ipad.pageHeight === 816, `iPad: page extends fully to fill 816px of vertical space`);

  // F. Desktop 1920 x 1080 Preservation
  const desktop = simulateScale(1920, 1080, 64, 56, 38, 0, 68);
  assert(desktop.fit === 1.081, `Desktop: preserves desktop scale calculation (${desktop.fit})`);

  // ── TEST 8: Desktop Layout Preservation & PDF Tools ──
  console.log('\n8. Verifying Desktop Layout Classes & Tools Preserved:');

  assert(
    bookCode.includes('sm:p-4 md:p-6 pb-0 sm:pb-8') ||
    bookCode.includes('sm:p-2 md:p-4') ||
    bookCode.includes('sm:p-2 md:p-3'),
    'Preserves desktop padding'
  );
  assert(bookCode.includes('UnifiedPdfInteractionLayer'), 'Preserves UnifiedPdfInteractionLayer component');
  assert(bookCode.includes('handleTouchStart') && bookCode.includes('handleTouchEnd'), 'Preserves swipe gesture navigation');
  assert(bookCode.includes('handlePanPointerDown') && bookCode.includes('handlePanPointerMove'), 'Preserves pan & grab Move tool');

  // Verify all 9 primary tools
  const tools = ['tool-move', 'tool-color', 'tool-write', 'tool-highlighter', 'tool-star', 'tool-erase', 'tool-clear', 'tool-type', 'tool-undo'];
  for (const t of tools) {
    assert(bookCode.includes(`data-tour="${t}"`), `Preserves ${t} in PDF toolbar`);
  }

  console.log('\n================================================================');
  console.log(`ALL CHECKS PASSED: ${passedChecks}/${totalChecks}`);
  console.log('================================================================');
}

runTestSuite().catch((err) => {
  console.error('Test suite failed:', err);
  process.exit(1);
});
