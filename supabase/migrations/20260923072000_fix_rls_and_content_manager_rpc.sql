-- ============================================================
-- FIX RLS RECURSION & SECURE FUNCTIONS
-- ============================================================

-- 1. Helper: get_my_organization_id (plpgsql, no inlining, security definer)
CREATE OR REPLACE FUNCTION public.get_my_organization_id()
RETURNS UUID
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_org_id UUID;
BEGIN
  SELECT organization_id INTO v_org_id FROM public.profiles WHERE id = auth.uid() LIMIT 1;
  RETURN v_org_id;
END;
$$;

-- 2. Helper: get_my_role (plpgsql, no inlining, security definer)
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS TEXT
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_role TEXT;
BEGIN
  SELECT r.name INTO v_role
  FROM public.user_roles ur
  JOIN public.roles r ON r.id = ur.role_id
  WHERE ur.user_id = auth.uid()
  LIMIT 1;
  RETURN COALESCE(v_role, 'student');
END;
$$;

-- 3. Roles RLS: Allow SELECT to all authenticated users
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "roles_select_all" ON public.roles;
CREATE POLICY "roles_select_all" ON public.roles FOR SELECT USING (true);

-- 4. User Roles RLS: Allow users to view their own roles directly
DROP POLICY IF EXISTS "user_roles_select" ON public.user_roles;
CREATE POLICY "user_roles_select" ON public.user_roles FOR SELECT USING (
  user_id = auth.uid() OR organization_id = public.get_my_organization_id()
);

DROP POLICY IF EXISTS "user_roles_admin_manage" ON public.user_roles;
CREATE POLICY "user_roles_admin_manage" ON public.user_roles FOR ALL USING (
  public.get_my_role() = 'admin'
);

-- 5. Categories, Classes, Subjects, Chapters published select for all org members
DROP POLICY IF EXISTS "categories_select_published" ON public.categories;
CREATE POLICY "categories_select_published" ON public.categories FOR SELECT USING (
  organization_id = public.get_my_organization_id() AND (
    public.get_my_role() IN ('admin', 'academic_content_manager') OR status = 'published'
  )
);

DROP POLICY IF EXISTS "classes_select" ON public.classes;
CREATE POLICY "classes_select" ON public.classes FOR SELECT USING (
  organization_id = public.get_my_organization_id() AND (
    public.get_my_role() IN ('admin', 'academic_content_manager') OR status = 'published'
  )
);

DROP POLICY IF EXISTS "subjects_select" ON public.subjects;
CREATE POLICY "subjects_select" ON public.subjects FOR SELECT USING (
  organization_id = public.get_my_organization_id() AND (
    public.get_my_role() IN ('admin', 'academic_content_manager') OR status = 'published'
  )
);

DROP POLICY IF EXISTS "chapters_select" ON public.chapters;
CREATE POLICY "chapters_select" ON public.chapters FOR SELECT USING (
  organization_id = public.get_my_organization_id() AND (
    public.get_my_role() IN ('admin', 'academic_content_manager') OR status = 'published'
  )
);

DROP POLICY IF EXISTS "chapter_content_select" ON public.chapter_content;
CREATE POLICY "chapter_content_select" ON public.chapter_content FOR SELECT USING (
  organization_id = public.get_my_organization_id() AND (
    public.get_my_role() IN ('admin', 'academic_content_manager') OR status = 'published'
  )
);

-- 6. RPC: admin_create_content_manager
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
BEGIN
  IF auth.uid() IS NOT NULL THEN
    IF public.get_my_role() <> 'admin' THEN
      RAISE EXCEPTION 'Access denied: Only administrators can create Content Managers';
    END IF;
  END IF;

  v_org_id := p_organization_id;
  IF v_org_id IS NULL THEN
    v_org_id := public.get_my_organization_id();
  END IF;
  IF v_org_id IS NULL THEN
    SELECT id INTO v_org_id FROM public.organizations ORDER BY created_at ASC LIMIT 1;
  END IF;

  SELECT id INTO v_user_id FROM auth.users WHERE lower(email) = lower(p_email) LIMIT 1;

  IF v_user_id IS NOT NULL THEN
    UPDATE public.profiles
    SET full_name = COALESCE(NULLIF(p_full_name, ''), full_name),
        phone = COALESCE(p_phone, phone),
        organization_id = v_org_id,
        status = 'active'
    WHERE id = v_user_id;
  ELSE
    v_user_id := gen_random_uuid();
    v_encrypted_pw := extensions.crypt(p_password, extensions.gen_salt('bf'));

    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      raw_user_meta_data, raw_app_meta_data, role, aud, created_at, updated_at
    )
    VALUES (
      v_user_id, '00000000-0000-0000-0000-000000000000',
      lower(p_email), v_encrypted_pw, NOW(),
      jsonb_build_object('full_name', p_full_name, 'organization_id', v_org_id, 'phone', p_phone),
      jsonb_build_object('provider', 'email', 'providers', ARRAY['email']),
      'authenticated', 'authenticated', NOW(), NOW()
    );

    INSERT INTO auth.identities (
      id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
    )
    VALUES (
      gen_random_uuid(), v_user_id, jsonb_build_object('sub', v_user_id::TEXT, 'email', lower(p_email)),
      'email', v_user_id::TEXT, NOW(), NOW(), NOW()
    )
    ON CONFLICT (provider, provider_id) DO NOTHING;

    INSERT INTO public.profiles (id, organization_id, full_name, email, phone, status, must_change_password)
    VALUES (v_user_id, v_org_id, COALESCE(p_full_name, split_part(p_email, '@', 1)), lower(p_email), p_phone, 'active', false)
    ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name, status = 'active';
  END IF;

  SELECT id INTO v_role_id FROM public.roles WHERE name = 'academic_content_manager' LIMIT 1;
  IF v_role_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role_id, organization_id)
    VALUES (v_user_id, v_role_id, v_org_id)
    ON CONFLICT (user_id, role_id, organization_id) DO UPDATE SET role_id = v_role_id;
  END IF;

  RETURN jsonb_build_object('success', true, 'user_id', v_user_id, 'email', lower(p_email));
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;
