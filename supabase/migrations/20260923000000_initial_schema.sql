-- ============================================================
-- LMS COMPLETE DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ORGANIZATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  logo_url TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- PROFILES (linked to auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  phone TEXT,
  avatar_url TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ROLES
-- ============================================================
CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE CHECK (name IN ('admin', 'academic_content_manager', 'student')),
  description TEXT
);

INSERT INTO roles (name, description) VALUES
  ('admin', 'Full organization administrator'),
  ('academic_content_manager', 'Manages academic content and structure'),
  ('student', 'Learning-only access')
ON CONFLICT (name) DO NOTHING;

-- ============================================================
-- USER ROLES
-- ============================================================
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role_id, organization_id)
);

-- ============================================================
-- CATEGORIES
-- ============================================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  banner_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(organization_id, slug)
);

-- ============================================================
-- CLASSES
-- ============================================================
CREATE TABLE IF NOT EXISTS classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT,
  description TEXT,
  thumbnail_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- SUBJECTS
-- ============================================================
CREATE TABLE IF NOT EXISTS subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT,
  description TEXT,
  icon TEXT,
  thumbnail_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- CHAPTERS
-- ============================================================
CREATE TABLE IF NOT EXISTS chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  chapter_number TEXT,
  short_description TEXT,
  description TEXT,
  cover_image_url TEXT,
  estimated_duration INTEGER,
  display_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- CHAPTER CONTENT (Central Architecture Table)
-- ============================================================
CREATE TABLE IF NOT EXISTS chapter_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  chapter_id UUID NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL CHECK (content_type IN ('video', 'lesson', 'worksheet', 'activity', 'assignment', 'quiz', 'resource')),
  title TEXT NOT NULL,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_required BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- VIDEOS
-- ============================================================
CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  chapter_content_id UUID NOT NULL UNIQUE REFERENCES chapter_content(id) ON DELETE CASCADE,
  video_url TEXT,
  thumbnail_url TEXT,
  duration INTEGER,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- LESSONS
-- ============================================================
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_content_id UUID NOT NULL UNIQUE REFERENCES chapter_content(id) ON DELETE CASCADE,
  content TEXT,
  estimated_duration INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- WORKSHEETS
-- ============================================================
CREATE TABLE IF NOT EXISTS worksheets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_content_id UUID NOT NULL UNIQUE REFERENCES chapter_content(id) ON DELETE CASCADE,
  description TEXT,
  instructions TEXT,
  file_url TEXT,
  worksheet_type TEXT NOT NULL DEFAULT 'pdf' CHECK (worksheet_type IN ('pdf', 'interactive')),
  maximum_marks NUMERIC,
  time_limit INTEGER,
  attempt_limit INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ACTIVITIES
-- ============================================================
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_content_id UUID NOT NULL UNIQUE REFERENCES chapter_content(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('multiple_choice','true_false','fill_blank','match_following','ordering','short_answer','long_answer')),
  instructions TEXT,
  maximum_marks NUMERIC,
  attempt_limit INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ASSIGNMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_content_id UUID NOT NULL UNIQUE REFERENCES chapter_content(id) ON DELETE CASCADE,
  instructions TEXT,
  maximum_marks NUMERIC,
  due_date TIMESTAMPTZ,
  maximum_attempts INTEGER DEFAULT 1,
  allowed_file_types TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ASSIGNMENT SUBMISSIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS assignment_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  submission_text TEXT,
  file_url TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'graded')),
  marks NUMERIC,
  feedback TEXT,
  graded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  graded_at TIMESTAMPTZ
);

-- ============================================================
-- QUESTIONS (Question Bank)
-- ============================================================
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('mcq', 'multiple_select', 'true_false', 'fill_blank', 'short_answer')),
  subject_id UUID REFERENCES subjects(id) ON DELETE SET NULL,
  chapter_id UUID REFERENCES chapters(id) ON DELETE SET NULL,
  difficulty TEXT NOT NULL DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  marks NUMERIC NOT NULL DEFAULT 1,
  explanation TEXT,
  tags TEXT[],
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- QUESTION OPTIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS question_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0
);

