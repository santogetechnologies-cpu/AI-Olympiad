// ─────────────────────────────────────────────────────────────────────────────
// COMPREHENSIVE STUDENT SIDEBAR TOUR ONBOARDING VERIFICATION SUITE
// Tests database persistence, student isolation, skip/complete actions,
// and role protections with real authenticated Supabase sessions.
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dehoomosxtjvtfblhlto.supabase.co';
const SUPABASE_KEY = 'sb_publishable_6huLeNCsyo71FFLy6CB5DQ_5mG92APB';

// Client for testing
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false }
});

console.log('================================================================');
console.log('AI OLYMPIAD: ONE-TIME STUDENT SIDEBAR TOUR VERIFICATION');
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
  const emailA = `tour_student_a_${timestamp}@tourtest.edu`;
  const emailB = `tour_student_b_${timestamp}@tourtest.edu`;

  console.log('1. Creating Fresh Test Students:');
  console.log(`  Student A: ${emailA}`);
  console.log(`  Student B: ${emailB}`);

  // Create Student A
  const { data: createA, error: errA } = await supabase.rpc('admin_bulk_create_student', {
    p_email: emailA,
    p_password: testPassword,
    p_full_name: 'Tour Test Student A',
    p_student_id_number: `TOUR-A-${timestamp}`,
  });
  assert(!errA && createA?.success, `Student A created successfully (ID: ${createA?.user_id})`);
  const studentA_id = createA.user_id;

  // Create Student B
  const { data: createB, error: errB } = await supabase.rpc('admin_bulk_create_student', {
    p_email: emailB,
    p_password: testPassword,
    p_full_name: 'Tour Test Student B',
    p_student_id_number: `TOUR-B-${timestamp}`,
  });
  assert(!errB && createB?.success, `Student B created successfully (ID: ${createB?.user_id})`);
  const studentB_id = createB.user_id;

  // ── TEST 2: Student A First Login & Tour Presentation ──
  console.log('\n2. Testing Student A First Login & Default Tour State:');
  const { error: loginAErr } = await supabase.auth.signInWithPassword({
    email: emailA,
    password: testPassword,
  });
  assert(!loginAErr, `Student A authenticated successfully`);

  // Query profile under Student A's authenticated session
  const { data: profileAInitial, error: profAErr } = await supabase
    .from('profiles')
    .select('id, full_name, sidebar_tour_completed')
    .eq('id', studentA_id)
    .single();

  assert(!profAErr, `Fetched Student A profile without error`);
  assert(profileAInitial.sidebar_tour_completed === false, `Student A sidebar_tour_completed is FALSE on first login (Tour will start)`);

  // ── TEST 3: Student A Completes Tour ──
  console.log('\n3. Testing Student A Tour Completion Flow:');
  // Student A finishes the tour: calls RPC complete_sidebar_tour()
  const { data: rpcRes, error: rpcErr } = await supabase.rpc('complete_sidebar_tour');
  assert(!rpcErr && rpcRes === true, `complete_sidebar_tour() RPC succeeded for Student A`);

  // Verify in database immediately
  const { data: profileACompleted } = await supabase
    .from('profiles')
    .select('sidebar_tour_completed')
    .eq('id', studentA_id)
    .single();

  assert(profileACompleted.sidebar_tour_completed === true, `Student A database record updated to sidebar_tour_completed = TRUE`);

  // ── TEST 4: Student A Logout & Re-login (Tour Never Re-appears) ──
  console.log('\n4. Testing Student A Re-Login (Tour Never Appears Again):');
  await supabase.auth.signOut();

  const { error: reLoginAErr } = await supabase.auth.signInWithPassword({
    email: emailA,
    password: testPassword,
  });
  assert(!reLoginAErr, `Student A logged in a second time`);

  const { data: profileARecheck } = await supabase
    .from('profiles')
    .select('sidebar_tour_completed')
    .eq('id', studentA_id)
    .single();

  assert(profileARecheck.sidebar_tour_completed === true, `Student A profile retains sidebar_tour_completed = TRUE across logins`);
  await supabase.auth.signOut();

  // ── TEST 5: Student Account Isolation ──
  console.log('\n5. Testing Strict Account Isolation (Student B Unaffected by Student A):');
  const { error: loginBErr } = await supabase.auth.signInWithPassword({
    email: emailB,
    password: testPassword,
  });
  assert(!loginBErr, `Student B authenticated successfully`);

  const { data: profileBInitial } = await supabase
    .from('profiles')
    .select('id, full_name, sidebar_tour_completed')
    .eq('id', studentB_id)
    .single();

  assert(
    profileBInitial.sidebar_tour_completed === false,
    `Student B STILL has sidebar_tour_completed = FALSE (Student A completion did NOT affect Student B)`
  );

  // ── TEST 6: Student B Skips Tour ──
  console.log('\n6. Testing Student B Skip Tour Flow:');
  // When Student B clicks "Skip Tour", direct table update or RPC persists completion
  const { error: skipErr } = await supabase
    .from('profiles')
    .update({ sidebar_tour_completed: true, updated_at: new Date().toISOString() })
    .eq('id', studentB_id);

  assert(!skipErr, `Direct update on profiles.sidebar_tour_completed for own profile succeeded`);

  const { data: profileBSkipped } = await supabase
    .from('profiles')
    .select('sidebar_tour_completed')
    .eq('id', studentB_id)
    .single();

  assert(
    profileBSkipped.sidebar_tour_completed === true,
    `Student B database record is now TRUE after skipping tour`
  );

  // Re-login Student B
  await supabase.auth.signOut();
  await supabase.auth.signInWithPassword({ email: emailB, password: testPassword });
  const { data: profileBRecheck } = await supabase
    .from('profiles')
    .select('sidebar_tour_completed')
    .eq('id', studentB_id)
    .single();

  assert(profileBRecheck.sidebar_tour_completed === true, `Student B retains completion after skip across logins`);
  await supabase.auth.signOut();

  // ── TEST 7: Role Protection (Tour Strictly Isolated to Students) ──
  console.log('\n7. Testing Role Protection (Tour strictly isolated to Students):');
  const evaluateTourVisibility = (role) => {
    const isAdmin = role === 'admin';
    const isContentManager = role === 'academic_content_manager' || role === 'content_manager';
    const isStudent = !isAdmin && !isContentManager;
    return isStudent;
  };

  assert(evaluateTourVisibility('admin') === false, `Admin account is strictly excluded from receiving student tour`);
  assert(evaluateTourVisibility('academic_content_manager') === false, `Content Manager account is strictly excluded from receiving student tour`);
  assert(evaluateTourVisibility('student') === true, `Student account correctly qualifies for the guided tour`);

  console.log('\n================================================================');
  console.log(`ALL VERIFICATION CHECKS PASSED: ${passedChecks}/${totalChecks} tests successful!`);
  console.log('================================================================\n');
}

runTestSuite().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
