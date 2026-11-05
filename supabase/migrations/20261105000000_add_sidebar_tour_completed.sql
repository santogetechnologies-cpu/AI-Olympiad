-- ============================================================
-- STUDENT SIDEBAR TOUR ONBOARDING PERSISTENCE
-- Adds sidebar_tour_completed column to public.profiles
-- and ensures authenticated students can update their tour state.
-- ============================================================

-- 1. Add sidebar_tour_completed column if not exists
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS sidebar_tour_completed BOOLEAN NOT NULL DEFAULT FALSE;

-- 2. Ensure RLS policy allows authenticated users to update their own profile
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own" ON public.profiles
FOR UPDATE
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- 3. Dedicated RPC function for atomic sidebar tour completion
CREATE OR REPLACE FUNCTION public.complete_sidebar_tour()
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
  SET sidebar_tour_completed = TRUE,
      updated_at = NOW()
  WHERE id = auth.uid();

  RETURN TRUE;
END;
$$;

GRANT EXECUTE ON FUNCTION public.complete_sidebar_tour() TO authenticated;

