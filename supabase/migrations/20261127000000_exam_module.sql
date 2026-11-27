-- ============================================================
-- EXAM MODULE (MULTIPLE CHOICE)
-- Admin creates fully customizable MCQ exams; students take them;
-- grading happens server-side so answer keys never reach students.
-- ============================================================

-- 1. EXAMS
CREATE TABLE IF NOT EXISTS public.exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  class_id UUID REFERENCES public.classes(id) ON DELETE SET NULL, -- NULL = all students
  title TEXT NOT NULL,
  description TEXT,
  instructions TEXT,
  total_marks NUMERIC NOT NULL DEFAULT 100 CHECK (total_marks > 0),
  duration_minutes INTEGER CHECK (duration_minutes IS NULL OR duration_minutes > 0), -- NULL = untimed
  pass_percentage NUMERIC NOT NULL DEFAULT 40 CHECK (pass_percentage BETWEEN 0 AND 100),
  negative_marking NUMERIC NOT NULL DEFAULT 0 CHECK (negative_marking >= 0), -- fraction of question marks deducted per wrong answer
  max_attempts INTEGER NOT NULL DEFAULT 1 CHECK (max_attempts >= 1),
  shuffle_questions BOOLEAN NOT NULL DEFAULT false,
  shuffle_options BOOLEAN NOT NULL DEFAULT false,
  show_answers_in_review BOOLEAN NOT NULL DEFAULT true,
  results_visibility TEXT NOT NULL DEFAULT 'immediate'
    CHECK (results_visibility IN ('immediate', 'after_end', 'manual')),
  results_published BOOLEAN NOT NULL DEFAULT false,
  start_at TIMESTAMPTZ,
  end_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'closed')),
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. QUESTIONS (no answer key here: students may read this table)
CREATE TABLE IF NOT EXISTS public.exam_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  options JSONB NOT NULL DEFAULT '[]'::jsonb, -- array of strings
  marks NUMERIC NOT NULL DEFAULT 1 CHECK (marks >= 0),
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. ANSWER KEYS (admin only)
CREATE TABLE IF NOT EXISTS public.exam_answer_keys (
  question_id UUID PRIMARY KEY REFERENCES public.exam_questions(id) ON DELETE CASCADE,
  exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  correct_option INTEGER NOT NULL CHECK (correct_option >= 0),
  explanation TEXT
);

-- 4. ATTEMPTS
CREATE TABLE IF NOT EXISTS public.exam_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb, -- { question_id: option_index }
  score NUMERIC NOT NULL DEFAULT 0,
  total_marks NUMERIC NOT NULL DEFAULT 0,
  percentage NUMERIC NOT NULL DEFAULT 0,
  correct_count INTEGER NOT NULL DEFAULT 0,
  wrong_count INTEGER NOT NULL DEFAULT 0,
  unanswered_count INTEGER NOT NULL DEFAULT 0,
  passed BOOLEAN NOT NULL DEFAULT false,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  time_taken_seconds INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_exams_org ON public.exams(organization_id);
CREATE INDEX IF NOT EXISTS idx_exams_status ON public.exams(status);
CREATE INDEX IF NOT EXISTS idx_exam_questions_exam ON public.exam_questions(exam_id, display_order);
CREATE INDEX IF NOT EXISTS idx_exam_answer_keys_exam ON public.exam_answer_keys(exam_id);
CREATE INDEX IF NOT EXISTS idx_exam_attempts_exam ON public.exam_attempts(exam_id);
CREATE INDEX IF NOT EXISTS idx_exam_attempts_student ON public.exam_attempts(student_id);

-- 5. HELPERS
CREATE OR REPLACE FUNCTION public.exam_is_visible_to_student(p_exam public.exams)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT p_exam.status IN ('published', 'closed')
    AND (
      p_exam.class_id IS NULL
      OR EXISTS (
        SELECT 1 FROM public.enrollments e
        WHERE e.student_id = auth.uid()
          AND e.class_id = p_exam.class_id
          AND e.status IN ('active', 'completed')
      )
    );
$$;

CREATE OR REPLACE FUNCTION public.exam_results_visible(p_exam public.exams)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT CASE p_exam.results_visibility
    WHEN 'immediate' THEN true
    WHEN 'after_end' THEN p_exam.status = 'closed' OR (p_exam.end_at IS NOT NULL AND NOW() >= p_exam.end_at)
    ELSE p_exam.results_published
  END;
