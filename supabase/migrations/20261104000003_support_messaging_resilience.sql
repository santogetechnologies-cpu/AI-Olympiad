-- ============================================================
-- SUPPORT MESSAGING POLICIES & PERMISSIONS UPDATE
-- Ensures smooth operation for authenticated and anon client calls
-- ============================================================

GRANT ALL ON TABLE public.support_conversations TO anon, authenticated, service_role, postgres;
GRANT ALL ON TABLE public.support_messages TO anon, authenticated, service_role, postgres;

-- Conversations RLS
DROP POLICY IF EXISTS "support_conv_select" ON public.support_conversations;
CREATE POLICY "support_conv_select" ON public.support_conversations
  FOR SELECT TO anon, authenticated
  USING (
    public.is_admin() OR
    student_id = auth.uid() OR
    auth.uid() IS NULL
  );

DROP POLICY IF EXISTS "support_conv_insert" ON public.support_conversations;
CREATE POLICY "support_conv_insert" ON public.support_conversations
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    public.is_admin() OR
    student_id = auth.uid() OR
    auth.uid() IS NULL
  );

DROP POLICY IF EXISTS "support_conv_update" ON public.support_conversations;
CREATE POLICY "support_conv_update" ON public.support_conversations
  FOR UPDATE TO anon, authenticated
  USING (
    public.is_admin() OR
    student_id = auth.uid() OR
    auth.uid() IS NULL
  )
  WITH CHECK (
    public.is_admin() OR
    student_id = auth.uid() OR
    auth.uid() IS NULL
  );

DROP POLICY IF EXISTS "support_conv_admin_delete" ON public.support_conversations;
CREATE POLICY "support_conv_admin_delete" ON public.support_conversations
  FOR DELETE TO anon, authenticated
  USING (public.is_admin() OR auth.uid() IS NULL);

-- Messages RLS
DROP POLICY IF EXISTS "support_msg_select" ON public.support_messages;
CREATE POLICY "support_msg_select" ON public.support_messages
  FOR SELECT TO anon, authenticated
  USING (
    public.is_admin() OR
    auth.uid() IS NULL OR
    EXISTS (
      SELECT 1 FROM public.support_conversations sc
      WHERE sc.id = support_messages.conversation_id AND sc.student_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "support_msg_insert" ON public.support_messages;
CREATE POLICY "support_msg_insert" ON public.support_messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "support_msg_update" ON public.support_messages;
CREATE POLICY "support_msg_update" ON public.support_messages
  FOR UPDATE TO anon, authenticated
  USING (true)
  WITH CHECK (true);

