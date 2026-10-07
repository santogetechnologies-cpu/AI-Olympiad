-- ============================================================
-- 1. ADD COLUMNS TO PROFILES FOR MUST_CHANGE_PASSWORD & STUDENT ID
-- ============================================================
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS must_change_password BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS student_id_number TEXT;

-- ============================================================
-- 2. SECURE RPC FUNCTION: admin_bulk_create_student
-- Creates auth.user, profile, user_role (student), and enrollment
-- ============================================================
CREATE OR REPLACE FUNCTION public.admin_bulk_create_student(
  p_email TEXT,
  p_password TEXT,
  p_full_name TEXT,
  p_phone TEXT DEFAULT NULL,
  p_student_id_number TEXT DEFAULT NULL,
  p_class_id UUID DEFAULT NULL,
  p_organization_id UUID DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, extensions, pg_temp
AS $$
DECLARE
  v_user_id UUID;
  v_role_id UUID;
  v_org_id UUID;
  v_encrypted_pw TEXT;
  v_subject_id UUID;
BEGIN
  -- Resolve organization_id
  v_org_id := p_organization_id;
  IF v_org_id IS NULL THEN
    SELECT organization_id INTO v_org_id FROM public.profiles WHERE id = auth.uid() LIMIT 1;
  END IF;
  IF v_org_id IS NULL THEN
    SELECT id INTO v_org_id FROM public.organizations ORDER BY created_at ASC LIMIT 1;
  END IF;

  -- Verify caller is admin or academic_content_manager
  IF auth.uid() IS NOT NULL THEN
    IF NOT EXISTS (
      SELECT 1 FROM public.user_roles ur
      JOIN public.roles r ON r.id = ur.role_id
      WHERE ur.user_id = auth.uid() AND r.name IN ('admin', 'academic_content_manager')
    ) THEN
      RAISE EXCEPTION 'Access denied: only administrators can create students';
    END IF;
  END IF;

  -- Validate email and password
  IF p_email IS NULL OR p_email = '' THEN
    RAISE EXCEPTION 'Email is required';
  END IF;
  IF p_password IS NULL OR length(p_password) < 6 THEN
    RAISE EXCEPTION 'Password must be at least 6 characters';
  END IF;

  -- Check if user already exists in auth.users
  SELECT id INTO v_user_id FROM auth.users WHERE lower(email) = lower(p_email) LIMIT 1;

  IF v_user_id IS NOT NULL THEN
    -- User already exists in auth.users, update profile & ensure student role
    UPDATE public.profiles
    SET
      full_name = COALESCE(NULLIF(p_full_name, ''), full_name),
      phone = COALESCE(p_phone, phone),
      student_id_number = COALESCE(p_student_id_number, student_id_number),
      organization_id = v_org_id,
      status = 'active',
      must_change_password = true,
      updated_at = NOW()
    WHERE id = v_user_id;
  ELSE
    -- Generate new UUID for user
    v_user_id := gen_random_uuid();
    v_encrypted_pw := extensions.crypt(p_password, extensions.gen_salt('bf'));

    -- Insert into auth.users
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_user_meta_data,
      raw_app_meta_data,
      role,
      aud,
      created_at,
      updated_at
    )
    VALUES (
      v_user_id,
      '00000000-0000-0000-0000-000000000000',
      lower(p_email),
      v_encrypted_pw,
      NOW(),
      jsonb_build_object(
        'full_name', p_full_name,
        'organization_id', v_org_id,
        'student_id_number', p_student_id_number,
        'phone', p_phone
      ),
      jsonb_build_object('provider', 'email', 'providers', ARRAY['email']),
      'authenticated',
      'authenticated',
      NOW(),
      NOW()
    );

    -- Insert into auth.identities
    INSERT INTO auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      provider_id,
      last_sign_in_at,
      created_at,
      updated_at
    )
    VALUES (
      gen_random_uuid(),
      v_user_id,
      jsonb_build_object('sub', v_user_id::TEXT, 'email', lower(p_email)),
      'email',
      v_user_id::TEXT,
      NOW(),
      NOW(),
      NOW()
    )
    ON CONFLICT (provider, provider_id) DO NOTHING;

    -- Insert or update profile with must_change_password = true
    INSERT INTO public.profiles (
      id,
      organization_id,
      full_name,
      email,
      phone,
      student_id_number,
      status,
      must_change_password
    )
    VALUES (
      v_user_id,
      v_org_id,
      COALESCE(p_full_name, split_part(p_email, '@', 1)),
      lower(p_email),
      p_phone,
      p_student_id_number,
      'active',
      true
    )
    ON CONFLICT (id) DO UPDATE SET
      full_name = EXCLUDED.full_name,
      phone = EXCLUDED.phone,
      student_id_number = EXCLUDED.student_id_number,
      organization_id = EXCLUDED.organization_id,
      status = 'active',
      must_change_password = true;
  END IF;

  -- Assign student role
  SELECT id INTO v_role_id FROM public.roles WHERE name = 'student' LIMIT 1;
  IF v_role_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role_id, organization_id)
    VALUES (v_user_id, v_role_id, v_org_id)
    ON CONFLICT (user_id, role_id, organization_id) DO UPDATE SET role_id = v_role_id;
  END IF;

  -- Enroll in class and its subject if class_id provided
  IF p_class_id IS NOT NULL THEN
    SELECT id INTO v_subject_id FROM public.subjects WHERE class_id = p_class_id LIMIT 1;

    INSERT INTO public.enrollments (organization_id, student_id, class_id, subject_id, status)
    VALUES (v_org_id, v_user_id, p_class_id, v_subject_id, 'active')
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'user_id', v_user_id,
    'email', lower(p_email),
    'full_name', p_full_name,
    'status', 'active',
    'must_change_password', true
  );
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object(
    'success', false,
    'error', SQLERRM,
    'email', p_email
  );
END;
$$;
