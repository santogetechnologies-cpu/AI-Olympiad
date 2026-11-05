// ─────────────────────────────────────────────────────────────────────────────
// COMPREHENSIVE BULK CSV STUDENT IMPORT VERIFICATION SUITE
// Verifies:
// 1. Option B: Multi-Class CSV Import (Class 3, Class 5, Class 7, Class 12, UG 1st Year)
// 2. Option A: Same-Class Bulk Import (All enrolled in selected target class)
// 3. Invalid Class Name Handling (Rejected, not silently defaulted, no random UUID)
// 4. Duplicate Email & Student ID Rejection within CSV
// 5. Account Creation, Security & Authentication (signInWithPassword with Temp Password)
// 6. Admin Directory Class-Wise Filtering Verification
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from '@supabase/supabase-js';
import {
  parseStudentCsv,
  validateStudentRows,
  matchClassInput,
  generateSampleCsv,
  CORE_CLASS_SPECS
} from '../src/services/bulkStudentService.ts';

const SUPABASE_URL = 'https://dehoomosxtjvtfblhlto.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_6huLeNCsyo71FFLy6CB5DQ_5mG92APB';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});

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

async function runTestSuite() {
  console.log('================================================================');
  console.log('AI OLYMPIAD: BULK CSV IMPORT & MULTI-CLASS VERIFICATION SUITE');
  console.log('================================================================\n');

  const orgId = 'a0000000-0000-0000-0000-000000000001';

  // Seeded Academic Class UUIDs from 20261104000001_seed_core_academic_classes.sql
  const CLASS_3_ID = 'b0000003-0000-0000-0000-000000000003';
  const CLASS_4_ID = 'b0000004-0000-0000-0000-000000000004';
  const CLASS_5_ID = 'b0000005-0000-0000-0000-000000000005';
  const CLASS_7_ID = 'b0000007-0000-0000-0000-000000000007';
  const CLASS_12_ID = 'b0000012-0000-0000-0000-000000000012';
  const CLASS_UG1_ID = 'b0000021-0000-0000-0000-000000000021';

  const availableClasses = [
    { id: CLASS_3_ID, name: 'Class 3', code: 'CLS-03', organization_id: orgId },
    { id: CLASS_4_ID, name: 'Class 4', code: 'CLS-04', organization_id: orgId },
    { id: CLASS_5_ID, name: 'Class 5', code: 'CLS-05', organization_id: orgId },
    { id: 'b0000006-0000-0000-0000-000000000006', name: 'Class 6', code: 'CLS-06', organization_id: orgId },
    { id: CLASS_7_ID, name: 'Class 7', code: 'CLS-07', organization_id: orgId },
    { id: 'b0000008-0000-0000-0000-000000000008', name: 'Class 8', code: 'CLS-08', organization_id: orgId },
    { id: 'b0000009-0000-0000-0000-000000000009', name: 'Class 9', code: 'CLS-09', organization_id: orgId },
    { id: 'b0000010-0000-0000-0000-000000000010', name: 'Class 10', code: 'CLS-10', organization_id: orgId },
    { id: 'b0000011-0000-0000-0000-000000000011', name: 'Class 11', code: 'CLS-11', organization_id: orgId },
    { id: CLASS_12_ID, name: 'Class 12', code: 'CLS-12', organization_id: orgId },
    { id: CLASS_UG1_ID, name: 'UG 1st Year', code: 'UG-01', organization_id: orgId },
    { id: 'b0000022-0000-0000-0000-000000000022', name: 'UG 2nd Year', code: 'UG-02', organization_id: orgId },
    { id: 'b0000023-0000-0000-0000-000000000023', name: 'UG 3rd Year', code: 'UG-03', organization_id: orgId },
    { id: 'b0000024-0000-0000-0000-000000000024', name: 'UG Final Year', code: 'UG-04', organization_id: orgId },
    { id: 'b0000031-0000-0000-0000-000000000031', name: 'PG 1st Year', code: 'PG-01', organization_id: orgId },
    { id: 'b0000032-0000-0000-0000-000000000032', name: 'PG Final Year', code: 'PG-02', organization_id: orgId },
  ];

  // ───────────────────────────────────────────────────────────────────────────
  // TEST 1: Option B - Multi-Class CSV Import (Class 3, 5, 7, 12, UG 1st Year)
  // ───────────────────────────────────────────────────────────────────────────
  console.log('--- TEST 1: Option B – Multi-Class CSV Import ---');
  const timestamp = Date.now();
  const multiClassCsv = `full_name,email,phone,student_id_number,class_name,temporary_password
Aarav Sharma,aarav_${timestamp}@test.edu,9876543001,STD-${timestamp}-01,CLASS 3,TempPass@123
Pooja Nair,pooja_${timestamp}@test.edu,9876543002,STD-${timestamp}-02,CLASS 5,TempPass@123
Vikram Mehta,vikram_${timestamp}@test.edu,9876543003,STD-${timestamp}-03,class 7,TempPass@123
Sneha Rao,sneha_${timestamp}@test.edu,9876543004,STD-${timestamp}-04,CLASS 12,TempPass@123
Karthik Iyer,karthik_${timestamp}@test.edu,9876543005,STD-${timestamp}-05,UG 1st YEAR,TempPass@123`;

  const parseResult1 = parseStudentCsv(multiClassCsv, availableClasses);

  assert(parseResult1.detectedMode === 'multi_class', 'Detected mode must be multi_class');
  assert(parseResult1.rows.length === 5, 'Must parse 5 student rows');
  assert(parseResult1.validCount === 5, 'All 5 rows must be valid');
  assert(parseResult1.errorCount === 0, 'No errors in valid multi-class CSV');

  // Verify class resolutions
  assert(parseResult1.rows[0].class_id === CLASS_3_ID, `Row 0 must map to Class 3 (${CLASS_3_ID})`);
  assert(parseResult1.rows[1].class_id === CLASS_5_ID, `Row 1 must map to Class 5 (${CLASS_5_ID})`);
  assert(parseResult1.rows[2].class_id === CLASS_7_ID, `Row 2 must map to Class 7 (${CLASS_7_ID})`);
  assert(parseResult1.rows[3].class_id === CLASS_12_ID, `Row 3 must map to Class 12 (${CLASS_12_ID})`);
  assert(parseResult1.rows[4].class_id === CLASS_UG1_ID, `Row 4 must map to UG 1st Year (${CLASS_UG1_ID})`);

  console.log('✓ In-memory parsing correctly mapped 5 distinct classes to database UUIDs.');

  // Execute database creation for each student using admin_bulk_create_student
  console.log('  Executing RPC creation for multi-class batch in Supabase...');
  const createdStudents = [];
  for (const row of parseResult1.rows) {
    const { data, error } = await supabase.rpc('admin_bulk_create_student', {
      p_email: row.email,
      p_password: row.temporary_password,
      p_full_name: row.full_name,
      p_phone: row.phone,
      p_student_id_number: row.student_id_number,
      p_class_id: row.class_id,
      p_organization_id: orgId
    });

    assert(!error && data?.success === true, `Failed creating student ${row.email}: ${error?.message || data?.error}`);
    assert(data.class_id === row.class_id, `Returned class_id must match student class (${row.class_id})`);
    createdStudents.push({ ...row, user_id: data.user_id });
  }

  // Verify database enrollments table has individual class assignments
  for (const s of createdStudents) {
    const { error: sLoginErr } = await supabase.auth.signInWithPassword({
      email: s.email,
      password: s.temporary_password,
    });
    assert(!sLoginErr, `Failed to authenticate student ${s.email}: ${sLoginErr?.message}`);

    const { data: enr, error: enrErr } = await supabase
      .from('enrollments')
      .select('student_id, class_id, status')
      .eq('student_id', s.user_id)
      .eq('status', 'active')
      .single();

    assert(!enrErr && enr, `Enrollment record must exist for ${s.email}: ${enrErr?.message}`);
    assert(enr.class_id === s.class_id, `Database class_id (${enr.class_id}) must match assigned class (${s.class_id})`);
  }
  await supabase.auth.signOut();
  console.log(`✓ Test 1 Passed: 5 students created and confirmed in 5 distinct classes in PostgreSQL.\n`);

  // ───────────────────────────────────────────────────────────────────────────
  // TEST 2: Option A - Same Class Bulk Add (Preserved workflow)
  // ───────────────────────────────────────────────────────────────────────────
  console.log('--- TEST 2: Option A – Same Class Bulk Add ---');
  const sameClassCsv = `full_name,email,phone,student_id_number,temporary_password
Deepa Sen,deepa_${timestamp}@test.edu,9876543011,STD-${timestamp}-11,TempPass@123
Rahul Bose,rahul_${timestamp}@test.edu,9876543012,STD-${timestamp}-12,TempPass@123`;

  // Parse in same_class mode targeting Class 4
  const parseResult2 = parseStudentCsv(sameClassCsv, availableClasses, 'same_class', CLASS_4_ID);
  assert(parseResult2.rows.length === 2, 'Must parse 2 rows');
  assert(parseResult2.rows[0].class_id === CLASS_4_ID, 'Student 1 must inherit Class 4');
  assert(parseResult2.rows[1].class_id === CLASS_4_ID, 'Student 2 must inherit Class 4');

  for (const row of parseResult2.rows) {
    const { data, error } = await supabase.rpc('admin_bulk_create_student', {
      p_email: row.email,
      p_password: row.temporary_password,
      p_full_name: row.full_name,
      p_phone: row.phone,
      p_student_id_number: row.student_id_number,
      p_class_id: row.class_id,
      p_organization_id: orgId
    });
    assert(!error && data?.success === true, `Failed creating student ${row.email}: ${error?.message || data?.error}`);
    assert(data.class_id === CLASS_4_ID, `Student must be assigned Class 4`);

    await supabase.auth.signInWithPassword({ email: row.email, password: row.temporary_password });
    const { data: enr } = await supabase.from('enrollments').select('class_id').eq('student_id', data.user_id).single();
    assert(enr?.class_id === CLASS_4_ID, `Student enrollment in DB must match Class 4`);
    await supabase.auth.signOut();
  }
  console.log(`✓ Test 2 Passed: Option A assigns all students to the chosen class (${CLASS_4_ID}).\n`);

  // ───────────────────────────────────────────────────────────────────────────
  // TEST 3: Invalid & Missing Class Name Handling
  // ───────────────────────────────────────────────────────────────────────────
  console.log('--- TEST 3: Invalid & Missing Class Name Handling ---');
  const invalidClassCsv = `full_name,email,phone,student_id_number,class_name
Invalid Guy,invalid_${timestamp}@test.edu,9876543021,STD-${timestamp}-21,CLASS 9999
Missing Guy,missing_${timestamp}@test.edu,9876543022,STD-${timestamp}-22,`;

  const parseResult3 = parseStudentCsv(invalidClassCsv, availableClasses, 'multi_class');
  assert(parseResult3.hasErrors === true, 'Parse result must report errors for invalid class');
  assert(parseResult3.errorCount === 2, 'Both rows must have validation errors');

  // Verify Row 0 error message
  assert(parseResult3.rows[0].class_id === '', 'Invalid class must not have class_id');
  assert(parseResult3.rows[0].validation_error.includes('not recognized'), 'Error must specify class not recognized');

  // Verify Row 1 error message
  assert(parseResult3.rows[1].class_id === '', 'Missing class must not have class_id');
  assert(parseResult3.rows[1].validation_error.includes('Class name is required') || parseResult3.rows[1].validation_error.includes('Class name missing'), 'Error must specify class missing');

  // Verify that an invalid class is NOT silently defaulted to Class 3 or a random UUID
  assert(parseResult3.rows[0].class_id !== CLASS_3_ID, 'Invalid class must NOT silently default to Class 3');
  assert(parseResult3.rows[0].class_id !== CLASS_5_ID, 'Invalid class must NOT silently default to Class 5');

  console.log(`✓ Test 3 Passed: Invalid/missing class names correctly rejected without fallback or random UUIDs.\n`);

  // ───────────────────────────────────────────────────────────────────────────
  // TEST 4: Duplicate Email & Student ID Rejection within CSV
  // ───────────────────────────────────────────────────────────────────────────
  console.log('--- TEST 4: Duplicate Email & Student ID Rejection ---');
  const duplicateCsv = `full_name,email,phone,student_id_number,class_name
Student One,dup_email_${timestamp}@test.edu,9876543031,ID-ORIGINAL,Class 3
Student Two,dup_email_${timestamp}@test.edu,9876543032,ID-DIFFERENT,Class 3
Student Three,student3_${timestamp}@test.edu,9876543033,ID-DUPLICATE,Class 3
Student Four,student4_${timestamp}@test.edu,9876543034,ID-DUPLICATE,Class 3`;

  const parseResult4 = parseStudentCsv(duplicateCsv, availableClasses, 'multi_class');
  assert(parseResult4.rows[0].validation_error === undefined, 'First occurrence of email should be valid');
  assert(parseResult4.rows[1].validation_error.includes('Duplicate email in CSV'), 'Second occurrence must be flagged as duplicate email');
  assert(parseResult4.rows[2].validation_error === undefined, 'First occurrence of student ID should be valid');
  assert(parseResult4.rows[3].validation_error.includes('Duplicate student ID in CSV'), 'Second occurrence must be flagged as duplicate student ID');

  console.log(`✓ Test 4 Passed: Duplicate email & duplicate student ID correctly detected and rejected.\n`);

  // ───────────────────────────────────────────────────────────────────────────
  // TEST 5: Student Account Creation & Login Verification
  // ───────────────────────────────────────────────────────────────────────────
  console.log('--- TEST 5: Student Account Security & Login Verification ---');
  const testStudentEmail = `login_student_${timestamp}@test.edu`;
  const testPassword = 'MySecretPass@123';

  const { data: createData, error: createError } = await supabase.rpc('admin_bulk_create_student', {
    p_email: testStudentEmail,
    p_password: testPassword,
    p_full_name: 'Login Verification Student',
    p_phone: '9876543099',
    p_student_id_number: `VERIF-${timestamp}`,
    p_class_id: CLASS_5_ID,
    p_organization_id: orgId
  });

  assert(!createError && createData?.success === true, `Failed creating login student: ${createError?.message}`);
  assert(createData.must_change_password === true, 'must_change_password must be true');

  // Verify Student can log in with temporary password
  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email: testStudentEmail,
    password: testPassword,
  });

  assert(!loginError && loginData?.user, `Student login failed: ${loginError?.message}`);
  assert(loginData.user.id === createData.user_id, 'Authenticated user ID matches created student ID');

  // Verify Profile in database under authenticated session
  const { data: profile, error: profErr } = await supabase
    .from('profiles')
    .select('full_name, phone, student_id_number, must_change_password, status')
    .eq('id', createData.user_id)
    .single();

  assert(!profErr && profile, 'Profile must be queryable in database');
  assert(profile.full_name === 'Login Verification Student', 'Profile full_name matches');
  assert(profile.student_id_number === `VERIF-${timestamp}`, 'Profile student_id_number matches');
  assert(profile.must_change_password === true, 'Profile must_change_password matches');

  // Verify User Role is student
  const { data: roles } = await supabase
    .from('user_roles')
    .select('role:roles(name)')
    .eq('user_id', createData.user_id);

  assert(roles && roles.some(r => r.role?.name === 'student'), 'User role must be student');
  assert(!roles.some(r => r.role?.name === 'admin'), 'User role must NOT be admin');

  await supabase.auth.signOut();
  console.log(`✓ Test 5 Passed: Student account securely created and logged in with temporary password.\n`);

  // ───────────────────────────────────────────────────────────────────────────
  // TEST 6: Student Class Isolation & Directory Verification
  // ───────────────────────────────────────────────────────────────────────────
  console.log('--- TEST 6: Student Class Isolation & Directory Verification ---');
  // Student A (Class 3) logs in and checks their active class
  await supabase.auth.signInWithPassword({
    email: createdStudents[0].email,
    password: createdStudents[0].temporary_password,
  });
  const { data: myEnrA } = await supabase.from('enrollments').select('student_id, class_id').eq('status', 'active');
  assert(myEnrA?.length === 1 && myEnrA[0].class_id === CLASS_3_ID, 'Student A sees exactly their Class 3 enrollment');

  // Student B (Class 5) logs in and checks their active class
  await supabase.auth.signInWithPassword({
    email: createdStudents[1].email,
    password: createdStudents[1].temporary_password,
  });
  const { data: myEnrB } = await supabase.from('enrollments').select('student_id, class_id').eq('status', 'active');
  assert(myEnrB?.length === 1 && myEnrB[0].class_id === CLASS_5_ID, 'Student B sees exactly their Class 5 enrollment');

  // Student E (UG 1st Year) logs in and checks their active class
  await supabase.auth.signInWithPassword({
    email: createdStudents[4].email,
    password: createdStudents[4].temporary_password,
  });
  const { data: myEnrE } = await supabase.from('enrollments').select('student_id, class_id').eq('status', 'active');
  assert(myEnrE?.length === 1 && myEnrE[0].class_id === CLASS_UG1_ID, 'Student E sees exactly their UG 1st Year enrollment');

  console.log(`✓ Test 6 Passed: Strict student class isolation and independent class assignments verified.\n`);

  // ───────────────────────────────────────────────────────────────────────────
  // SUMMARY
  // ───────────────────────────────────────────────────────────────────────────
  console.log('================================================================');
  console.log(`RESULTS: ${passedChecks} OF ${totalChecks} ASSERTIONS PASSED (100%)`);
  console.log('BULK CSV STUDENT IMPORT SYSTEM VERIFIED SUCCESSFULLY!');
  console.log('================================================================');
}

runTestSuite().catch(err => {
  console.error('Test runner fatal error:', err);
  process.exit(1);
});
