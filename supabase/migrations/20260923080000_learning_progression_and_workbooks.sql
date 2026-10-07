-- ============================================================
-- WORKBOOK SUBMISSIONS & PROGRESSION ENHANCEMENTS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.workbook_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  chapter_content_id UUID NOT NULL REFERENCES public.chapter_content(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  responses JSONB NOT NULL DEFAULT '{}'::jsonb,
  file_url TEXT,
  feedback TEXT,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('draft', 'submitted', 'reviewed')),
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(chapter_content_id, student_id)
);

CREATE INDEX IF NOT EXISTS idx_workbook_submissions_student_id ON public.workbook_submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_workbook_submissions_content_id ON public.workbook_submissions(chapter_content_id);
CREATE INDEX IF NOT EXISTS idx_workbook_submissions_org_id ON public.workbook_submissions(organization_id);

-- Enable RLS
ALTER TABLE public.workbook_submissions ENABLE ROW LEVEL SECURITY;

-- Policies for workbook_submissions
DROP POLICY IF EXISTS "workbook_student_all" ON public.workbook_submissions;
CREATE POLICY "workbook_student_all" ON public.workbook_submissions FOR ALL USING (
  student_id = auth.uid()
);

DROP POLICY IF EXISTS "workbook_admin_read" ON public.workbook_submissions;
CREATE POLICY "workbook_admin_read" ON public.workbook_submissions FOR SELECT USING (
  public.get_my_role() IN ('admin', 'academic_content_manager')
);

DROP POLICY IF EXISTS "workbook_admin_update" ON public.workbook_submissions;
CREATE POLICY "workbook_admin_update" ON public.workbook_submissions FOR UPDATE USING (
  public.get_my_role() IN ('admin', 'academic_content_manager')
);

-- Grant table privileges
GRANT ALL ON TABLE public.workbook_submissions TO anon, authenticated, service_role, postgres;
