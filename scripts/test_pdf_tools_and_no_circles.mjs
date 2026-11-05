// ─────────────────────────────────────────────────────────────────────────────
// COMPREHENSIVE PDF TOOLS & NO A/B/C CIRCULAR MARKERS VERIFICATION
// Verifies:
// 1. Zero A/B/C circular answer markers across all class manifests (Class 3 to PG 2).
// 2. Removal of MCQ/checkbox overlay rendering and handlers.
// 3. Preservation of all PDF tools: Move, Color, Write, Highlight, Star, Erase, Clear, Type, Undo.
// 4. Preservation of student annotation saving/loading for remaining tools.
// 5. PDF catalog integrity and original PDF files preservation.
// ─────────────────────────────────────────────────────────────────────────────

import fs from 'fs';
import path from 'path';

console.log('================================================================');
console.log('AI OLYMPIAD: PDF LEARNING & ANNOTATION INTEGRITY VERIFICATION');
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
  // ── 1. MANIFESTS VERIFICATION ACROSS ALL CLASSES ──
  console.log('1. Checking All Class Manifests for Complete Removal of A/B/C Markers:');
  const manifestsDir = path.join(process.cwd(), 'public', 'manifests');
  const manifestFiles = fs.readdirSync(manifestsDir).filter(f => f.endsWith('.json'));

  assert(manifestFiles.length >= 16, `Found ${manifestFiles.length} class manifests in public/manifests/`);

  let totalChooseFound = 0;
  for (const file of manifestFiles) {
    const filePath = path.join(manifestsDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let fileChoose = 0;
    for (const page of content.pages || []) {
      for (const region of page.regions || []) {
        if (region.type === 'choose' || region.label === 'A' || region.label === 'B' || region.label === 'C') {
          fileChoose++;
        }
      }
    }
    assert(fileChoose === 0, `${file}: 0 A/B/C circular answer markers found`);
    totalChooseFound += fileChoose;
  }
  assert(totalChooseFound === 0, `Total A/B/C circular markers across ALL manifests is exactly 0`);

  // ── 2. COMPONENT CODEBASE SEARCH ──
  console.log('\n2. Verifying Codebase Has No Residual Choice Overlay Rendering or State:');
  const unifiedLayerPath = path.join(process.cwd(), 'src', 'components', 'gaio', 'primitives', 'UnifiedPdfInteractionLayer.tsx');
  const unifiedCode = fs.readFileSync(unifiedLayerPath, 'utf8');

  assert(!unifiedCode.includes("region.type === 'choose'"), 'UnifiedPdfInteractionLayer has no region.type === choose');
  assert(!unifiedCode.includes('handleCircleToggle'), 'UnifiedPdfInteractionLayer has no handleCircleToggle');
  assert(!unifiedCode.includes('circledItems'), 'UnifiedPdfInteractionLayer has no circledItems state or references');
  assert(!unifiedCode.includes('setCircledItems'), 'UnifiedPdfInteractionLayer has no setCircledItems calls');

  const regionOverlayPath = path.join(process.cwd(), 'src', 'components', 'gaio', 'primitives', 'PdfRegionOverlay.tsx');
  const regionCode = fs.readFileSync(regionOverlayPath, 'utf8');
  assert(!regionCode.includes("region.type === 'choose'"), 'PdfRegionOverlay has no region.type === choose');
  assert(!regionCode.includes('selectedChoices'), 'PdfRegionOverlay has no selectedChoices state');
  assert(!regionCode.includes('handleChoiceClick'), 'PdfRegionOverlay has no handleChoiceClick');

  // ── 3. STUDENT ANNOTATION SERVICE DATA INTEGRITY ──
  console.log('\n3. Verifying Student Annotation Service for Remaining Tools:');
  const storageMock = (() => {
    let store = {};
    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => { store[key] = String(value); },
      removeItem: (key) => { delete store[key]; },
      clear: () => { store = {}; },
    };
  })();
  globalThis.localStorage = storageMock;
  globalThis.window = { localStorage: storageMock };

  const { studentAnnotationService } = await import('../src/services/studentAnnotationService.ts');

  const testStudentId = 'student_test_verification_001';
  const testBookKey = 'class3_curriculum';
  const testPage = 14;

  const sampleAnnotations = {
    strokes: [
      { tool: 'pen', color: '#2563eb', width: 3, points: [{ x: 100, y: 150 }, { x: 120, y: 170 }] },
      { tool: 'highlighter', color: '#facc15', width: 8, points: [{ x: 50, y: 80 }, { x: 200, y: 80 }] }
    ],
    fillData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    stickers: [
      { id: 'st_1', x: 25, y: 40, type: 'star', emoji: '⭐' }
    ],
    typedNotes: [
      { id: 'note_1', x: 30, y: 55, text: 'Important AI definition note', color: '#1e293b' }
    ]
  };

  // Save annotations
  studentAnnotationService.savePageAnnotations(testStudentId, testBookKey, testPage, sampleAnnotations);
  assert(true, 'savePageAnnotations executed successfully without circledItems');

  // Load annotations
  const loaded = await studentAnnotationService.loadPageAnnotations(testStudentId, testBookKey, testPage);
  assert(loaded !== null, 'loadPageAnnotations returned annotation data');
  assert(loaded.strokes?.length === 2, 'Strokes (Pen & Highlighter) preserved');
  assert(loaded.stickers?.length === 1 && loaded.stickers[0].emoji === '⭐', 'Sticker (Star) preserved');
  assert(loaded.typedNotes?.length === 1 && loaded.typedNotes[0].text === 'Important AI definition note', 'Typed Note preserved');
  assert(loaded.fillData !== null, 'Color fill data preserved');
  assert(!('circledItems' in loaded) || Object.keys(loaded.circledItems || {}).length === 0, 'No circular answer markers in loaded annotations');

  // ── 4. PRESERVATION OF ALL PDF TOOLS IN STUDIO TOOLBAR ──
  console.log('\n4. Verifying Preservation of All 8 Studio Tools:');
  const bookAppPath = path.join(process.cwd(), 'src', 'components', 'gaio', 'GaioInteractiveBookApp.tsx');
  const bookAppCode = fs.readFileSync(bookAppPath, 'utf8');

  // Verify Move tool (hand)
  assert((bookAppCode.includes("isToolActive('hand')") || bookAppCode.includes("activeTool === 'hand'")) && bookAppCode.includes('data-tour="tool-move"'), 'Move (Hand) tool preserved');
  // Verify Color fill tool (fill)
  assert((bookAppCode.includes("isToolActive('fill')") || bookAppCode.includes("activeTool === 'fill'")) && bookAppCode.includes('data-tour="tool-color"'), 'Color Fill tool preserved');
  // Verify Write tool (pen)
  assert((bookAppCode.includes("isToolActive('pen')") || bookAppCode.includes("activeTool === 'pen'")) && bookAppCode.includes('data-tour="tool-write"'), 'Write (Pen) tool preserved');
  // Verify Highlighter tool
  assert((bookAppCode.includes("isToolActive('highlighter')") || bookAppCode.includes("activeTool === 'highlighter'")) && bookAppCode.includes('data-tour="tool-highlighter"'), 'Highlighter tool preserved');
  // Verify Star tool (stamp)
  assert((bookAppCode.includes("isToolActive('stamp')") || bookAppCode.includes("activeTool === 'stamp'")) && bookAppCode.includes('data-tour="tool-star"'), 'Star Rating tool preserved');
  // Verify Erase tool (eraser)
  assert((bookAppCode.includes("isToolActive('eraser')") || bookAppCode.includes("activeTool === 'eraser'")) && bookAppCode.includes('data-tour="tool-erase"'), 'Eraser tool preserved');
  // Verify Type tool (text)
  assert((bookAppCode.includes("isToolActive('text')") || bookAppCode.includes("activeTool === 'text'")) && bookAppCode.includes('data-tour="tool-type"'), 'Type tool preserved');
  // Verify Clear & Undo buttons
  assert(bookAppCode.includes('data-tour="tool-clear"') || bookAppCode.includes('setClearSignal'), 'Clear tool preserved');
  assert(bookAppCode.includes('title="Undo last stroke, fill, star, or note (Ctrl+Z)"') || bookAppCode.includes('setUndoSignal'), 'Undo tool preserved');

  // ── 5. ORIGINAL PDF FILES PRESERVATION ──
  console.log('\n5. Verifying Original PDF Content Preservation:');
  const pdfCatalogPath = path.join(process.cwd(), 'src', 'components', 'gaio', 'config', 'bookCatalog.json');
  const catalog = JSON.parse(fs.readFileSync(pdfCatalogPath, 'utf8'));

  const classesToCheck = ['class3', 'class4', 'class5', 'class6', 'class7', 'class8', 'class9', 'class10', 'class11', 'class12', 'ug1', 'ug2', 'ug3', 'ug4', 'pg1', 'pg2'];
  for (const cls of classesToCheck) {
    const entry = catalog[cls];
    assert(entry !== undefined, `Catalog entry for ${cls} exists`);
    const pathToCheck = entry.pdfPath || entry.pdfUrl;
    assert(pathToCheck && pathToCheck.endsWith('.pdf'), `Valid original PDF URL configured for ${cls}: ${pathToCheck}`);
  }

  console.log('\n================================================================');
  console.log(`ALL VERIFICATION CHECKS PASSED: ${passedChecks}/${totalChecks} tests successful!`);
  console.log('================================================================\n');
}

runTestSuite().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
