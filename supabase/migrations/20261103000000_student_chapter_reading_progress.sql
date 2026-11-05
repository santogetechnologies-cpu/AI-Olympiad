-- ============================================================
-- STUDENT CHAPTER READING PROGRESS & LAST READ PAGE TRACKING
-- ============================================================

CREATE TABLE IF NOT EXISTS public.student_chapter_reading_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  grade_key TEXT NOT NULL,
  chapter_key TEXT NOT NULL,
  chapter_id UUID REFERENCES public.chapters(id) ON DELETE SET NULL,
  last_read_page INTEGER NOT NULL DEFAULT 1,
  total_pages INTEGER NOT NULL DEFAULT 1,
  completed_pages INTEGER[] NOT NULL DEFAULT '{}',
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  completion_percentage NUMERIC NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_student_grade_chapter UNIQUE (student_id, grade_key, chapter_key)
);

CREATE INDEX IF NOT EXISTS idx_scrp_student_lookup ON public.student_chapter_reading_progress(student_id, grade_key, chapter_key);
CREATE INDEX IF NOT EXISTS idx_scrp_student_id ON public.student_chapter_reading_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_scrp_org_id ON public.student_chapter_reading_progress(organization_id);

-- Enable RLS
ALTER TABLE public.student_chapter_reading_progress ENABLE ROW LEVEL SECURITY;

-- Policies for student_chapter_reading_progress
DROP POLICY IF EXISTS "scrp_student_all" ON public.student_chapter_reading_progress;
CREATE POLICY "scrp_student_all" ON public.student_chapter_reading_progress
  FOR ALL
  TO authenticated
  USING (student_id = auth.uid())
  WITH CHECK (student_id = auth.uid());

DROP POLICY IF EXISTS "scrp_admin_read" ON public.student_chapter_reading_progress;
CREATE POLICY "scrp_admin_read" ON public.student_chapter_reading_progress
  FOR SELECT
  TO authenticated
  USING (public.get_my_role() IN ('admin', 'academic_content_manager'));

DROP POLICY IF EXISTS "scrp_admin_update" ON public.student_chapter_reading_progress;
CREATE POLICY "scrp_admin_update" ON public.student_chapter_reading_progress
  FOR UPDATE
  TO authenticated
  USING (public.get_my_role() IN ('admin', 'academic_content_manager'));

-- Grant privileges
GRANT ALL ON TABLE public.student_chapter_reading_progress TO anon, authenticated, service_role, postgres;

-- ============================================================
-- STUDENT PAGE COMPLETIONS (INDIVIDUAL UNIQUE PAGE RECORDS)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.student_page_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  grade_key TEXT NOT NULL,
  chapter_key TEXT NOT NULL,
  page_number INTEGER NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_student_page_completion UNIQUE (student_id, grade_key, chapter_key, page_number)
);

CREATE INDEX IF NOT EXISTS idx_spc_lookup ON public.student_page_completions(student_id, grade_key, chapter_key);
CREATE INDEX IF NOT EXISTS idx_spc_student ON public.student_page_completions(student_id);
CREATE INDEX IF NOT EXISTS idx_spc_org_id ON public.student_page_completions(organization_id);

ALTER TABLE public.student_page_completions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "spc_student_all" ON public.student_page_completions;
CREATE POLICY "spc_student_all" ON public.student_page_completions
  FOR ALL
  TO authenticated
  USING (student_id = auth.uid())
  WITH CHECK (student_id = auth.uid());

DROP POLICY IF EXISTS "spc_admin_read" ON public.student_page_completions;
CREATE POLICY "spc_admin_read" ON public.student_page_completions
  FOR SELECT
  TO authenticated
  USING (public.get_my_role() IN ('admin', 'academic_content_manager'));

GRANT ALL ON TABLE public.student_page_completions TO anon, authenticated, service_role, postgres;