$$;

CREATE OR REPLACE FUNCTION public.touch_exam_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_exams_updated_at ON public.exams;
CREATE TRIGGER trg_exams_updated_at
  BEFORE UPDATE ON public.exams
  FOR EACH ROW EXECUTE FUNCTION public.touch_exam_updated_at();

-- 6. RLS
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_answer_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "exams_admin_all" ON public.exams;
CREATE POLICY "exams_admin_all" ON public.exams
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "exams_student_select" ON public.exams;
CREATE POLICY "exams_student_select" ON public.exams
  FOR SELECT TO authenticated
  USING (public.exam_is_visible_to_student(exams));

DROP POLICY IF EXISTS "exam_questions_admin_all" ON public.exam_questions;
CREATE POLICY "exam_questions_admin_all" ON public.exam_questions
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "exam_questions_student_select" ON public.exam_questions;
CREATE POLICY "exam_questions_student_select" ON public.exam_questions
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.exams x
    WHERE x.id = exam_questions.exam_id AND public.exam_is_visible_to_student(x)
  ));

DROP POLICY IF EXISTS "exam_answer_keys_admin_all" ON public.exam_answer_keys;
CREATE POLICY "exam_answer_keys_admin_all" ON public.exam_answer_keys
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "exam_attempts_admin_all" ON public.exam_attempts;
CREATE POLICY "exam_attempts_admin_all" ON public.exam_attempts
  FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Students have no direct access to exam_attempts: they submit through
-- submit_exam_attempt() and read through get_my_exam_attempts(), which hides
-- scores until the exam's results are visible.

