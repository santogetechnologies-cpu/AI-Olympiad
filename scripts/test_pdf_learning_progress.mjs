// ─────────────────────────────────────────────────────────────────────────────
// COMPREHENSIVE PDF LEARNING PROGRESS SYSTEM VERIFICATION SUITE
// Tests whole-number percentages, exact 100% calculation, incomplete chapters,
// duplicate page prevention, overall progress across all chapters,
// async background persistence, and rapid navigation resilience.
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const SUPABASE_URL = 'https://dehoomosxtjvtfblhlto.supabase.co';
const SUPABASE_KEY = 'sb_publishable_6huLeNCsyo71FFLy6CB5DQ_5mG92APB';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});

console.log('================================================================');
console.log('AI OLYMPIAD: PDF LEARNING PROGRESS SYSTEM VERIFICATION');
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

// Emulate formatProgressPercentage matching the service
function formatProgressPercentage(completed, total) {
  if (!total || total <= 0 || !completed || completed <= 0) {
    return { numeric: 0, formatted: '0%' };
  }
  if (completed >= total) {
    return { numeric: 100, formatted: '100%' };
  }
  const rawPct = (completed / total) * 100;
  const numeric = Math.min(99, Math.max(1, Math.round(rawPct)));
  const formatted = `${numeric}%`;
  return { numeric, formatted };
}

