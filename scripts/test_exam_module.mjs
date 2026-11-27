// ─────────────────────────────────────────────────────────────────────────────
// EXAM MODULE VERIFICATION
// Pure logic (scheduling, results visibility, marks split, bulk import)
// plus database security checks as an unauthenticated client.
// Run: node --env-file=.env scripts/test_exam_module.mjs
// ─────────────────────────────────────────────────────────────────────────────

globalThis.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} }

const { examWindowState, resultsVisibleFor } = await import('../src/services/examService.ts')
const { distributeEqually, parseBulk, blankQuestion, fromLocalInput, toLocalInput } = await import('../src/utils/examBuilder.ts')
const { supabase } = await import('../src/lib/supabase.ts')

let passed = 0
let failed = 0
function check(cond, msg) {
  if (cond) { passed++; console.log(`  ✅ ${msg}`) } else { failed++; console.error(`  ❌ ${msg}`) }
}

const HOUR = 3_600_000
const now = Date.now()
const iso = t => new Date(t).toISOString()

console.log('\n--- Exam window state ---')
check(examWindowState({ status: 'published' }) === 'open', 'published with no dates is open')
check(examWindowState({ status: 'published', start_at: iso(now + HOUR) }) === 'upcoming', 'future start is upcoming')
check(examWindowState({ status: 'published', start_at: iso(now - HOUR), end_at: iso(now + HOUR) }) === 'open', 'inside window is open')
check(examWindowState({ status: 'published', end_at: iso(now - HOUR) }) === 'closed', 'past end is closed')
check(examWindowState({ status: 'closed' }) === 'closed', 'closed status is closed')

console.log('\n--- Results visibility ---')
check(resultsVisibleFor({ results_visibility: 'immediate', results_published: false, status: 'published' }), 'immediate is visible')
check(!resultsVisibleFor({ results_visibility: 'manual', results_published: false, status: 'closed' }), 'manual hidden until published')
check(resultsVisibleFor({ results_visibility: 'manual', results_published: true, status: 'published' }), 'manual visible once published')
check(!resultsVisibleFor({ results_visibility: 'after_end', results_published: false, status: 'published', end_at: iso(now + HOUR) }), 'after_end hidden before end')
check(resultsVisibleFor({ results_visibility: 'after_end', results_published: false, status: 'published', end_at: iso(now - HOUR) }), 'after_end visible after end')
check(resultsVisibleFor({ results_visibility: 'after_end', results_published: false, status: 'closed' }), 'after_end visible when closed')

console.log('\n--- Equal marks split ---')
for (const [total, n] of [[100, 3], [25, 7], [200, 200], [100, 30], [25, 1], [200, 13]]) {
  const qs = distributeEqually(Array.from({ length: n }, () => blankQuestion(4)), total)
  const sum = Math.round(qs.reduce((s, q) => s + q.marks, 0) * 100) / 100
  check(sum === total && qs.every(q => q.marks >= 0), `${total} marks over ${n} questions sums to ${sum}`)
}

console.log('\n--- Bulk paste parser ---')
const parsed = parseBulk(`1. What does AI stand for?
A) Automatic Input
B) Artificial Intelligence
C) Advanced Internet
D) Analog Interface
Answer: B
Explanation: AI = Artificial Intelligence

Q2) Which one is a robot?
a. A rock
*b. A machine that follows instructions

3. Multi-line
question text
(A) one
(B) two
(C) three
Ans - c

4. Not enough options
A) only one`)
check(parsed.length === 3, `parses 3 valid questions (got ${parsed.length})`)
check(parsed[0]?.options.length === 4 && parsed[0]?.correct_option === 1, 'Q1: 4 options, answer B')
check(parsed[0]?.explanation === 'AI = Artificial Intelligence', 'Q1: explanation captured')
check(parsed[1]?.question_text === 'Which one is a robot?' && parsed[1]?.correct_option === 1, 'Q2: number stripped, * marks answer')
check(parsed[2]?.question_text === 'Multi-line question text' && parsed[2]?.correct_option === 2, 'Q3: multi-line text, "Ans - c"')
const outOfRange = parseBulk('Q?\nA) x\nB) y\nAnswer: D')
check(outOfRange.length === 1 && outOfRange[0].correct_option === null, 'answer beyond options is left unset')

console.log('\n--- Date input round trip ---')
const local = '2026-12-01T09:30'
check(toLocalInput(fromLocalInput(local)) === local, 'datetime-local survives round trip')
check(fromLocalInput('') === null, 'empty date becomes null')

console.log('\n--- Database security (unauthenticated client) ---')
const keys = await supabase.from('exam_answer_keys').select('*').limit(5)
check(!keys.error && keys.data.length === 0, 'answer keys are not readable')
const attempts = await supabase.from('exam_attempts').select('*').limit(5)
check(!attempts.error && attempts.data.length === 0, 'attempts are not readable')
const drafts = await supabase.from('exams').select('id').eq('status', 'draft').limit(5)
check(!drafts.error && drafts.data.length === 0, 'draft exams are not visible')
const submit = await supabase.rpc('submit_exam_attempt', { p_exam_id: '00000000-0000-0000-0000-000000000000', p_answers: {} })
check(submit.error?.message === 'Not authenticated', 'submitting without login is rejected')
const insert = await supabase.from('exam_attempts').insert({ exam_id: '00000000-0000-0000-0000-000000000000', student_id: '00000000-0000-0000-0000-000000000000', score: 100 })
check(!!insert.error, 'attempts cannot be inserted directly')
const mine = await supabase.rpc('get_my_exam_attempts')
check(!mine.error && mine.data.length === 0, 'get_my_exam_attempts returns nothing without login')

console.log(`\n${passed} passed, ${failed} failed`)
process.exit(failed ? 1 : 0)
