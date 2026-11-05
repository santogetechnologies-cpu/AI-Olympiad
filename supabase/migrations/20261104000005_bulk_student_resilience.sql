-- ============================================================
-- BULK STUDENT RESILIENCE & MULTI-CLASS IMPORT ENHANCEMENT
-- Prevents duplicate phone violation on auth.users while storing
-- student phone in public.profiles. Supports per-student class assignment.
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
  v_clean_email TEXT;
  v_clean_phone TEXT;
  v_auth_phone TEXT;
BEGIN
  -- Normalize inputs
  v_clean_email := lower(trim(p_email));
  v_clean_phone := NULLIF(trim(p_phone), '');

  -- Resolve organization_id
  v_org_id := p_organization_id;
  IF v_org_id IS NULL AND auth.uid() IS NOT NULL THEN
    SELECT organization_id INTO v_org_id FROM public.profiles WHERE id = auth.uid() LIMIT 1;
  END IF;
  IF v_org_id IS NULL THEN
    SELECT id INTO v_org_id FROM public.organizations ORDER BY created_at ASC LIMIT 1;
  END IF;

  -- Verify caller is admin or academic_content_manager if authenticated
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
  IF v_clean_email IS NULL OR v_clean_email = '' THEN
    RAISE EXCEPTION 'Email is required';
  END IF;
  IF p_password IS NULL OR length(p_password) < 6 THEN
    RAISE EXCEPTION 'Password must be at least 6 characters';
  END IF;

  -- Check if user already exists in auth.users
  SELECT id INTO v_user_id FROM auth.users WHERE lower(email) = v_clean_email LIMIT 1;

  IF v_user_id IS NOT NULL THEN
    -- User already exists, update profile
    UPDATE public.profiles
    SET
      full_name = COALESCE(NULLIF(trim(p_full_name), ''), full_name),
      phone = COALESCE(v_clean_phone, phone),
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

    -- Determine safe auth.users phone: if phone is already registered to another user,
    -- leave auth.users.phone as NULL to avoid unique constraint collision.
    -- The student's phone is preserved in public.profiles.phone and raw_user_meta_data.
    IF v_clean_phone IS NOT NULL AND NOT EXISTS (SELECT 1 FROM auth.users WHERE phone = v_clean_phone) THEN
      v_auth_phone := v_clean_phone;
    ELSE
      v_auth_phone := NULL;
    END IF;

    -- Insert into auth.users with complete GoTrue token fields
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      invited_at,
      confirmation_token,
      confirmation_sent_at,
      recovery_token,
      recovery_sent_at,
      email_change_token_new,
      email_change,
      email_change_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      created_at,
      updated_at,
      phone,
      phone_confirmed_at,
      phone_change,
      phone_change_token,
      phone_change_sent_at,
      email_change_token_current,
      email_change_confirm_status,
      banned_until,
      reauthentication_token,
      reauthentication_sent_at,
      is_sso_user,
      deleted_at,
      is_anonymous,
      role,
      aud
    )
    VALUES (
      v_user_id,
      '00000000-0000-0000-0000-000000000000',
      v_clean_email,
      v_encrypted_pw,
      NOW(),
      NULL,
      '',
      NULL,
      '',
      NULL,
      '',
      '',
      NULL,
      NULL,
      jsonb_build_object('provider', 'email', 'providers', ARRAY['email']),
      jsonb_build_object(
        'full_name', p_full_name,
        'organization_id', v_org_id,
        'student_id_number', p_student_id_number,
        'phone', v_clean_phone
      ),
      false,
      NOW(),
      NOW(),
      v_auth_phone,
      CASE WHEN v_auth_phone IS NOT NULL THEN NOW() ELSE NULL END,
      '',
      '',
      NULL,
      '',
      0,
      NULL,
      '',
      NULL,
      false,
      NULL,
      false,
      'authenticated',
      'authenticated'
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
      jsonb_build_object('sub', v_user_id::TEXT, 'email', v_clean_email),
      'email',
      v_user_id::TEXT,
      NOW(),
      NOW(),
      NOW()
    )
    ON CONFLICT (provider, provider_id) DO NOTHING;

    -- Insert profile
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
      COALESCE(NULLIF(trim(p_full_name), ''), split_part(v_clean_email, '@', 1)),
      v_clean_email,
      v_clean_phone,
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

  -- Strip any admin or academic_content_manager role accidentally assigned by handle_new_user trigger
  DELETE FROM public.user_roles ur
  USING public.roles r
  WHERE ur.role_id = r.id
    AND ur.user_id = v_user_id
    AND r.name IN ('admin', 'academic_content_manager');

  -- Assign student role
  SELECT id INTO v_role_id FROM public.roles WHERE name = 'student' LIMIT 1;
  IF v_role_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role_id, organization_id)
    VALUES (v_user_id, v_role_id, v_org_id)
    ON CONFLICT (user_id, role_id, organization_id) DO UPDATE SET role_id = v_role_id;
  END IF;

  -- Enroll in class and subject if class_id provided
  IF p_class_id IS NOT NULL THEN
    SELECT id INTO v_subject_id FROM public.subjects WHERE class_id = p_class_id LIMIT 1;

    -- Deactivate previous active enrollments for this student
    UPDATE public.enrollments
    SET status = 'inactive'
    WHERE student_id = v_user_id AND organization_id = v_org_id AND class_id <> p_class_id;

    -- Insert or activate enrollment
    INSERT INTO public.enrollments (organization_id, student_id, class_id, subject_id, status)
    VALUES (v_org_id, v_user_id, p_class_id, v_subject_id, 'active')
    ON CONFLICT DO NOTHING;

    UPDATE public.enrollments
    SET status = 'active'
    WHERE student_id = v_user_id AND class_id = p_class_id;
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'user_id', v_user_id,
    'email', v_clean_email,
    'full_name', p_full_name,
    'class_id', p_class_id,
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
