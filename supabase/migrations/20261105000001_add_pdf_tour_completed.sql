-- ============================================================
-- STUDENT PDF TOOLBAR TOUR ONBOARDING PERSISTENCE
-- Adds pdf_tour_completed column to public.profiles
-- and creates complete_pdf_tour() atomic RPC function
-- ============================================================

-- 1. Add pdf_tour_completed column if not exists
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS pdf_tour_completed BOOLEAN NOT NULL DEFAULT FALSE;

-- 2. Dedicated RPC function for atomic pdf tour completion
CREATE OR REPLACE FUNCTION public.complete_pdf_tour()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, extensions, pg_temp
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  UPDATE public.profiles
  SET pdf_tour_completed = TRUE,
      updated_at = NOW()
  WHERE id = auth.uid();

  -- Also update student_tutorial_progress if available
  BEGIN
    INSERT INTO public.student_tutorial_progress (
      student_id,
      tour_id,
      completed,
      last_step,
      completed_at,
      updated_at
    )
    VALUES (
      auth.uid(),
      'pdf_studio_tour',
      TRUE,
      9,
      NOW(),
      NOW()
    )
    ON CONFLICT (student_id, tour_id)
    DO UPDATE SET
      completed = TRUE,
      completed_at = NOW(),
      updated_at = NOW();
  EXCEPTION WHEN OTHERS THEN
    -- Fallback safe
  END;

  RETURN TRUE;
END;
$$;

GRANT EXECUTE ON FUNCTION public.complete_pdf_tour() TO authenticated;

