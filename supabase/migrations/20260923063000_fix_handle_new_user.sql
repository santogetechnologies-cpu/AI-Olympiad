-- ============================================================
-- FIX: handle_new_user trigger with explicit search_path and safety exception handling
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_org_id UUID;
  v_role_id UUID;
  v_org_str TEXT;
  v_full_name TEXT;
BEGIN
  -- Safe extraction of organization_id
  IF NEW.raw_user_meta_data IS NOT NULL THEN
    v_org_str := NEW.raw_user_meta_data->>'organization_id';
    IF v_org_str IS NOT NULL AND v_org_str ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN
      v_org_id := v_org_str::UUID;
    END IF;
    v_full_name := NEW.raw_user_meta_data->>'full_name';
  END IF;

  -- Fallback to default organization
  IF v_org_id IS NULL THEN
    SELECT id INTO v_org_id FROM public.organizations ORDER BY created_at ASC LIMIT 1;
  END IF;

  -- If still no organization, create default
  IF v_org_id IS NULL THEN
    INSERT INTO public.organizations (id, name, slug, description, status)
    VALUES (
      'a0000000-0000-0000-0000-000000000001',
      'Nanjil Academy',
      'nanjil-academy',
      'Default Organization',
      'active'
    )
    ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO v_org_id;
  END IF;

  -- Determine full name
  IF v_full_name IS NULL OR trim(v_full_name) = '' THEN
    IF NEW.email IS NOT NULL AND NEW.email <> '' THEN
      v_full_name := split_part(NEW.email, '@', 1);
    ELSE
      v_full_name := 'Admin User';
    END IF;
  END IF;

  -- 2. Insert into profiles
  INSERT INTO public.profiles (id, email, full_name, organization_id, status)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    v_full_name,
    v_org_id,
    'active'
  )
  ON CONFLICT (id) DO UPDATE SET
    organization_id = COALESCE(public.profiles.organization_id, EXCLUDED.organization_id),
    email = EXCLUDED.email,
    status = 'active';

  -- 3. Get admin role_id
  SELECT id INTO v_role_id FROM public.roles WHERE name = 'admin' LIMIT 1;
  IF v_role_id IS NULL THEN
    INSERT INTO public.roles (name, description)
    VALUES ('admin', 'Full organization administrator')
    ON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description
    RETURNING id INTO v_role_id;
  END IF;

  -- 4. Assign admin role in user_roles
  IF v_org_id IS NOT NULL AND v_role_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role_id, organization_id)
    VALUES (NEW.id, v_role_id, v_org_id)
    ON CONFLICT (user_id, role_id, organization_id) DO NOTHING;
  END IF;

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'handle_new_user error: %', SQLERRM;
  RETURN NEW;
END;
$$;

-- Ensure trigger is active on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
