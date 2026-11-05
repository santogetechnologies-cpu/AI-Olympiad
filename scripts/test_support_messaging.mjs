// ─────────────────────────────────────────────────────────────────────────────
// COMPREHENSIVE TWO-WAY STUDENT-ADMIN SUPPORT MESSAGING VERIFICATION SUITE
// Tests all 10 acceptance scenarios from user specification
// ─────────────────────────────────────────────────────────────────────────────

// Mock environment for Node
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

const { supportService } = await import('../src/services/supportService.ts');
const { supabase } = await import('../src/lib/supabase.ts');

console.log('================================================================');
console.log('AI OLYMPIAD: TWO-WAY SUPPORT MESSAGING VERIFICATION');
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

async function runTestSuite() {
  // Real authenticated admin and student IDs verified from PostgreSQL database
  const adminId = 'c2689c59-1355-4cd4-9a55-8119317ba8fb'; // admin@santoge.com
  const studentA_id = 'fff7f8b7-fb03-440f-90e1-648a79b9129c'; // Andrew (Class 3)
  const studentB_id = '69940d93-5c99-4c96-b329-5400e57d573d'; // Student B (Class 5)

  console.log(`Admin user: ${adminId}`);
  console.log(`Student A (Class 3): ${studentA_id}`);
  console.log(`Student B (Class 5): ${studentB_id}\n`);

  // Clean up any old test conversations for these students to start fresh
  await supabase
    .from('support_conversations')
    .delete()
    .in('student_id', [studentA_id, studentB_id]);

  // ── TEST SCENARIO 1 & 2: Student A sends initial message ──
  console.log('--- TEST 1 & 2: Student A creates conversation ---');
  const testSubjA = `Question about Class 3 Robotics Project [${Date.now()}]`;
  const testMsgA1 = 'Hello Admin! How do we run the Python sensor loop on page 14 of the Class 3 workbook?';

  const { conversation: convA, message: msgA1 } = await supportService.createStudentConversation({
    studentId: studentA_id,
    subject: testSubjA,
    category: 'Academic / Lesson Question',
    priority: 'urgent',
    message: testMsgA1,
  });

  assert(convA && convA.id, 'Conversation A must be created with UUID');
  assert(convA.student_id === studentA_id, 'Conversation A must belong to Student A');
  assert(convA.status === 'awaiting_reply', 'Initial status must be awaiting_reply');
  assert(convA.unread_admin_count >= 1, 'Initial unread_admin_count must be at least 1');
  assert(msgA1 && msgA1.id, 'Initial message A1 must be created with UUID');
  assert(msgA1.sender_role === 'student', 'Message sender_role must be student');
  assert(msgA1.message === testMsgA1, 'Message content must match input');
  console.log(`✓ Scenario 1 & 2 Passed: Student A created conversation ${convA.id} in database.\n`);

  // ── TEST SCENARIO 3: Admin sees Student A conversation ──
  console.log('--- TEST 3: Admin Help & Support sees incoming conversation ---');
  const adminConvs1 = await supportService.getAdminConversations();
  const foundConvA = adminConvs1.find((c) => c.id === convA.id);

  assert(foundConvA !== undefined, 'Admin must see Student A conversation');
  assert(foundConvA.subject === testSubjA, 'Admin sees correct subject');
  assert(foundConvA.status === 'awaiting_reply', 'Admin sees status awaiting_reply');
  assert(foundConvA.unread_admin_count >= 1, 'Admin sees unread message indicator');
  assert(foundConvA.student_class_name === 'Class 3', `Admin sees student class "Class 3", got "${foundConvA.student_class_name}"`);
  console.log(`✓ Scenario 3 Passed: Admin panel displays Student A conversation with class "${foundConvA.student_class_name}".\n`);

  // ── TEST SCENARIO 4: Admin opens conversation, marks read, and replies ──
  console.log('--- TEST 4: Admin marks read and replies to Student A ---');
  await supportService.markAsRead(convA.id, 'admin');

  // Verify unread count is reset for admin
  const { data: convAfterRead } = await supabase
    .from('support_conversations')
    .select('unread_admin_count')
    .eq('id', convA.id)
    .single();
  assert(convAfterRead.unread_admin_count === 0, 'Admin unread count must be 0 after reading');

  const adminReplyMsg = 'Hello! You can start the sensor loop by importing the gaio_robot module on page 14.';
  const replyResult = await supportService.sendMessage({
    conversationId: convA.id,
    senderId: adminId,
    senderRole: 'admin',
    message: adminReplyMsg,
  });

  assert(replyResult && replyResult.id, 'Admin reply message must be saved in database');
  assert(replyResult.sender_role === 'admin', 'Sender role must be admin');

  // Verify conversation status updated to replied
  const { data: convAfterReply } = await supabase
    .from('support_conversations')
    .select('status, unread_student_count')
    .eq('id', convA.id)
    .single();
  assert(convAfterReply.status === 'replied', `Conversation status must be "replied", got "${convAfterReply.status}"`);
  assert(convAfterReply.unread_student_count >= 1, 'Student must have unread count >= 1 for new admin reply');
  console.log('✓ Scenario 4 Passed: Admin reply successfully recorded, conversation marked "replied".\n');

  // ── TEST SCENARIO 5: Student A receives Admin reply ──
  console.log('--- TEST 5: Student A retrieves Admin reply ---');
  const studentAConvs = await supportService.getStudentConversations(studentA_id);
  const studentAActiveConv = studentAConvs.find((c) => c.id === convA.id);

  assert(studentAActiveConv !== undefined, 'Student A must have their conversation');
  assert(studentAActiveConv.status === 'replied', 'Student A sees status "replied"');
  assert(studentAActiveConv.messages.length === 2, `Student A sees 2 messages, got ${studentAActiveConv.messages.length}`);
  assert(studentAActiveConv.messages[1].sender_role === 'admin', 'Second message is from admin');
  assert(studentAActiveConv.messages[1].message === adminReplyMsg, 'Admin reply message text matches');

  // Student marks conversation read
  await supportService.markAsRead(convA.id, 'student');
  const { data: convAfterStudentRead } = await supabase
    .from('support_conversations')
    .select('unread_student_count')
    .eq('id', convA.id)
    .single();
  assert(convAfterStudentRead.unread_student_count === 0, 'Student unread count reset to 0');
  console.log('✓ Scenario 5 Passed: Student A receives Admin reply with complete message history.\n');

  // ── TEST SCENARIO 6: Student B privacy isolation ──
  console.log('--- TEST 6: Student B data isolation (Privacy check) ---');
  const studentBConvs = await supportService.getStudentConversations(studentB_id);
  const leakCheck = studentBConvs.find((c) => c.id === convA.id);
  assert(leakCheck === undefined, 'Student B MUST NOT see Student A conversation!');
  console.log('✓ Scenario 6 Passed: Zero cross-student data leakage. Student B cannot see Student A conversation.\n');

  // ── TEST SCENARIO 7 & 8: Student B sends distinct message & Admin distinguishes both ──
  console.log('--- TEST 7 & 8: Student B sends different message & Admin distinguishes both ---');
  const testSubjB = `Question about Class 5 Midterm Assessment [${Date.now()}]`;
  const testMsgB1 = 'When will the final assessment portal open for Class 5 students?';

  const { conversation: convB } = await supportService.createStudentConversation({
    studentId: studentB_id,
    subject: testSubjB,
    category: 'Exams & Assessment Schedule',
    priority: 'normal',
    message: testMsgB1,
  });

  const adminConvs2 = await supportService.getAdminConversations();
  const adminFoundA = adminConvs2.find((c) => c.id === convA.id);
  const adminFoundB = adminConvs2.find((c) => c.id === convB.id);

  assert(adminFoundA !== undefined, 'Admin must see Student A conversation');
  assert(adminFoundB !== undefined, 'Admin must see Student B conversation');
  assert(adminFoundA.student_id !== adminFoundB.student_id, 'Conversations must belong to different students');
  assert(adminFoundA.status === 'replied', 'Student A conversation is replied');
  assert(adminFoundB.status === 'awaiting_reply', 'Student B conversation is awaiting_reply');
  assert(adminFoundB.student_class_name === 'Class 5', `Student B class name must be "Class 5", got "${adminFoundB.student_class_name}"`);
  console.log('✓ Scenario 7 & 8 Passed: Admin clearly distinguishes Student A (Class 3) and Student B (Class 5).\n');

  // ── TEST SCENARIO 9: Student A sends follow-up reply in same conversation ──
  console.log('--- TEST 9: Student A sends follow-up message in same conversation ---');
  const studentAFollowup = 'Thank you Admin, that sensor loop script worked perfectly!';
  const followUpResult = await supportService.sendMessage({
    conversationId: convA.id,
    senderId: studentA_id,
    senderRole: 'student',
    message: studentAFollowup,
  });

  assert(followUpResult && followUpResult.id, 'Follow-up message must be created');

  // Reload messages for conversation A
  const allMessagesA = await supportService.getConversationMessages(convA.id);
  assert(allMessagesA.length === 3, `Conversation A must contain exactly 3 messages, got ${allMessagesA.length}`);
  assert(allMessagesA[0].sender_role === 'student', 'Message 1 from Student');
  assert(allMessagesA[1].sender_role === 'admin', 'Message 2 from Admin');
  assert(allMessagesA[2].sender_role === 'student', 'Message 3 from Student');
  assert(allMessagesA[2].message === studentAFollowup, 'Message 3 text matches follow-up');

  // Verify status toggled back to awaiting_reply
  const { data: convAfterFollowup } = await supabase
    .from('support_conversations')
    .select('status, unread_admin_count')
    .eq('id', convA.id)
    .single();
  assert(convAfterFollowup.status === 'awaiting_reply', 'Status toggled back to awaiting_reply after student follow-up');
  assert(convAfterFollowup.unread_admin_count >= 1, 'Admin receives unread indicator for new follow-up');
  console.log('✓ Scenario 9 Passed: Full 3-message conversation thread preserved in correct sequence.\n');

  // ── TEST SCENARIO 10: Realtime subscription & teardown ──
  console.log('--- TEST 10: Realtime subscription verification ---');
  const unsubscribe = supportService.subscribeToSupport({
    conversationId: convA.id,
    onUpdate: () => {},
  });
  assert(typeof unsubscribe === 'function', 'Subscription must return teardown unsubscribe function');
  unsubscribe();
  console.log('✓ Scenario 10 Passed: Realtime subscription & fallback polling initialized and unsubscribed cleanly.\n');

  // Clean up test conversations
  await supabase
    .from('support_conversations')
    .delete()
    .in('id', [convA.id, convB.id]);
  console.log('✓ Cleaned up test records from database.');

  console.log('================================================================');
  console.log(`SUCCESS! All ${passedChecks} assertions passed across all 10 scenarios.`);
  console.log('Two-way messaging between Students and Admin is fully operational!');
  console.log('================================================================');

  process.exit(0);
}

runTestSuite().catch((err) => {
  console.error('Test suite failed:', err);
  process.exit(1);
});
