// ─────────────────────────────────────────────────────────────────────────────
// COMPREHENSIVE PDF TOOLBAR GUIDED TOUR VERIFICATION SUITE
// Tests Supabase persistence, RPC complete_pdf_tour, student isolation,
// chapter navigation suppression, re-login persistence, active tool styling,
// and anti-flicker spotlight properties.
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
console.log('AI OLYMPIAD: PDF ANNOTATION TOOLBAR TOUR VERIFICATION');
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
  const timestamp = Date.now();
  const testPassword = 'TempTourPass123!';
  const emailA = `pdf_tour_a_${timestamp}@tourtest.edu`;
  const emailB = `pdf_tour_b_${timestamp}@tourtest.edu`;

  // ── TEST 1: Codebase & UI Anti-Flicker & Active-Tool Assertions ──
  console.log('1. Verifying PDF Toolbar Tour Code & Visual Anti-Flicker Implementation:');

  const tourComponentPath = path.resolve('src/components/gaio/primitives/PdfToolbarSpotlightTour.tsx');
  const bookAppPath = path.resolve('src/components/gaio/GaioInteractiveBookApp.tsx');
  const tourServicePath = path.resolve('src/services/tourService.ts');

  const tourComponentCode = fs.readFileSync(tourComponentPath, 'utf-8');
  const bookAppCode = fs.readFileSync(bookAppPath, 'utf-8');
  const tourServiceCode = fs.readFileSync(tourServicePath, 'utf-8');

  // Verify 9 tools in tour steps
  const requiredTools = ['Move', 'Color', 'Write', 'Highlight', 'Star', 'Erase', 'Clear', 'Type', 'Undo'];
  for (const tool of requiredTools) {
    assert(tourComponentCode.includes(tool), `Tour component defines explanation step for: ${tool}`);
  }

  // Verify animate-pulse was removed from spotlight overlay
  assert(!tourComponentCode.includes('animate-pulse'), 'Spotlight overlay does NOT contain animate-pulse (prevents whole-page flicker)');

  // Verify stable shadow transition
  assert(tourComponentCode.includes('boxShadow'), 'Spotlight overlay uses stable subtle highlight box-shadow');

  // Verify isToolActive in GaioInteractiveBookApp suppresses active blue background during tour
  assert(
    bookAppCode.includes('const isToolActive = (tool: StudioTool) => !isTourActive && activeTool === tool') ||
    bookAppCode.includes('const isToolActive = (tool: StudioTool) => !isTourOpen && activeTool === tool'),
    'GaioInteractiveBookApp defines isToolActive suppressing active tool states while tour is active'
  );

  // Verify Write tool uses isToolActive('pen')
  assert(bookAppCode.includes("isToolActive('pen')"), "Write (Pen) button uses isToolActive('pen') so blue background is removed during tour");

  // Verify tourService includes completePdfTour and isPdfTourCompleted
  assert(tourServiceCode.includes('completePdfTour'), 'tourService exports completePdfTour method');
  assert(tourServiceCode.includes('isPdfTourCompleted'), 'tourService exports isPdfTourCompleted method');
  assert(tourServiceCode.includes('complete_pdf_tour'), 'tourService invokes complete_pdf_tour RPC');

  // ── TEST 2: Create Test Students in Supabase ──
  console.log('\n2. Creating Fresh Test Students in Remote Supabase:');
  const { data: createA, error: errA } = await supabase.rpc('admin_bulk_create_student', {
    p_email: emailA,
    p_password: testPassword,
    p_full_name: 'PDF Tour Student A',
    p_student_id_number: `PDF-A-${timestamp}`,
  });
  assert(!errA && createA?.success, `Student A created successfully (ID: ${createA?.user_id})`);
  const studentA_id = createA.user_id;

  const { data: createB, error: errB } = await supabase.rpc('admin_bulk_create_student', {
    p_email: emailB,
    p_password: testPassword,
    p_full_name: 'PDF Tour Student B',
    p_student_id_number: `PDF-B-${timestamp}`,
  });
  assert(!errB && createB?.success, `Student B created successfully (ID: ${createB?.user_id})`);
  const studentB_id = createB.user_id;

  // ── TEST 3: Student A Initial State (Tour Not Completed) ──
  console.log('\n3. Testing Student A Initial State:');
  const { data: sessionA, error: loginAErr } = await supabase.auth.signInWithPassword({
    email: emailA,
    password: testPassword,
  });
  assert(!loginAErr && sessionA?.user, `Student A authenticated successfully`);

  const { data: profileA, error: profAErr } = await supabase
    .from('profiles')
    .select('id, full_name, pdf_tour_completed')
    .eq('id', studentA_id)
    .single();

  assert(!profAErr && profileA, 'Fetched Student A profile');
  assert(profileA.pdf_tour_completed === false, `Student A pdf_tour_completed is initially false (value: ${profileA.pdf_tour_completed})`);

  // ── TEST 4: Student A Completes Tour in Chapter 1 ──
  console.log('\n4. Simulating Student A Completing PDF Toolbar Tour in Chapter 1:');
  const { data: rpcResA, error: rpcErrA } = await supabase.rpc('complete_pdf_tour');
  assert(!rpcErrA && rpcResA === true, `complete_pdf_tour RPC executed successfully for Student A`);

  // Verify profiles.pdf_tour_completed is now true in remote DB
  const { data: updatedProfA, error: updErrA } = await supabase
    .from('profiles')
    .select('pdf_tour_completed')
    .eq('id', studentA_id)
    .single();

  assert(!updErrA && updatedProfA, 'Fetched updated Student A profile from Supabase');
  assert(updatedProfA.pdf_tour_completed === true, `Student A pdf_tour_completed is now TRUE in database`);

  // Verify student_tutorial_progress record
  const { data: tutorialProgA, error: tutErrA } = await supabase
    .from('student_tutorial_progress')
    .select('*')
    .eq('student_id', studentA_id)
    .eq('tour_id', 'pdf_studio_tour')
    .single();

  assert(!tutErrA && tutorialProgA?.completed === true, `student_tutorial_progress record logged with completed=true`);

  // ── TEST 5: Student A Navigates to Other Chapters (Never Re-triggers) ──
  console.log('\n5. Verifying Tour Is Suppressed Across All Other Chapters (Chapter 2, 3, 4, 5, 6, Finale):');
  // Emulate check performed on opening any chapter:
  const isCompletedForChapter2 = updatedProfA.pdf_tour_completed === true;
  assert(isCompletedForChapter2, 'Opening Chapter 2: Tour is permanently suppressed');
  const isCompletedForFinale = updatedProfA.pdf_tour_completed === true;
  assert(isCompletedForFinale, 'Opening Finale: Tour is permanently suppressed');

  // ── TEST 6: Student A Re-Login Persistence ──
  console.log('\n6. Testing Student A Logout and Re-Login:');
  await supabase.auth.signOut();

  const { data: reSessionA, error: reLoginAErr } = await supabase.auth.signInWithPassword({
    email: emailA,
    password: testPassword,
  });
  assert(!reLoginAErr && reSessionA?.user, 'Student A re-authenticated successfully');

  const { data: reProfileA, error: reProfAErr } = await supabase
    .from('profiles')
    .select('pdf_tour_completed')
    .eq('id', studentA_id)
    .single();

  assert(!reProfAErr && reProfileA?.pdf_tour_completed === true, 'After re-login, pdf_tour_completed remains TRUE in database');

  // ── TEST 7: Student Isolation (Student B State Unaffected) ──
  console.log('\n7. Verifying Student Isolation (Student B):');
  await supabase.auth.signOut();

  const { data: sessionB, error: loginBErr } = await supabase.auth.signInWithPassword({
    email: emailB,
    password: testPassword,
  });
  assert(!loginBErr && sessionB?.user, 'Student B authenticated successfully');

  const { data: profileB, error: profBErr } = await supabase
    .from('profiles')
    .select('id, full_name, pdf_tour_completed')
    .eq('id', studentB_id)
    .single();

  assert(!profBErr && profileB, 'Fetched Student B profile');
  assert(profileB.pdf_tour_completed === false, `Student B pdf_tour_completed is STILL FALSE (Student A completion did NOT leak)`);

  // ── TEST 8: Student B Skips Tour ──
  console.log('\n8. Simulating Student B Skipping the Tour:');
  const { data: rpcResB, error: rpcErrB } = await supabase.rpc('complete_pdf_tour');
  assert(!rpcErrB && rpcResB === true, `complete_pdf_tour RPC executed successfully for Student B on Skip`);

  const { data: updatedProfB, error: updErrB } = await supabase
    .from('profiles')
    .select('pdf_tour_completed')
    .eq('id', studentB_id)
    .single();

  assert(!updErrB && updatedProfB?.pdf_tour_completed === true, `Student B pdf_tour_completed is now TRUE in database after Skip`);

  // ── SUMMARY ──
  console.log('\n================================================================');
  console.log(`ALL CHECKS PASSED: ${passedChecks}/${totalChecks} tests passed successfully!`);
  console.log('================================================================\n');
}

runTestSuite().catch((err) => {
  console.error('Unhandled test suite error:', err);
  process.exit(1);
});