-- ============================================================
-- QUIZZES
-- ============================================================
CREATE TABLE IF NOT EXISTS quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_content_id UUID NOT NULL UNIQUE REFERENCES chapter_content(id) ON DELETE CASCADE,
  instructions TEXT,
  time_limit INTEGER,
  passing_percentage NUMERIC DEFAULT 50,
  maximum_attempts INTEGER DEFAULT 3,
  randomize_questions BOOLEAN NOT NULL DEFAULT false,
  randomize_answers BOOLEAN NOT NULL DEFAULT false,
  negative_marks NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- QUIZ QUESTIONS (junction)
-- ============================================================
CREATE TABLE IF NOT EXISTS quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  display_order INTEGER NOT NULL DEFAULT 0,
  UNIQUE(quiz_id, question_id)
);

-- ============================================================
-- QUIZ ATTEMPTS
-- ============================================================
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  total_marks NUMERIC,
  scored_marks NUMERIC,
  percentage NUMERIC,
  passed BOOLEAN,
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'timed_out'))
);

-- ============================================================
-- QUIZ ANSWERS
-- ============================================================
CREATE TABLE IF NOT EXISTS quiz_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID NOT NULL REFERENCES quiz_attempts(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  selected_option_ids UUID[],
  text_answer TEXT,
  is_correct BOOLEAN,
  marks_awarded NUMERIC
);

