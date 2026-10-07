-- ============================================================
-- FIX: Database error querying schema in Supabase Auth (GoTrue)
-- ============================================================

-- 1. Ensure all token/string columns in auth.users are empty strings, not NULL (phone stays NULL if empty due to unique constraint)
UPDATE auth.users
SET 
  confirmation_token = COALESCE(confirmation_token, ''),
  recovery_token = COALESCE(recovery_token, ''),
  email_change_token_new = COALESCE(email_change_token_new, ''),
  email_change = COALESCE(email_change, ''),
  email_change_token_current = COALESCE(email_change_token_current, ''),
  phone = CASE WHEN phone = '' THEN NULL ELSE phone END,
  phone_change = COALESCE(phone_change, ''),
  phone_change_token = COALESCE(phone_change_token, ''),
  reauthentication_token = COALESCE(reauthentication_token, ''),
  aud = COALESCE(aud, 'authenticated'),
  role = COALESCE(role, 'authenticated'),
  raw_app_meta_data = COALESCE(raw_app_meta_data, '{"provider":"email","providers":["email"]}'::jsonb),
  raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb),
  is_super_admin = COALESCE(is_super_admin, false),
  is_sso_user = COALESCE(is_sso_user, false),
  is_anonymous = COALESCE(is_anonymous, false)
WHERE TRUE;

-- 2. Ensure schema permissions are correctly granted to supabase auth & public roles
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role, postgres;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role, postgres;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role, postgres;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role, postgres;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role, postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role, postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ROUTINES TO anon, authenticated, service_role, postgres;

-- 3. Update admin_bulk_create_student RPC with fully populated auth.users fields
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
BEGIN
  v_clean_email := lower(trim(p_email));
  v_clean_phone := NULLIF(trim(p_phone), '');

  -- Resolve organization_id
  v_org_id := p_organization_id;
  IF v_org_id IS NULL THEN
    SELECT organization_id INTO v_org_id FROM public.profiles WHERE id = auth.uid() LIMIT 1;
  END IF;
  IF v_org_id IS NULL THEN
    SELECT id INTO v_org_id FROM public.organizations ORDER BY created_at ASC LIMIT 1;
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

    -- Insert into auth.users with ALL required GoTrue string/token columns as empty strings
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
      v_clean_phone,
      NULL,
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
      COALESCE(p_full_name, split_part(v_clean_email, '@', 1)),
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

  -- Assign student role
  SELECT id INTO v_role_id FROM public.roles WHERE name = 'student' LIMIT 1;
  IF v_role_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role_id, organization_id)
    VALUES (v_user_id, v_role_id, v_org_id)
    ON CONFLICT (user_id, role_id, organization_id) DO UPDATE SET role_id = v_role_id;
  END IF;

  -- Enroll in class and subject
  IF p_class_id IS NOT NULL THEN
    SELECT id INTO v_subject_id FROM public.subjects WHERE class_id = p_class_id LIMIT 1;

    INSERT INTO public.enrollments (organization_id, student_id, class_id, subject_id, status)
    VALUES (v_org_id, v_user_id, p_class_id, v_subject_id, 'active')
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'user_id', v_user_id,
    'email', v_clean_email,
    'full_name', p_full_name,
    'status', 'active',
    'must_change_password', true
  );
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object(
    'success', false,
    'error', SQLERRM,
    'email', v_clean_email
  );
END;
$$;

-- 4. Update admin_create_content_manager RPC with fully populated auth.users fields
CREATE OR REPLACE FUNCTION public.admin_create_content_manager(
  p_email TEXT,
  p_password TEXT,
  p_full_name TEXT,
  p_phone TEXT DEFAULT NULL,
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
  v_clean_email TEXT;
  v_clean_phone TEXT;
BEGIN
  v_clean_email := lower(trim(p_email));
  v_clean_phone := NULLIF(trim(p_phone), '');

  v_org_id := p_organization_id;
  IF v_org_id IS NULL THEN
    SELECT organization_id INTO v_org_id FROM public.profiles WHERE id = auth.uid() LIMIT 1;
  END IF;
  IF v_org_id IS NULL THEN
    SELECT id INTO v_org_id FROM public.organizations ORDER BY created_at ASC LIMIT 1;
  END IF;

  SELECT id INTO v_user_id FROM auth.users WHERE lower(email) = v_clean_email LIMIT 1;

  IF v_user_id IS NOT NULL THEN
    UPDATE public.profiles
    SET full_name = COALESCE(NULLIF(trim(p_full_name), ''), full_name),
        phone = COALESCE(v_clean_phone, phone),
        organization_id = v_org_id,
        status = 'active'
    WHERE id = v_user_id;
  ELSE
    v_user_id := gen_random_uuid();
    v_encrypted_pw := extensions.crypt(p_password, extensions.gen_salt('bf'));

    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      invited_at, confirmation_token, confirmation_sent_at,
      recovery_token, recovery_sent_at,
      email_change_token_new, email_change, email_change_sent_at,
      last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, created_at, updated_at,
      phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at,
      email_change_token_current, email_change_confirm_status,
      banned_until, reauthentication_token, reauthentication_sent_at,
      is_sso_user, deleted_at, is_anonymous, role, aud
    )
    VALUES (
      v_user_id, '00000000-0000-0000-0000-000000000000',
      v_clean_email, v_encrypted_pw, NOW(),
      NULL, '', NULL, '', NULL, '', '', NULL, NULL,
      jsonb_build_object('provider', 'email', 'providers', ARRAY['email']),
      jsonb_build_object('full_name', p_full_name, 'organization_id', v_org_id, 'phone', v_clean_phone),
      false, NOW(), NOW(),
      v_clean_phone, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false,
      'authenticated', 'authenticated'
    );

    INSERT INTO auth.identities (
      id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
    )
    VALUES (
      gen_random_uuid(), v_user_id, jsonb_build_object('sub', v_user_id::TEXT, 'email', v_clean_email),
      'email', v_user_id::TEXT, NOW(), NOW(), NOW()
    )
    ON CONFLICT (provider, provider_id) DO NOTHING;

    INSERT INTO public.profiles (id, organization_id, full_name, email, phone, status, must_change_password)
    VALUES (v_user_id, v_org_id, COALESCE(p_full_name, split_part(v_clean_email, '@', 1)), v_clean_email, v_clean_phone, 'active', false)
    ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name, status = 'active';
  END IF;

  SELECT id INTO v_role_id FROM public.roles WHERE name = 'academic_content_manager' LIMIT 1;
  IF v_role_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role_id, organization_id)
    VALUES (v_user_id, v_role_id, v_org_id)
    ON CONFLICT (user_id, role_id, organization_id) DO UPDATE SET role_id = v_role_id;
  END IF;

  RETURN jsonb_build_object('success', true, 'user_id', v_user_id, 'email', v_clean_email);
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;