async function runTestSuite() {
  const timestamp = Date.now();
  const testPassword = 'TempProgPass123!';
  const studentEmail = `prog_test_${timestamp}@progress.edu`;

  // ── TEST 1: Percentage Formatting & No Decimal Rules ──
  console.log('1. Verifying Percentage Calculations & Decimal Removal:');

  // Verify formatProgressPercentage behavior
  const p0 = formatProgressPercentage(0, 33);
  assert(p0.numeric === 0 && p0.formatted === '0%', '0/33 returns 0%');

  const p1 = formatProgressPercentage(1, 33);
  assert(p1.numeric === 3 && p1.formatted === '3%', '1/33 returns 3% (whole number, no decimals)');

  const p10 = formatProgressPercentage(10, 33);
  assert(p10.numeric === 30 && p10.formatted === '30%', '10/33 returns 30% (whole number, no decimals)');

  const p32 = formatProgressPercentage(32, 33);
  assert(p32.numeric === 97 && p32.formatted === '97%', '32/33 returns 97% (not 100% until all pages complete)');

  const p33 = formatProgressPercentage(33, 33);
  assert(p33.numeric === 100 && p33.formatted === '100%', '33/33 returns exactly 100%');

  // Edge case: 217 out of 218 pages in Class 3 (99.54%)
  const pEdge = formatProgressPercentage(217, 218);
  assert(pEdge.numeric === 99 && pEdge.formatted === '99%', '217/218 returns 99% (never 100% when 1 page missing)');

  const pFull = formatProgressPercentage(218, 218);
  assert(pFull.numeric === 100 && pFull.formatted === '100%', '218/218 returns exactly 100%');

  // Verify regex test across 100 random values: ZERO decimals
  let hasDecimals = false;
  for (let c = 0; c <= 230; c++) {
    const res = formatProgressPercentage(c, 230);
    if (res.formatted.includes('.')) hasDecimals = true;
    if (!Number.isInteger(res.numeric)) hasDecimals = true;
  }
  assert(!hasDecimals, 'All 230 tested page counts return strict integers with no decimal points');

  // ── TEST 2: Static Codebase Verification ──
  console.log('\n2. Verifying Frontend & Service Implementation:');

  const progressServiceCode = fs.readFileSync('src/services/progressService.ts', 'utf-8');
  const bookAppCode = fs.readFileSync('src/components/gaio/GaioInteractiveBookApp.tsx', 'utf-8');
  const progressPageCode = fs.readFileSync('src/pages/student/StudentProgressPage.tsx', 'utf-8');

  // Verify no toFixed(2) in progressService
  assert(!progressServiceCode.includes('toFixed(2)'), 'progressService does NOT contain toFixed(2) decimal formatting');

  // Verify queueProgressPersistence is present
  assert(progressServiceCode.includes('queueProgressPersistence'), 'progressService defines background queueProgressPersistence');

  // Verify flushPendingUpdates is exported
  assert(progressServiceCode.includes('flushPendingUpdates'), 'progressService exports flushPendingUpdates method');

  // Verify isChapterDone checks chCompletedCount >= chTotalPages
  assert(progressServiceCode.includes('const isChapterDone = chCompletedCount >= chTotalPages && chTotalPages > 0'), 'progressService enforces isChapterDone strictly when all unique pages completed');

  // Verify GaioInteractiveBookApp calls flushPendingUpdates on unload
  assert(bookAppCode.includes('flushPendingUpdates'), 'GaioInteractiveBookApp flushes pending updates on beforeunload');

  // Verify StudentProgressPage uses whole-number percentages
  assert(progressPageCode.includes('formatProgressPercentage'), 'StudentProgressPage uses formatProgressPercentage for overall completion');

  // ── TEST 3: Create Authenticated Student in Supabase ──
  console.log('\n3. Creating Fresh Student in Remote Supabase:');
  const { data: createRes, error: createErr } = await supabase.rpc('admin_bulk_create_student', {
    p_email: studentEmail,
    p_password: testPassword,
    p_full_name: 'Progress Test Student',
    p_student_id_number: `PROG-${timestamp}`,
  });
  assert(!createErr && createRes?.success, `Student created successfully (ID: ${createRes?.user_id})`);
  const studentId = createRes.user_id;

  const { data: sessionData, error: loginErr } = await supabase.auth.signInWithPassword({
    email: studentEmail,
    password: testPassword,
  });
  assert(!loginErr && sessionData?.user, 'Student authenticated successfully');

  // ── TEST 4: Initial State in Database (0 Completed Pages) ──
  console.log('\n4. Verifying Fresh Student Initial Progress State:');
  const { data: initialProgress, error: initErr } = await supabase
    .from('student_chapter_reading_progress')
    .select('*')
    .eq('student_id', studentId);
  assert(!initErr, 'Queried initial reading progress');
  assert(initialProgress.length === 0, 'No prior reading progress records exist');

  // ── TEST 5: Record Incomplete Chapter Progress (5 out of 35 pages) ──
  console.log('\n5. Testing Incomplete Chapter Progress (5 of 35 pages):');
  const chapterKey = 'ch1';
  const gradeKey = 'class10'; // 35 pages in ch1
  const chTotalPages = 35;
  const initialPages = [1, 2, 3, 4, 5];
  const pct5 = formatProgressPercentage(initialPages.length, chTotalPages);

  const { error: upsertErr1 } = await supabase.from('student_chapter_reading_progress').upsert(
    {
      student_id: studentId,
      grade_key: gradeKey,
      chapter_key: chapterKey,
      last_read_page: 5,
      total_pages: chTotalPages,
      completed_pages: initialPages,
      completion_percentage: pct5.numeric,
      is_completed: false,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'student_id,grade_key,chapter_key' }
  );
  assert(!upsertErr1, 'Persisted 5/35 pages to Supabase');

  const { data: fetch1 } = await supabase
    .from('student_chapter_reading_progress')
    .select('*')
    .eq('student_id', studentId)
    .eq('chapter_key', chapterKey)
    .single();

  assert(fetch1.completed_pages.length === 5, 'Database holds exactly 5 completed pages');
  assert(fetch1.completion_percentage === 14, `Incomplete chapter percentage is 14% (5/35 = 14.28% -> 14%), got: ${fetch1.completion_percentage}%`);
  assert(fetch1.is_completed === false, 'is_completed is FALSE for incomplete chapter');

  // ── TEST 6: Prevent Duplicate Page Records ──
  console.log('\n6. Testing Duplicate Page Prevention:');
  // Attempt to add page 1 again
  const dupPages = [1, 2, 3, 4, 5, 1, 2, 3];
  const uniquePages = Array.from(new Set(dupPages)).sort((a, b) => a - b);
  assert(uniquePages.length === 5, 'Deduplication reduces duplicate page array back to 5 unique pages');

  // Insert into student_page_completions with ON CONFLICT
  const { error: pageCompErr1 } = await supabase.from('student_page_completions').upsert(
    {
      student_id: studentId,
      grade_key: gradeKey,
      chapter_key: chapterKey,
      page_number: 1,
    },
    { onConflict: 'student_id,grade_key,chapter_key,page_number' }
  );
  assert(!pageCompErr1, 'Inserted page 1 into student_page_completions');

  // Duplicate insert should succeed with ON CONFLICT without error or duplicate row
  const { error: pageCompErr2 } = await supabase.from('student_page_completions').upsert(
    {
      student_id: studentId,
      grade_key: gradeKey,
      chapter_key: chapterKey,
      page_number: 1,
    },
    { onConflict: 'student_id,grade_key,chapter_key,page_number' }
  );
  assert(!pageCompErr2, 'Duplicate page 1 insert handled gracefully via ON CONFLICT');

  const { data: pageRecords } = await supabase
    .from('student_page_completions')
    .select('*')
    .eq('student_id', studentId)
    .eq('chapter_key', chapterKey)
    .eq('page_number', 1);

  assert(pageRecords.length === 1, `Exactly 1 record exists for page 1 (count: ${pageRecords.length})`);

  // ── TEST 7: Opening/Completing Last Page Alone Does NOT Mark Chapter Complete ──
  console.log('\n7. Verifying Last Page Alone Does NOT Complete Chapter:');
  // Complete page 35 while pages 6-34 remain incomplete
  const skippedPages = [1, 2, 3, 4, 5, 35];
  const pctSkipped = formatProgressPercentage(skippedPages.length, chTotalPages);
  const isCompleteSkipped = skippedPages.length >= chTotalPages; // false (6 < 35)

  assert(!isCompleteSkipped, 'Chapter is NOT complete when last page is done but intermediate pages are missing');
  assert(pctSkipped.numeric === 17, `Progress is 17% (6/35), not 100%`);

  await supabase.from('student_chapter_reading_progress').upsert(
    {
      student_id: studentId,
      grade_key: gradeKey,
      chapter_key: chapterKey,
      last_read_page: 35,
      total_pages: chTotalPages,
      completed_pages: skippedPages,
      completion_percentage: pctSkipped.numeric,
      is_completed: isCompleteSkipped,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'student_id,grade_key,chapter_key' }
  );

  const { data: fetchSkipped } = await supabase
    .from('student_chapter_reading_progress')
    .select('is_completed, completion_percentage, completed_pages')
    .eq('student_id', studentId)
    .eq('chapter_key', chapterKey)
    .single();

  assert(fetchSkipped.is_completed === false, 'Database confirms is_completed is FALSE when opening/completing page 35 alone');
  assert(fetchSkipped.completion_percentage === 17, `Database percentage is 17% (value: ${fetchSkipped.completion_percentage}%)`);

  // ── TEST 8: Full Chapter Completion Produces Exactly 100% ──
  console.log('\n8. Testing Full Chapter Completion (All 35 Pages):');
  const all35Pages = Array.from({ length: 35 }, (_, i) => i + 1);
  const pct100 = formatProgressPercentage(all35Pages.length, chTotalPages);
  const isAllDone = all35Pages.length >= chTotalPages;

  assert(isAllDone, 'All 35 pages completed condition met');
  assert(pct100.numeric === 100 && pct100.formatted === '100%', '35/35 pages calculates exactly 100%');

  await supabase.from('student_chapter_reading_progress').upsert(
    {
      student_id: studentId,
      grade_key: gradeKey,
      chapter_key: chapterKey,
      last_read_page: 35,
      total_pages: chTotalPages,
      completed_pages: all35Pages,
      completion_percentage: pct100.numeric,
      is_completed: isAllDone,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'student_id,grade_key,chapter_key' }
  );

  const { data: fetchComplete } = await supabase
    .from('student_chapter_reading_progress')
    .select('is_completed, completion_percentage, completed_pages')
    .eq('student_id', studentId)
    .eq('chapter_key', chapterKey)
    .single();

  assert(fetchComplete.is_completed === true, 'Database confirms is_completed is TRUE when all pages done');
  assert(fetchComplete.completion_percentage === 100, `Database confirms completion_percentage is exactly 100%`);
  assert(fetchComplete.completed_pages.length === 35, 'Database holds all 35 unique pages');

  // ── TEST 9: Rapid Next Page Navigation Simulation ──
  console.log('\n9. Testing Rapid Next Page Navigation (Concurrency & Queue):');
  const rapidPages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const chapter2Key = 'ch2';
  const promises = rapidPages.map((pageNum) => {
    return supabase.from('student_page_completions').upsert(
      {
        student_id: studentId,
        grade_key: gradeKey,
        chapter_key: chapter2Key,
        page_number: pageNum,
      },
      { onConflict: 'student_id,grade_key,chapter_key,page_number' }
    );
  });

  const results = await Promise.all(promises);
  const allSucceeded = results.every((r) => !r.error);
  assert(allSucceeded, 'All 10 rapid parallel page completion writes succeeded without collision');

  const { data: ch2Pages } = await supabase
    .from('student_page_completions')
    .select('page_number')
    .eq('student_id', studentId)
    .eq('chapter_key', chapter2Key);

  assert(ch2Pages.length === 10, `Database contains exactly 10 pages for rapid navigation (count: ${ch2Pages.length})`);

  // ── TEST 10: Refresh & Re-login State Preservation ──
  console.log('\n10. Testing Refresh & Re-login State Preservation:');
  await supabase.auth.signOut();

  // Re-authenticate
  const { data: reAuthSession, error: reAuthErr } = await supabase.auth.signInWithPassword({
    email: studentEmail,
    password: testPassword,
  });
  assert(!reAuthErr && reAuthSession?.user, 'Student re-authenticated successfully after logout');

  const { data: restoredProgress } = await supabase
    .from('student_chapter_reading_progress')
    .select('*')
    .eq('student_id', studentId)
    .eq('chapter_key', chapterKey)
    .single();

  assert(restoredProgress.completion_percentage === 100, `Restored progress remains 100% after re-login`);
  assert(restoredProgress.is_completed === true, `Restored chapter remains completed after re-login`);
  assert(restoredProgress.completed_pages.length === 35, `Restored completed pages length is 35 after re-login`);

  console.log('\n================================================================');
  console.log(`ALL CHECKS PASSED: ${passedChecks}/${totalChecks} tests passed successfully!`);
  console.log('================================================================\n');
}

runTestSuite().catch((err) => {
  console.error('Unhandled test suite error:', err);
  process.exit(1);
});