-- ============================================================
-- ENROLLMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'completed')),
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- STUDENT CONTENT PROGRESS
-- ============================================================
CREATE TABLE IF NOT EXISTS student_content_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  chapter_content_id UUID NOT NULL REFERENCES chapter_content(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  completion_percentage NUMERIC NOT NULL DEFAULT 0,
  time_spent INTEGER DEFAULT 0,
  video_position NUMERIC DEFAULT 0,
  last_accessed_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  UNIQUE(student_id, chapter_content_id)
);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- AUDIT LOGS
-- ============================================================
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  old_data JSONB,
  new_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_profiles_organization_id ON profiles(organization_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_organization_id ON user_roles(organization_id);
CREATE INDEX IF NOT EXISTS idx_categories_organization_id ON categories(organization_id);
CREATE INDEX IF NOT EXISTS idx_categories_display_order ON categories(organization_id, display_order);
CREATE INDEX IF NOT EXISTS idx_classes_category_id ON classes(category_id);
CREATE INDEX IF NOT EXISTS idx_classes_organization_id ON classes(organization_id);
CREATE INDEX IF NOT EXISTS idx_subjects_class_id ON subjects(class_id);
CREATE INDEX IF NOT EXISTS idx_subjects_organization_id ON subjects(organization_id);
CREATE INDEX IF NOT EXISTS idx_chapters_subject_id ON chapters(subject_id);
CREATE INDEX IF NOT EXISTS idx_chapters_organization_id ON chapters(organization_id);
CREATE INDEX IF NOT EXISTS idx_chapter_content_chapter_id ON chapter_content(chapter_id);
CREATE INDEX IF NOT EXISTS idx_chapter_content_organization_id ON chapter_content(organization_id);
CREATE INDEX IF NOT EXISTS idx_chapter_content_display_order ON chapter_content(chapter_id, display_order);
CREATE INDEX IF NOT EXISTS idx_chapter_content_status ON chapter_content(status);
CREATE INDEX IF NOT EXISTS idx_videos_chapter_content_id ON videos(chapter_content_id);
CREATE INDEX IF NOT EXISTS idx_lessons_chapter_content_id ON lessons(chapter_content_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_class_id ON enrollments(class_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_subject_id ON enrollments(subject_id);
CREATE INDEX IF NOT EXISTS idx_progress_student_id ON student_content_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_progress_chapter_content_id ON student_content_progress(chapter_content_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_student_id ON quiz_attempts(student_id);
CREATE INDEX IF NOT EXISTS idx_assignment_submissions_student_id ON assignment_submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_organization_id ON audit_logs(organization_id);
CREATE INDEX IF NOT EXISTS idx_questions_organization_id ON questions(organization_id);

-- ============================================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_organizations_updated_at ON organizations;
CREATE TRIGGER trg_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
DROP TRIGGER IF EXISTS trg_profiles_updated_at ON profiles;
CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
DROP TRIGGER IF EXISTS trg_categories_updated_at ON categories;
CREATE TRIGGER trg_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at();
DROP TRIGGER IF EXISTS trg_classes_updated_at ON classes;
CREATE TRIGGER trg_classes_updated_at BEFORE UPDATE ON classes FOR EACH ROW EXECUTE FUNCTION update_updated_at();
DROP TRIGGER IF EXISTS trg_subjects_updated_at ON subjects;
CREATE TRIGGER trg_subjects_updated_at BEFORE UPDATE ON subjects FOR EACH ROW EXECUTE FUNCTION update_updated_at();
DROP TRIGGER IF EXISTS trg_chapters_updated_at ON chapters;
CREATE TRIGGER trg_chapters_updated_at BEFORE UPDATE ON chapters FOR EACH ROW EXECUTE FUNCTION update_updated_at();
DROP TRIGGER IF EXISTS trg_chapter_content_updated_at ON chapter_content;
CREATE TRIGGER trg_chapter_content_updated_at BEFORE UPDATE ON chapter_content FOR EACH ROW EXECUTE FUNCTION update_updated_at();
DROP TRIGGER IF EXISTS trg_videos_updated_at ON videos;
CREATE TRIGGER trg_videos_updated_at BEFORE UPDATE ON videos FOR EACH ROW EXECUTE FUNCTION update_updated_at();
DROP TRIGGER IF EXISTS trg_lessons_updated_at ON lessons;
CREATE TRIGGER trg_lessons_updated_at BEFORE UPDATE ON lessons FOR EACH ROW EXECUTE FUNCTION update_updated_at();
DROP TRIGGER IF EXISTS trg_worksheets_updated_at ON worksheets;
CREATE TRIGGER trg_worksheets_updated_at BEFORE UPDATE ON worksheets FOR EACH ROW EXECUTE FUNCTION update_updated_at();
DROP TRIGGER IF EXISTS trg_activities_updated_at ON activities;
CREATE TRIGGER trg_activities_updated_at BEFORE UPDATE ON activities FOR EACH ROW EXECUTE FUNCTION update_updated_at();
DROP TRIGGER IF EXISTS trg_assignments_updated_at ON assignments;
CREATE TRIGGER trg_assignments_updated_at BEFORE UPDATE ON assignments FOR EACH ROW EXECUTE FUNCTION update_updated_at();
DROP TRIGGER IF EXISTS trg_quizzes_updated_at ON quizzes;
CREATE TRIGGER trg_quizzes_updated_at BEFORE UPDATE ON quizzes FOR EACH ROW EXECUTE FUNCTION update_updated_at();
DROP TRIGGER IF EXISTS trg_questions_updated_at ON questions;
CREATE TRIGGER trg_questions_updated_at BEFORE UPDATE ON questions FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- AUTO-CREATE PROFILE ON AUTH USER SIGN UP
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, organization_id)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    (NEW.raw_user_meta_data->>'organization_id')::UUID
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- HELPER FUNCTION: Get current user's organization_id
-- ============================================================
CREATE OR REPLACE FUNCTION get_my_organization_id()
RETURNS UUID AS $$
  SELECT organization_id FROM profiles WHERE id = auth.uid() LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- ============================================================
-- HELPER FUNCTION: Get current user's role
-- ============================================================
CREATE OR REPLACE FUNCTION get_my_role()
RETURNS TEXT AS $$
  SELECT r.name FROM user_roles ur
  JOIN roles r ON r.id = ur.role_id
  WHERE ur.user_id = auth.uid()
    AND ur.organization_id = get_my_organization_id()
  LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- ============================================================
-- ENABLE RLS ON ALL TABLES
-- ============================================================
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapter_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE worksheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_content_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- RLS POLICIES
-- ============================================================

-- organizations: users see only their own org
DROP POLICY IF EXISTS "org_select" ON organizations;
CREATE POLICY "org_select" ON organizations FOR SELECT USING (id = get_my_organization_id());
DROP POLICY IF EXISTS "org_update" ON organizations;
CREATE POLICY "org_update" ON organizations FOR UPDATE USING (get_my_role() = 'admin' AND id = get_my_organization_id());

-- profiles: users see profiles in their org
DROP POLICY IF EXISTS "profiles_select" ON profiles;
CREATE POLICY "profiles_select" ON profiles FOR SELECT USING (organization_id = get_my_organization_id());
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (id = auth.uid());
DROP POLICY IF EXISTS "profiles_insert" ON profiles;
CREATE POLICY "profiles_insert" ON profiles FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "profiles_admin_update" ON profiles;
CREATE POLICY "profiles_admin_update" ON profiles FOR UPDATE USING (get_my_role() = 'admin' AND organization_id = get_my_organization_id());

-- user_roles
DROP POLICY IF EXISTS "user_roles_select" ON user_roles;
CREATE POLICY "user_roles_select" ON user_roles FOR SELECT USING (organization_id = get_my_organization_id());
DROP POLICY IF EXISTS "user_roles_admin_manage" ON user_roles;
CREATE POLICY "user_roles_admin_manage" ON user_roles FOR ALL USING (get_my_role() = 'admin' AND organization_id = get_my_organization_id());

-- categories
DROP POLICY IF EXISTS "categories_select_published" ON categories;
CREATE POLICY "categories_select_published" ON categories FOR SELECT USING (
  organization_id = get_my_organization_id() AND (
    get_my_role() IN ('admin', 'academic_content_manager') OR status = 'published'
  )
);
DROP POLICY IF EXISTS "categories_admin_acm_manage" ON categories;
CREATE POLICY "categories_admin_acm_manage" ON categories FOR ALL USING (
  get_my_role() IN ('admin', 'academic_content_manager') AND organization_id = get_my_organization_id()
);

-- classes
DROP POLICY IF EXISTS "classes_select" ON classes;
CREATE POLICY "classes_select" ON classes FOR SELECT USING (
  organization_id = get_my_organization_id() AND (
    get_my_role() IN ('admin', 'academic_content_manager') OR status = 'published'
  )
);
DROP POLICY IF EXISTS "classes_admin_acm_manage" ON classes;
CREATE POLICY "classes_admin_acm_manage" ON classes FOR ALL USING (
  get_my_role() IN ('admin', 'academic_content_manager') AND organization_id = get_my_organization_id()
);

-- subjects
DROP POLICY IF EXISTS "subjects_select" ON subjects;
CREATE POLICY "subjects_select" ON subjects FOR SELECT USING (
  organization_id = get_my_organization_id() AND (
    get_my_role() IN ('admin', 'academic_content_manager') OR status = 'published'
  )
);
DROP POLICY IF EXISTS "subjects_admin_acm_manage" ON subjects;
CREATE POLICY "subjects_admin_acm_manage" ON subjects FOR ALL USING (
  get_my_role() IN ('admin', 'academic_content_manager') AND organization_id = get_my_organization_id()
);

-- chapters
DROP POLICY IF EXISTS "chapters_select" ON chapters;
CREATE POLICY "chapters_select" ON chapters FOR SELECT USING (
  organization_id = get_my_organization_id() AND (
    get_my_role() IN ('admin', 'academic_content_manager') OR status = 'published'
  )
);
DROP POLICY IF EXISTS "chapters_admin_acm_manage" ON chapters;
CREATE POLICY "chapters_admin_acm_manage" ON chapters FOR ALL USING (
  get_my_role() IN ('admin', 'academic_content_manager') AND organization_id = get_my_organization_id()
);

-- chapter_content
DROP POLICY IF EXISTS "chapter_content_select" ON chapter_content;
CREATE POLICY "chapter_content_select" ON chapter_content FOR SELECT USING (
  organization_id = get_my_organization_id() AND (
    get_my_role() IN ('admin', 'academic_content_manager') OR status = 'published'
  )
);
DROP POLICY IF EXISTS "chapter_content_admin_acm_manage" ON chapter_content;
CREATE POLICY "chapter_content_admin_acm_manage" ON chapter_content FOR ALL USING (
  get_my_role() IN ('admin', 'academic_content_manager') AND organization_id = get_my_organization_id()
);

-- videos
DROP POLICY IF EXISTS "videos_select" ON videos;
CREATE POLICY "videos_select" ON videos FOR SELECT USING (organization_id = get_my_organization_id());
DROP POLICY IF EXISTS "videos_admin_acm_manage" ON videos;
CREATE POLICY "videos_admin_acm_manage" ON videos FOR ALL USING (
  get_my_role() IN ('admin', 'academic_content_manager') AND organization_id = get_my_organization_id()
);

-- lessons
DROP POLICY IF EXISTS "lessons_select" ON lessons;
CREATE POLICY "lessons_select" ON lessons FOR SELECT USING (
  EXISTS (SELECT 1 FROM chapter_content cc WHERE cc.id = lessons.chapter_content_id AND cc.organization_id = get_my_organization_id())
);
DROP POLICY IF EXISTS "lessons_admin_acm_manage" ON lessons;
CREATE POLICY "lessons_admin_acm_manage" ON lessons FOR ALL USING (
  get_my_role() IN ('admin', 'academic_content_manager') AND
  EXISTS (SELECT 1 FROM chapter_content cc WHERE cc.id = lessons.chapter_content_id AND cc.organization_id = get_my_organization_id())
);

-- worksheets
DROP POLICY IF EXISTS "worksheets_select" ON worksheets;
CREATE POLICY "worksheets_select" ON worksheets FOR SELECT USING (
  EXISTS (SELECT 1 FROM chapter_content cc WHERE cc.id = worksheets.chapter_content_id AND cc.organization_id = get_my_organization_id())
);
DROP POLICY IF EXISTS "worksheets_admin_acm_manage" ON worksheets;
CREATE POLICY "worksheets_admin_acm_manage" ON worksheets FOR ALL USING (
  get_my_role() IN ('admin', 'academic_content_manager') AND
  EXISTS (SELECT 1 FROM chapter_content cc WHERE cc.id = worksheets.chapter_content_id AND cc.organization_id = get_my_organization_id())
);

-- activities
DROP POLICY IF EXISTS "activities_select" ON activities;
CREATE POLICY "activities_select" ON activities FOR SELECT USING (
  EXISTS (SELECT 1 FROM chapter_content cc WHERE cc.id = activities.chapter_content_id AND cc.organization_id = get_my_organization_id())
);
DROP POLICY IF EXISTS "activities_admin_acm_manage" ON activities;
CREATE POLICY "activities_admin_acm_manage" ON activities FOR ALL USING (
  get_my_role() IN ('admin', 'academic_content_manager') AND
  EXISTS (SELECT 1 FROM chapter_content cc WHERE cc.id = activities.chapter_content_id AND cc.organization_id = get_my_organization_id())
);

-- assignments
DROP POLICY IF EXISTS "assignments_select" ON assignments;
CREATE POLICY "assignments_select" ON assignments FOR SELECT USING (
  EXISTS (SELECT 1 FROM chapter_content cc WHERE cc.id = assignments.chapter_content_id AND cc.organization_id = get_my_organization_id())
);
DROP POLICY IF EXISTS "assignments_admin_acm_manage" ON assignments;
CREATE POLICY "assignments_admin_acm_manage" ON assignments FOR ALL USING (
  get_my_role() IN ('admin', 'academic_content_manager') AND
  EXISTS (SELECT 1 FROM chapter_content cc WHERE cc.id = assignments.chapter_content_id AND cc.organization_id = get_my_organization_id())
);

-- assignment_submissions
DROP POLICY IF EXISTS "submissions_student_own" ON assignment_submissions;
CREATE POLICY "submissions_student_own" ON assignment_submissions FOR ALL USING (student_id = auth.uid());
DROP POLICY IF EXISTS "submissions_admin_read" ON assignment_submissions;
CREATE POLICY "submissions_admin_read" ON assignment_submissions FOR SELECT USING (
  get_my_role() IN ('admin', 'academic_content_manager') AND
  EXISTS (
    SELECT 1 FROM assignments a
    JOIN chapter_content cc ON cc.id = a.chapter_content_id
    WHERE a.id = assignment_submissions.assignment_id AND cc.organization_id = get_my_organization_id()
  )
);
DROP POLICY IF EXISTS "submissions_admin_grade" ON assignment_submissions;
CREATE POLICY "submissions_admin_grade" ON assignment_submissions FOR UPDATE USING (
  get_my_role() IN ('admin', 'academic_content_manager')
);

-- questions
DROP POLICY IF EXISTS "questions_select" ON questions;
CREATE POLICY "questions_select" ON questions FOR SELECT USING (organization_id = get_my_organization_id());
DROP POLICY IF EXISTS "questions_admin_acm_manage" ON questions;
CREATE POLICY "questions_admin_acm_manage" ON questions FOR ALL USING (
  get_my_role() IN ('admin', 'academic_content_manager') AND organization_id = get_my_organization_id()
);

-- question_options
DROP POLICY IF EXISTS "question_options_select" ON question_options;
CREATE POLICY "question_options_select" ON question_options FOR SELECT USING (
  EXISTS (SELECT 1 FROM questions q WHERE q.id = question_options.question_id AND q.organization_id = get_my_organization_id())
);
DROP POLICY IF EXISTS "question_options_admin_acm_manage" ON question_options;
CREATE POLICY "question_options_admin_acm_manage" ON question_options FOR ALL USING (
  get_my_role() IN ('admin', 'academic_content_manager') AND
  EXISTS (SELECT 1 FROM questions q WHERE q.id = question_options.question_id AND q.organization_id = get_my_organization_id())
);

-- quizzes
DROP POLICY IF EXISTS "quizzes_select" ON quizzes;
CREATE POLICY "quizzes_select" ON quizzes FOR SELECT USING (
  EXISTS (SELECT 1 FROM chapter_content cc WHERE cc.id = quizzes.chapter_content_id AND cc.organization_id = get_my_organization_id())
);
DROP POLICY IF EXISTS "quizzes_admin_acm_manage" ON quizzes;
CREATE POLICY "quizzes_admin_acm_manage" ON quizzes FOR ALL USING (
  get_my_role() IN ('admin', 'academic_content_manager') AND
  EXISTS (SELECT 1 FROM chapter_content cc WHERE cc.id = quizzes.chapter_content_id AND cc.organization_id = get_my_organization_id())
);

-- quiz_questions
DROP POLICY IF EXISTS "quiz_questions_select" ON quiz_questions;
CREATE POLICY "quiz_questions_select" ON quiz_questions FOR SELECT USING (
  EXISTS (SELECT 1 FROM quizzes q JOIN chapter_content cc ON cc.id = q.chapter_content_id WHERE q.id = quiz_questions.quiz_id AND cc.organization_id = get_my_organization_id())
);
DROP POLICY IF EXISTS "quiz_questions_admin_acm_manage" ON quiz_questions;
CREATE POLICY "quiz_questions_admin_acm_manage" ON quiz_questions FOR ALL USING (
  get_my_role() IN ('admin', 'academic_content_manager') AND
  EXISTS (SELECT 1 FROM quizzes q JOIN chapter_content cc ON cc.id = q.chapter_content_id WHERE q.id = quiz_questions.quiz_id AND cc.organization_id = get_my_organization_id())
);

-- quiz_attempts
DROP POLICY IF EXISTS "quiz_attempts_student_own" ON quiz_attempts;
CREATE POLICY "quiz_attempts_student_own" ON quiz_attempts FOR ALL USING (student_id = auth.uid());
DROP POLICY IF EXISTS "quiz_attempts_admin_read" ON quiz_attempts;
CREATE POLICY "quiz_attempts_admin_read" ON quiz_attempts FOR SELECT USING (get_my_role() IN ('admin', 'academic_content_manager'));

-- quiz_answers
DROP POLICY IF EXISTS "quiz_answers_own" ON quiz_answers;
CREATE POLICY "quiz_answers_own" ON quiz_answers FOR ALL USING (
  EXISTS (SELECT 1 FROM quiz_attempts qa WHERE qa.id = quiz_answers.attempt_id AND qa.student_id = auth.uid())
);
DROP POLICY IF EXISTS "quiz_answers_admin_read" ON quiz_answers;
CREATE POLICY "quiz_answers_admin_read" ON quiz_answers FOR SELECT USING (get_my_role() IN ('admin', 'academic_content_manager'));

-- enrollments
DROP POLICY IF EXISTS "enrollments_student_own" ON enrollments;
CREATE POLICY "enrollments_student_own" ON enrollments FOR SELECT USING (student_id = auth.uid());
DROP POLICY IF EXISTS "enrollments_admin_manage" ON enrollments;
CREATE POLICY "enrollments_admin_manage" ON enrollments FOR ALL USING (
  get_my_role() IN ('admin', 'academic_content_manager') AND organization_id = get_my_organization_id()
);

-- student_content_progress
DROP POLICY IF EXISTS "progress_student_own" ON student_content_progress;
CREATE POLICY "progress_student_own" ON student_content_progress FOR ALL USING (student_id = auth.uid());
DROP POLICY IF EXISTS "progress_admin_read" ON student_content_progress;
CREATE POLICY "progress_admin_read" ON student_content_progress FOR SELECT USING (
  get_my_role() IN ('admin', 'academic_content_manager') AND organization_id = get_my_organization_id()
);

-- notifications
DROP POLICY IF EXISTS "notifications_own" ON notifications;
CREATE POLICY "notifications_own" ON notifications FOR ALL USING (user_id = auth.uid());

-- audit_logs
DROP POLICY IF EXISTS "audit_logs_admin" ON audit_logs;
CREATE POLICY "audit_logs_admin" ON audit_logs FOR SELECT USING (
  get_my_role() = 'admin' AND organization_id = get_my_organization_id()
);
DROP POLICY IF EXISTS "audit_logs_insert" ON audit_logs;
CREATE POLICY "audit_logs_insert" ON audit_logs FOR INSERT WITH CHECK (organization_id = get_my_organization_id());

-- ============================================================
-- STORAGE BUCKETS (run after enabling storage extension)
-- ============================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg','image/png','image/webp']),
  ('organization-assets', 'organization-assets', true, 10485760, ARRAY['image/jpeg','image/png','image/webp','image/svg+xml']),
  ('videos', 'videos', false, 524288000, ARRAY['video/mp4','video/webm','video/ogg']),
  ('images', 'images', false, 10485760, ARRAY['image/jpeg','image/png','image/webp','image/gif']),
  ('documents', 'documents', false, 52428800, ARRAY['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
  ('worksheets', 'worksheets', false, 52428800, ARRAY['application/pdf']),
  ('assignments', 'assignments', false, 52428800, NULL),
  ('resources', 'resources', false, 52428800, NULL)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for authenticated users within their org
DROP POLICY IF EXISTS "avatars_public_read" ON storage.objects;
CREATE POLICY "avatars_public_read" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
DROP POLICY IF EXISTS "avatars_auth_upload" ON storage.objects;
CREATE POLICY "avatars_auth_upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');
DROP POLICY IF EXISTS "org_assets_public_read" ON storage.objects;
CREATE POLICY "org_assets_public_read" ON storage.objects FOR SELECT USING (bucket_id = 'organization-assets');
DROP POLICY IF EXISTS "org_assets_admin_upload" ON storage.objects;
CREATE POLICY "org_assets_admin_upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'organization-assets' AND auth.role() = 'authenticated');
DROP POLICY IF EXISTS "videos_auth_select" ON storage.objects;
CREATE POLICY "videos_auth_select" ON storage.objects FOR SELECT USING (bucket_id = 'videos' AND auth.role() = 'authenticated');
DROP POLICY IF EXISTS "videos_acm_upload" ON storage.objects;
CREATE POLICY "videos_acm_upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'videos' AND auth.role() = 'authenticated');
DROP POLICY IF EXISTS "images_auth_all" ON storage.objects;
CREATE POLICY "images_auth_all" ON storage.objects FOR ALL USING (bucket_id = 'images' AND auth.role() = 'authenticated');
DROP POLICY IF EXISTS "documents_auth_all" ON storage.objects;
CREATE POLICY "documents_auth_all" ON storage.objects FOR ALL USING (bucket_id = 'documents' AND auth.role() = 'authenticated');
DROP POLICY IF EXISTS "worksheets_auth_all" ON storage.objects;
CREATE POLICY "worksheets_auth_all" ON storage.objects FOR ALL USING (bucket_id = 'worksheets' AND auth.role() = 'authenticated');
DROP POLICY IF EXISTS "assignments_auth_all" ON storage.objects;
CREATE POLICY "assignments_auth_all" ON storage.objects FOR ALL USING (bucket_id = 'assignments' AND auth.role() = 'authenticated');
DROP POLICY IF EXISTS "resources_auth_all" ON storage.objects;
CREATE POLICY "resources_auth_all" ON storage.objects FOR ALL USING (bucket_id = 'resources' AND auth.role() = 'authenticated');

-- ============================================================
-- SEED: Demo Organization
-- ============================================================
INSERT INTO organizations (id, name, slug, description, status)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'Nanjil Academy',
  'nanjil-academy',
  'A premier learning institution offering comprehensive education across all levels.',
  'active'
) ON CONFLICT (slug) DO NOTHING;
