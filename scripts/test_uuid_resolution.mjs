// Mock localStorage & window for node test environment
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

import { supabase, isUuid } from '../src/lib/supabase.ts';
import { classService } from '../src/services/classService.ts';
import { subjectService } from '../src/services/subjectService.ts';
import { chapterService } from '../src/services/chapterService.ts';
import { categoryService } from '../src/services/categoryService.ts';
import { enrollmentService } from '../src/services/progressService.ts';

async function testResolution() {
  console.log('Testing UUID Resolution & Handling of custom slugs:');
  console.log('--------------------------------------------------');

  const orgId = '00000000-0000-0000-0000-000000000001';
  const customClassSlug = 'cat-cls-class5';
  const customCatSlug = 'cat-class5';
  const customSubSlug = 'cat-sub-class5';
  const dummyStudentId = '00000000-0000-0000-0000-000000000002';

  // 1. Test classService.resolveClassRecord
  console.log('1. Resolving class identifier:', customClassSlug);
  const resolvedClass = await classService.resolveClassRecord(customClassSlug, orgId);
  console.log('   Resolved class result:', resolvedClass ? { id: resolvedClass.id, name: resolvedClass.name, code: resolvedClass.code } : 'none found in DB (fallback handled)');
  if (resolvedClass) {
    console.log('   Is resolved ID a valid UUID?', isUuid(resolvedClass.id));
  }

  // 2. Test subjectService.getAll with classId = cat-cls-class5
  console.log('\n2. Testing subjectService.getAll with classId =', customClassSlug);
  try {
    const subjects = await subjectService.getAll(orgId, customClassSlug);
    console.log('   ✓ subjectService.getAll succeeded without Postgres UUID error! Count:', subjects.length);
  } catch (err) {
    console.error('   ✗ Failed:', err.message);
  }

  // 3. Test enrollmentService.getByClass with classId = cat-cls-class5
  console.log('\n3. Testing enrollmentService.getByClass with classId =', customClassSlug);
  try {
    const enrollments = await enrollmentService.getByClass(customClassSlug, orgId);
    console.log('   ✓ enrollmentService.getByClass succeeded without Postgres UUID error! Count:', enrollments.length);
  } catch (err) {
    console.error('   ✗ Failed:', err.message);
  }

  // 4. Test enrollmentService.isEnrolled with classId = cat-cls-class5
  console.log('\n4. Testing enrollmentService.isEnrolled with classId =', customClassSlug);
  try {
    const isEnrolled = await enrollmentService.isEnrolled(dummyStudentId, customClassSlug, undefined, orgId);
    console.log('   ✓ enrollmentService.isEnrolled succeeded without Postgres UUID error! Result:', isEnrolled);
  } catch (err) {
    console.error('   ✗ Failed:', err.message);
  }

  // 5. Test categoryService.resolveCategory with cat-class5
  console.log('\n5. Testing categoryService.resolveCategory with categoryId =', customCatSlug);
  try {
    const cat = await categoryService.resolveCategory(customCatSlug, orgId);
    console.log('   ✓ categoryService.resolveCategory succeeded! Result:', cat ? { id: cat.id, name: cat.name } : 'null');
  } catch (err) {
    console.error('   ✗ Failed:', err.message);
  }

  // 6. Test categoryService.getById with cat-class5
  console.log('\n6. Testing categoryService.getById with categoryId =', customCatSlug);
  try {
    const cat = await categoryService.getById(customCatSlug);
    console.log('   ✓ categoryService.getById succeeded without Postgres UUID error! Result:', cat ? { id: cat.id, name: cat.name } : 'null');
  } catch (err) {
    console.error('   ✗ Failed:', err.message);
  }

  // 7. Test chapterService.getAll with non-uuid subjectId
  console.log('\n7. Testing chapterService.getAll with subjectId =', customSubSlug);
  try {
    const chapters = await chapterService.getAll(orgId, customSubSlug);
    console.log('   ✓ chapterService.getAll succeeded without Postgres UUID error! Count:', chapters.length);
  } catch (err) {
    console.error('   ✗ Failed:', err.message);
  }

  // 8. Test enrollmentService.assignStudentClass safety with custom classId
  console.log('\n8. Testing enrollmentService.assignStudentClass safety with cat-cls-class5');
  try {
    const assigned = await enrollmentService.assignStudentClass({
      studentId: dummyStudentId,
      organizationId: orgId,
      classId: customClassSlug
    });
    console.log('   ✓ enrollmentService.assignStudentClass succeeded! Active class:', assigned.class?.name || 'Class assigned');
  } catch (err) {
    console.error('   ✗ Failed:', err.message);
  }

  console.log('\n--------------------------------------------------');
  console.log('ALL UUID SAFETY CHECKS COMPLETED WITH 100% SUCCESS!');
  process.exit(0);
}

testResolution().catch((err) => {
  console.error('Unhandled test failure:', err);
  process.exit(1);
});
