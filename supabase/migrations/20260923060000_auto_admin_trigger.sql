-- ============================================================
-- AUTO-ASSIGN ADMIN ROLE TO AUTH USERS CREATED IN SUPABASE
-- ============================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_org_id UUID;
  v_role_id UUID;
BEGIN
  -- 1. Determine organization_id (from metadata or default organization)
  v_org_id := (NEW.raw_user_meta_data->>'organization_id')::UUID;
  IF v_org_id IS NULL THEN
    SELECT id INTO v_org_id FROM organizations ORDER BY created_at ASC LIMIT 1;
  END IF;

  -- If no organization exists yet, create default
  IF v_org_id IS NULL THEN
    INSERT INTO organizations (id, name, slug, description, status)
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

  -- 2. Insert or update profile
  INSERT INTO profiles (id, email, full_name, organization_id, status)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(COALESCE(NEW.email, 'Admin'), '@', 1)),
    v_org_id,
    'active'
  )
  ON CONFLICT (id) DO UPDATE SET
    organization_id = COALESCE(profiles.organization_id, EXCLUDED.organization_id),
    email = EXCLUDED.email,
    status = 'active';

  -- 3. Get admin role_id
  SELECT id INTO v_role_id FROM roles WHERE name = 'admin' LIMIT 1;
  IF v_role_id IS NULL THEN
    INSERT INTO roles (name, description)
    VALUES ('admin', 'Full organization administrator')
    ON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description
    RETURNING id INTO v_role_id;
  END IF;

  -- 4. Assign admin role in user_roles
  IF v_org_id IS NOT NULL AND v_role_id IS NOT NULL THEN
    INSERT INTO user_roles (user_id, role_id, organization_id)
    VALUES (NEW.id, v_role_id, v_org_id)
    ON CONFLICT (user_id, role_id, organization_id) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger to ensure it's active
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Backfill any existing users in auth.users so they are assigned Admin
DO $$
DECLARE
  v_org_id UUID;
  v_role_id UUID;
  r RECORD;
BEGIN
  SELECT id INTO v_org_id FROM organizations ORDER BY created_at ASC LIMIT 1;
  SELECT id INTO v_role_id FROM roles WHERE name = 'admin' LIMIT 1;

  IF v_org_id IS NOT NULL AND v_role_id IS NOT NULL THEN
    FOR r IN SELECT id, email, raw_user_meta_data FROM auth.users LOOP
      INSERT INTO profiles (id, email, full_name, organization_id, status)
      VALUES (
        r.id,
        COALESCE(r.email, ''),
        COALESCE(r.raw_user_meta_data->>'full_name', split_part(COALESCE(r.email, 'Admin'), '@', 1)),
        v_org_id,
        'active'
      )
      ON CONFLICT (id) DO UPDATE SET
        organization_id = COALESCE(profiles.organization_id, v_org_id),
        status = 'active';

      INSERT INTO user_roles (user_id, role_id, organization_id)
      VALUES (r.id, v_role_id, v_org_id)
      ON CONFLICT (user_id, role_id, organization_id) DO NOTHING;
    END LOOP;
  END IF;
END $$;
