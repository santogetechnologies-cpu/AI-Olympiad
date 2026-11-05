-- ============================================================
-- AUTO-RESOLVE STUDENT CLASS NAME ON SUPPORT CONVERSATIONS
-- Uses SECURITY DEFINER trigger to populate class name reliably
-- ============================================================

ALTER TABLE public.support_conversations 
ADD COLUMN IF NOT EXISTS student_class_name TEXT;

CREATE OR REPLACE FUNCTION public.set_support_conversation_details()
RETURNS TRIGGER AS $$
DECLARE
  v_class_name TEXT;
BEGIN
  -- 1. Auto-set organization_id if null
  IF NEW.organization_id IS NULL THEN
    SELECT organization_id INTO NEW.organization_id FROM public.profiles WHERE id = NEW.student_id;
  END IF;
  IF NEW.organization_id IS NULL THEN
    SELECT id INTO NEW.organization_id FROM public.organizations ORDER BY created_at ASC LIMIT 1;
  END IF;

  -- 2. Auto-resolve student enrolled class name
  IF NEW.student_class_name IS NULL OR NEW.student_class_name = '' THEN
    SELECT c.name INTO v_class_name
    FROM public.enrollments e
    JOIN public.classes c ON c.id = e.class_id
    WHERE e.student_id = NEW.student_id
    ORDER BY e.created_at DESC
    LIMIT 1;

    NEW.student_class_name := COALESCE(v_class_name, 'Enrolled Student');
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_set_support_conversation_org ON public.support_conversations;
DROP TRIGGER IF EXISTS trg_set_support_conversation_details ON public.support_conversations;

CREATE TRIGGER trg_set_support_conversation_details
  BEFORE INSERT ON public.support_conversations
  FOR EACH ROW EXECUTE FUNCTION public.set_support_conversation_details();