-- 7. SUBMIT + GRADE (server side). Returns only the attempt id so scores
-- never reach the student before results are visible.
CREATE OR REPLACE FUNCTION public.submit_exam_attempt(
  p_exam_id UUID,
  p_answers JSONB,
  p_started_at TIMESTAMPTZ DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_exam public.exams;
  v_attempt_id UUID;
  v_used INTEGER;
  v_q RECORD;
  v_choice TEXT;
  v_score NUMERIC := 0;
  v_total NUMERIC := 0;
  v_correct INTEGER := 0;
  v_wrong INTEGER := 0;
  v_unanswered INTEGER := 0;
  v_pct NUMERIC := 0;
  v_started TIMESTAMPTZ := COALESCE(p_started_at, NOW());
  v_org UUID;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT * INTO v_exam FROM public.exams WHERE id = p_exam_id;
  IF NOT FOUND OR v_exam.status <> 'published' OR NOT public.exam_is_visible_to_student(v_exam) THEN
    RAISE EXCEPTION 'This exam is not open';
  END IF;
  IF v_exam.start_at IS NOT NULL AND NOW() < v_exam.start_at THEN
    RAISE EXCEPTION 'This exam has not started yet';
  END IF;
  -- small grace period for in-flight submissions
  IF v_exam.end_at IS NOT NULL AND NOW() > v_exam.end_at + INTERVAL '2 minutes' THEN
    RAISE EXCEPTION 'This exam window has closed';
  END IF;

  SELECT COUNT(*) INTO v_used FROM public.exam_attempts
  WHERE exam_id = p_exam_id AND student_id = auth.uid();
  IF v_used >= v_exam.max_attempts THEN
    RAISE EXCEPTION 'No attempts remaining for this exam';
  END IF;

  IF v_started > NOW() OR v_started < NOW() - INTERVAL '2 days' THEN
    v_started := NOW();
  END IF;

  FOR v_q IN
    SELECT q.id, q.marks, k.correct_option
    FROM public.exam_questions q
    LEFT JOIN public.exam_answer_keys k ON k.question_id = q.id
    WHERE q.exam_id = p_exam_id
  LOOP
    v_total := v_total + v_q.marks;
    v_choice := p_answers ->> v_q.id::text;
    IF v_choice IS NULL OR v_choice = '' THEN
      v_unanswered := v_unanswered + 1;
    ELSIF v_q.correct_option IS NOT NULL AND v_choice ~ '^\d+$' AND v_choice::INTEGER = v_q.correct_option THEN
      v_correct := v_correct + 1;
      v_score := v_score + v_q.marks;
    ELSE
      v_wrong := v_wrong + 1;
      v_score := v_score - (v_q.marks * v_exam.negative_marking);
    END IF;
  END LOOP;

  IF v_score < 0 THEN v_score := 0; END IF;
  IF v_total > 0 THEN v_pct := ROUND((v_score / v_total) * 100, 2); END IF;

  SELECT organization_id INTO v_org FROM public.profiles WHERE id = auth.uid();

  INSERT INTO public.exam_attempts (
    exam_id, student_id, organization_id, answers, score, total_marks, percentage,
    correct_count, wrong_count, unanswered_count, passed, started_at, submitted_at, time_taken_seconds
  ) VALUES (
    p_exam_id, auth.uid(), COALESCE(v_org, v_exam.organization_id), COALESCE(p_answers, '{}'::jsonb),
    ROUND(v_score, 2), v_total, v_pct, v_correct, v_wrong, v_unanswered,
    v_pct >= v_exam.pass_percentage, v_started, NOW(),
    GREATEST(0, EXTRACT(EPOCH FROM (NOW() - v_started))::INTEGER)
  )
  RETURNING id INTO v_attempt_id;

  RETURN v_attempt_id;
END;
$$;

-- 8. REVIEW: answer key for a student's own attempt, once results are visible
CREATE OR REPLACE FUNCTION public.get_exam_attempt_review(p_attempt_id UUID)
RETURNS TABLE (
  question_id UUID,
  question_text TEXT,
  options JSONB,
  marks NUMERIC,
  display_order INTEGER,
  selected_option INTEGER,
  correct_option INTEGER,
  explanation TEXT
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_attempt public.exam_attempts;
  v_exam public.exams;
  v_can_see_key BOOLEAN;
BEGIN
  SELECT * INTO v_attempt FROM public.exam_attempts WHERE id = p_attempt_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Attempt not found'; END IF;
  SELECT * INTO v_exam FROM public.exams WHERE id = v_attempt.exam_id;

  IF public.is_admin() THEN
    v_can_see_key := true;
  ELSIF v_attempt.student_id = auth.uid() THEN
    IF NOT public.exam_results_visible(v_exam) THEN
      RAISE EXCEPTION 'Results are not published yet';
    END IF;
    v_can_see_key := v_exam.show_answers_in_review;
  ELSE
    RAISE EXCEPTION 'Not allowed';
  END IF;

  RETURN QUERY
  SELECT q.id, q.question_text, q.options, q.marks, q.display_order,
    CASE WHEN (v_attempt.answers ->> q.id::text) ~ '^\d+$'
      THEN (v_attempt.answers ->> q.id::text)::INTEGER END,
    CASE WHEN v_can_see_key THEN k.correct_option END,
    CASE WHEN v_can_see_key THEN k.explanation END
  FROM public.exam_questions q
  LEFT JOIN public.exam_answer_keys k ON k.question_id = q.id
  WHERE q.exam_id = v_attempt.exam_id
  ORDER BY q.display_order;
END;
$$;

-- A student's own attempts, with score fields hidden until results are visible.
CREATE OR REPLACE FUNCTION public.get_my_exam_attempts()
RETURNS TABLE (
  id UUID,
  exam_id UUID,
  score NUMERIC,
  total_marks NUMERIC,
  percentage NUMERIC,
  correct_count INTEGER,
  wrong_count INTEGER,
  unanswered_count INTEGER,
  passed BOOLEAN,
  started_at TIMESTAMPTZ,
  submitted_at TIMESTAMPTZ,
  time_taken_seconds INTEGER,
  results_visible BOOLEAN
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT a.id, a.exam_id,
    CASE WHEN v.ok THEN a.score END,
    a.total_marks,
    CASE WHEN v.ok THEN a.percentage END,
    CASE WHEN v.ok THEN a.correct_count END,
    CASE WHEN v.ok THEN a.wrong_count END,
    CASE WHEN v.ok THEN a.unanswered_count END,
    CASE WHEN v.ok THEN a.passed END,
    a.started_at, a.submitted_at, a.time_taken_seconds, v.ok
  FROM public.exam_attempts a
  JOIN public.exams x ON x.id = a.exam_id
  CROSS JOIN LATERAL (SELECT public.exam_results_visible(x) AS ok) v
  WHERE a.student_id = auth.uid()
  ORDER BY a.submitted_at DESC;
$$;

GRANT EXECUTE ON FUNCTION public.submit_exam_attempt(UUID, JSONB, TIMESTAMPTZ) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_exam_attempt_review(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_my_exam_attempts() TO authenticated;
