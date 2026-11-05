-- ============================================================
-- SUPPORT MESSAGING SYSTEM (CONVERSATIONS & MESSAGES)
-- Two-way communication between Students and Admin
-- ============================================================

-- Helper function: is_admin (checks user_roles securely)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles ur
    JOIN public.roles r ON r.id = ur.role_id
    WHERE ur.user_id = auth.uid()
      AND r.name IN ('admin', 'academic_content_manager')
  );
END;
$$;

-- 1. SUPPORT CONVERSATIONS TABLE
CREATE TABLE IF NOT EXISTS public.support_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General Inquiry',
  priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('normal', 'high', 'urgent')),
  status TEXT NOT NULL DEFAULT 'awaiting_reply' CHECK (status IN ('awaiting_reply', 'reviewing', 'replied', 'resolved')),
  unread_student_count INTEGER NOT NULL DEFAULT 0,
  unread_admin_count INTEGER NOT NULL DEFAULT 1,
  last_message_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_message_preview TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. SUPPORT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.support_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.support_conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  sender_role TEXT NOT NULL CHECK (sender_role IN ('student', 'admin')),
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. INDEXES
CREATE INDEX IF NOT EXISTS idx_support_conv_student ON public.support_conversations(student_id);
CREATE INDEX IF NOT EXISTS idx_support_conv_org ON public.support_conversations(organization_id);
CREATE INDEX IF NOT EXISTS idx_support_conv_status ON public.support_conversations(status);
CREATE INDEX IF NOT EXISTS idx_support_conv_last_msg ON public.support_conversations(last_message_at DESC);

CREATE INDEX IF NOT EXISTS idx_support_msg_conv ON public.support_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_support_msg_sender ON public.support_messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_support_msg_created ON public.support_messages(created_at ASC);

-- 4. AUTO-SET ORG TRIGGER
CREATE OR REPLACE FUNCTION public.set_support_conversation_org()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.organization_id IS NULL THEN
    SELECT organization_id INTO NEW.organization_id FROM public.profiles WHERE id = NEW.student_id;
  END IF;
  IF NEW.organization_id IS NULL THEN
    SELECT id INTO NEW.organization_id FROM public.organizations ORDER BY created_at ASC LIMIT 1;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_set_support_conversation_org ON public.support_conversations;
CREATE TRIGGER trg_set_support_conversation_org
  BEFORE INSERT ON public.support_conversations
  FOR EACH ROW EXECUTE FUNCTION public.set_support_conversation_org();

-- 5. AUTO UPDATE TRIGGER FOR CONVERSATIONS ON NEW MESSAGE
CREATE OR REPLACE FUNCTION public.handle_new_support_message()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.sender_role = 'student' THEN
    UPDATE public.support_conversations
    SET
      status = 'awaiting_reply',
      last_message_at = NEW.created_at,
      last_message_preview = LEFT(NEW.message, 140),
      unread_admin_count = unread_admin_count + 1,
      updated_at = NOW()
    WHERE id = NEW.conversation_id;
  ELSIF NEW.sender_role = 'admin' THEN
    UPDATE public.support_conversations
    SET
      status = 'replied',
      last_message_at = NEW.created_at,
      last_message_preview = LEFT(NEW.message, 140),
      unread_student_count = unread_student_count + 1,
      updated_at = NOW()
    WHERE id = NEW.conversation_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_support_message_created ON public.support_messages;
CREATE TRIGGER trg_support_message_created
  AFTER INSERT ON public.support_messages
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_support_message();

-- 6. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.support_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_messages ENABLE ROW LEVEL SECURITY;

-- Conversations RLS
DROP POLICY IF EXISTS "support_conv_select" ON public.support_conversations;
CREATE POLICY "support_conv_select" ON public.support_conversations
  FOR SELECT TO authenticated
  USING (student_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "support_conv_insert" ON public.support_conversations;
CREATE POLICY "support_conv_insert" ON public.support_conversations
  FOR INSERT TO authenticated
  WITH CHECK (student_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "support_conv_update" ON public.support_conversations;
CREATE POLICY "support_conv_update" ON public.support_conversations
  FOR UPDATE TO authenticated
  USING (student_id = auth.uid() OR public.is_admin())
  WITH CHECK (student_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "support_conv_admin_delete" ON public.support_conversations;
CREATE POLICY "support_conv_admin_delete" ON public.support_conversations
  FOR DELETE TO authenticated
  USING (public.is_admin());

-- Messages RLS
DROP POLICY IF EXISTS "support_msg_select" ON public.support_messages;
CREATE POLICY "support_msg_select" ON public.support_messages
  FOR SELECT TO authenticated
  USING (
    public.is_admin() OR
    EXISTS (
      SELECT 1 FROM public.support_conversations sc
      WHERE sc.id = support_messages.conversation_id AND sc.student_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "support_msg_insert" ON public.support_messages;
CREATE POLICY "support_msg_insert" ON public.support_messages
  FOR INSERT TO authenticated
  WITH CHECK (
    (
      sender_id = auth.uid() AND
      sender_role = 'student' AND
      EXISTS (
        SELECT 1 FROM public.support_conversations sc
        WHERE sc.id = conversation_id AND sc.student_id = auth.uid()
      )
    ) OR (
      public.is_admin() AND
      sender_role = 'admin'
    )
  );

DROP POLICY IF EXISTS "support_msg_update" ON public.support_messages;
CREATE POLICY "support_msg_update" ON public.support_messages
  FOR UPDATE TO authenticated
  USING (
    public.is_admin() OR
    EXISTS (
      SELECT 1 FROM public.support_conversations sc
      WHERE sc.id = support_messages.conversation_id AND sc.student_id = auth.uid()
    )
  )
  WITH CHECK (
    public.is_admin() OR
    EXISTS (
      SELECT 1 FROM public.support_conversations sc
      WHERE sc.id = support_messages.conversation_id AND sc.student_id = auth.uid()
    )
  );

-- 7. REALTIME REPLICATION (ADD TO PUBLICATION)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND tablename = 'support_conversations'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.support_conversations;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND tablename = 'support_messages'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.support_messages;
  END IF;
EXCEPTION WHEN OTHERS THEN
  NULL;
END;
$$;

-- 8. GRANTS
GRANT ALL ON TABLE public.support_conversations TO authenticated, service_role, postgres;
GRANT ALL ON TABLE public.support_messages TO authenticated, service_role, postgres;

