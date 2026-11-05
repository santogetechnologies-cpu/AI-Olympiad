// ─────────────────────────────────────────────────────────────────────────────
// COMPREHENSIVE CLASS-WISE PDF MAPPING VERIFICATION SUITE
// Tests all 16 classes from Class 3 to PG 2nd Year
// ─────────────────────────────────────────────────────────────────────────────

import fs from 'fs';
import path from 'path';

// Mock localStorage and window for Node environment
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
  getClassChapters,
  getClassPdfInfo,
  parseGradeKeyFromClass,
  CLASS_PDF_MAP,
  progressService,
} = await import('../src/services/progressService.ts');

const ALL_CLASSES = [
  { key: 'class3', name: 'Class 3', code: 'CLS-03', expectedPages: 218 },
  { key: 'class4', name: 'Class 4', code: 'CLS-04', expectedPages: 218 },
  { key: 'class5', name: 'Class 5', code: 'CLS-05', expectedPages: 218 },
  { key: 'class6', name: 'Class 6', code: 'CLS-06', expectedPages: 230 },
  { key: 'class7', name: 'Class 7', code: 'CLS-07', expectedPages: 230 },
  { key: 'class8', name: 'Class 8', code: 'CLS-08', expectedPages: 230 },
  { key: 'class9', name: 'Class 9', code: 'CLS-09', expectedPages: 230 },
  { key: 'class10', name: 'Class 10', code: 'CLS-10', expectedPages: 230 },
  { key: 'class11', name: 'Class 11', code: 'CLS-11', expectedPages: 282 },
  { key: 'class12', name: 'Class 12', code: 'CLS-12', expectedPages: 282 },
  { key: 'ug1', name: 'UG 1st Year', code: 'UG-01', expectedPages: 270 },
  { key: 'ug2', name: 'UG 2nd Year', code: 'UG-02', expectedPages: 266 },
  { key: 'ug3', name: 'UG 3rd Year', code: 'UG-03', expectedPages: 266 },
  { key: 'ug4', name: 'UG 4th Year', code: 'UG-04', expectedPages: 266 },
  { key: 'pg1', name: 'PG 1st Year', code: 'PG-01', expectedPages: 266 },
  { key: 'pg2', name: 'PG 2nd Year', code: 'PG-02', expectedPages: 266 },
];

console.log('================================================================');
console.log('AI OLYMPIAD: CLASS-WISE PDF MAPPING VERIFICATION (CLASS 3 -> PG 2)');
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
}

for (const cls of ALL_CLASSES) {
  console.log(`Checking ${cls.name} [${cls.key}]...`);

  // 1. Check physical PDF file on disk
  const physicalPath = path.resolve(process.cwd(), 'public', 'books', `${cls.key}.pdf`);
  assert(fs.existsSync(physicalPath), `Physical PDF file exists: ${physicalPath}`);
  const stats = fs.statSync(physicalPath);
  assert(stats.size > 100000, `Physical PDF file is non-empty (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);

  // 2. Check getClassPdfInfo
  const pdfInfo = getClassPdfInfo(cls.key);
  assert(pdfInfo.pdfPath === `/books/${cls.key}.pdf`, `getClassPdfInfo(${cls.key}).pdfPath must be /books/${cls.key}.pdf, got ${pdfInfo.pdfPath}`);
  assert(pdfInfo.totalPages === cls.expectedPages, `getClassPdfInfo(${cls.key}).totalPages must be ${cls.expectedPages}, got ${pdfInfo.totalPages}`);

  // 3. Check parseGradeKeyFromClass normalization
  const parsedFromName = parseGradeKeyFromClass(cls.name);
  assert(parsedFromName === cls.key, `parseGradeKeyFromClass("${cls.name}") must be ${cls.key}, got ${parsedFromName}`);

  const parsedFromCode = parseGradeKeyFromClass(cls.code);
  assert(parsedFromCode === cls.key, `parseGradeKeyFromClass("${cls.code}") must be ${cls.key}, got ${parsedFromCode}`);

  const parsedFromSlug = parseGradeKeyFromClass(`cat-cls-${cls.key}`);
  assert(parsedFromSlug === cls.key, `parseGradeKeyFromClass("cat-cls-${cls.key}") must be ${cls.key}, got ${parsedFromSlug}`);

  const parsedFromObj = parseGradeKeyFromClass({ name: cls.name, code: cls.code });
  assert(parsedFromObj === cls.key, `parseGradeKeyFromClass object must be ${cls.key}, got ${parsedFromObj}`);

  // 4. Check getClassChapters (8 Learn sections: Intro, ch1..ch6, Finale)
  const chapters = getClassChapters(cls.key);
  assert(chapters.length === 8, `${cls.name} must have 8 sections, got ${chapters.length}`);

  let sumChapterPages = 0;
  for (let i = 0; i < chapters.length; i++) {
    const ch = chapters[i];
    sumChapterPages += ch.totalPages;
    assert(
      ch.pdfPath === `/books/${cls.key}.pdf`,
      `${cls.name} Section ${i} (${ch.key}) pdfPath must be /books/${cls.key}.pdf, got ${ch.pdfPath}`
    );
    assert(
      ch.totalPages === ch.endPage - ch.startPage + 1,
      `${cls.name} Section ${i} totalPages must equal endPage - startPage + 1, got ${ch.totalPages}`
    );
    assert(ch.title && ch.title.length > 0, `${cls.name} Section ${i} must have a non-empty title, got "${ch.title}"`);

    // Verify negative condition: NEVER contains class10.pdf unless the class is class10
    if (cls.key !== 'class10') {
      assert(
        ch.pdfPath !== '/books/class10.pdf',
        `${cls.name} Section ${i} MUST NEVER point to /books/class10.pdf`
      );
    }
  }
  assert(sumChapterPages === cls.expectedPages, `${cls.name} sum of section pages (${sumChapterPages}) must equal total book pages (${cls.expectedPages})`);

  // 5. Check progress recording isolation for this class
  const studentId = `test-verify-${cls.key}`;
  const ch1Prog = await progressService.recordPdfPageCompletion({
    studentId,
    gradeKey: cls.key,
    chapterKey: 'ch1',
    pageNumber: 1,
  });
  assert(ch1Prog.chapterProgress.completedPages === 1, `${cls.name} completed page count must be 1`);
  assert(ch1Prog.chapterProgress.totalPages === chapters[1].totalPages, `${cls.name} chapter totalPages in progress must be ${chapters[1].totalPages}`);
  assert(ch1Prog.overallProgress.totalPages === cls.expectedPages, `${cls.name} overall totalPages in progress must be ${cls.expectedPages}`);

  console.log(`  ✓ ${cls.name}: PDF /books/${cls.key}.pdf (${cls.expectedPages} pages), 8 sections verified.`);
}

console.log('\n================================================================');
console.log(`SUCCESS! All ${passedChecks} assertions passed across all 16 academic classes.`);
console.log('Each class strictly and exclusively maps to its dedicated PDF file.');
console.log('================================================================');

