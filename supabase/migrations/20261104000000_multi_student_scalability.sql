-- ============================================================
-- MULTI-STUDENT SCALABILITY & CONCURRENCY ISOLATION
-- Supports 1,000+ concurrent students with zero cross-contamination
-- Tables: student_annotations, student_notes, student_tutorial_progress
-- ============================================================

-- 1. STUDENT ANNOTATIONS (Drawings, fills, stickers, blanks, circled items)
CREATE TABLE IF NOT EXISTS public.student_annotations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  book_key TEXT NOT NULL,
  page_number INTEGER NOT NULL,
  strokes JSONB NOT NULL DEFAULT '[]'::jsonb,
  fill_data TEXT,
  stickers JSONB NOT NULL DEFAULT '[]'::jsonb,
  image_offsets JSONB NOT NULL DEFAULT '{}'::jsonb,
  typed_blanks JSONB NOT NULL DEFAULT '{}'::jsonb,
  circled_items JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_student_page_annotation UNIQUE (student_id, book_key, page_number)
);

CREATE INDEX IF NOT EXISTS idx_sa_lookup ON public.student_annotations(student_id, book_key, page_number);
CREATE INDEX IF NOT EXISTS idx_sa_student_id ON public.student_annotations(student_id);
CREATE INDEX IF NOT EXISTS idx_sa_org_id ON public.student_annotations(organization_id);

ALTER TABLE public.student_annotations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "sa_student_all" ON public.student_annotations;
CREATE POLICY "sa_student_all" ON public.student_annotations
  FOR ALL
  TO authenticated
  USING (student_id = auth.uid())
  WITH CHECK (student_id = auth.uid());

DROP POLICY IF EXISTS "sa_admin_read" ON public.student_annotations;
CREATE POLICY "sa_admin_read" ON public.student_annotations
  FOR SELECT
  TO authenticated
  USING (public.get_my_role() IN ('admin', 'academic_content_manager'));

GRANT ALL ON TABLE public.student_annotations TO anon, authenticated, service_role, postgres;


-- 2. STUDENT NOTES (Typed sticky notes & margins per page)
CREATE TABLE IF NOT EXISTS public.student_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  book_key TEXT NOT NULL,
  page_number INTEGER NOT NULL,
  notes JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_student_page_notes UNIQUE (student_id, book_key, page_number)
);

CREATE INDEX IF NOT EXISTS idx_sn_lookup ON public.student_notes(student_id, book_key, page_number);
CREATE INDEX IF NOT EXISTS idx_sn_student_id ON public.student_notes(student_id);
CREATE INDEX IF NOT EXISTS idx_sn_org_id ON public.student_notes(organization_id);

ALTER TABLE public.student_notes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "sn_student_all" ON public.student_notes;
CREATE POLICY "sn_student_all" ON public.student_notes
  FOR ALL
  TO authenticated
  USING (student_id = auth.uid())
  WITH CHECK (student_id = auth.uid());

DROP POLICY IF EXISTS "sn_admin_read" ON public.student_notes;
CREATE POLICY "sn_admin_read" ON public.student_notes
  FOR SELECT
  TO authenticated
  USING (public.get_my_role() IN ('admin', 'academic_content_manager'));

GRANT ALL ON TABLE public.student_notes TO anon, authenticated, service_role, postgres;


-- 3. STUDENT TUTORIAL PROGRESS (Spotlight onboarding tour state)
CREATE TABLE IF NOT EXISTS public.student_tutorial_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  tour_id TEXT NOT NULL DEFAULT 'pdf_studio_tour',
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  last_step INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_student_tutorial UNIQUE (student_id, tour_id)
);

CREATE INDEX IF NOT EXISTS idx_stp_lookup ON public.student_tutorial_progress(student_id, tour_id);
CREATE INDEX IF NOT EXISTS idx_stp_student_id ON public.student_tutorial_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_stp_org_id ON public.student_tutorial_progress(organization_id);

ALTER TABLE public.student_tutorial_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "stp_student_all" ON public.student_tutorial_progress;
CREATE POLICY "stp_student_all" ON public.student_tutorial_progress
  FOR ALL
  TO authenticated
  USING (student_id = auth.uid())
  WITH CHECK (student_id = auth.uid());

DROP POLICY IF EXISTS "stp_admin_read" ON public.student_tutorial_progress;
CREATE POLICY "stp_admin_read" ON public.student_tutorial_progress
  FOR SELECT
  TO authenticated
  USING (public.get_my_role() IN ('admin', 'academic_content_manager'));

GRANT ALL ON TABLE public.student_tutorial_progress TO anon, authenticated, service_role, postgres;

