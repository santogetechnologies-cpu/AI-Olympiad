// ─── Organizations ───────────────────────────────────────────────────────────
export interface Organization {
  id: string
  name: string
  slug: string
  description?: string
  logo_url?: string
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

// ─── Profiles ────────────────────────────────────────────────────────────────
export interface Profile {
  id: string
  organization_id: string
  full_name: string
  email: string
  phone?: string
  avatar_url?: string
  student_id_number?: string
  must_change_password?: boolean
  status: 'active' | 'inactive' | 'suspended'
  created_at: string
  updated_at: string
}

// ─── Roles ───────────────────────────────────────────────────────────────────
export type RoleName = 'admin' | 'academic_content_manager' | 'student'

export interface Role {
  id: string
  name: RoleName
  description?: string
}

export interface UserRole {
  id: string
  user_id: string
  role_id: string
  organization_id: string
  created_at: string
  role?: Role
}

// ─── Categories ──────────────────────────────────────────────────────────────
export interface Category {
  id: string
  organization_id: string
  name: string
  slug: string
  description?: string
  thumbnail_url?: string
  banner_url?: string
  display_order: number
  status: 'draft' | 'published' | 'archived'
  created_by: string
  created_at: string
  updated_at: string
}

// ─── Classes ─────────────────────────────────────────────────────────────────
export interface Class {
  id: string
  organization_id: string
  category_id: string
  name: string
  code?: string
  description?: string
  thumbnail_url?: string
  display_order: number
  status: 'draft' | 'published' | 'archived'
  created_by: string
  created_at: string
  updated_at: string
  category?: Category
}

// ─── Subjects ────────────────────────────────────────────────────────────────
export interface Subject {
  id: string
  organization_id: string
  class_id: string
  name: string
  code?: string
  description?: string
  icon?: string
  thumbnail_url?: string
  display_order: number
  status: 'draft' | 'published' | 'archived'
  created_by: string
  created_at: string
  updated_at: string
  class?: Class
}

// ─── Chapters ────────────────────────────────────────────────────────────────
export interface Chapter {
  id: string
  organization_id: string
  subject_id: string
  title: string
  chapter_number?: string
  short_description?: string
  description?: string
  cover_image_url?: string
  estimated_duration?: number
  display_order: number
  status: 'draft' | 'published' | 'archived'
  created_by: string
  created_at: string
  updated_at: string
  subject?: Subject
}

// ─── Chapter Content ─────────────────────────────────────────────────────────
export type ContentType = 'video' | 'lesson' | 'worksheet' | 'activity' | 'assignment' | 'quiz' | 'resource'

export interface ChapterContent {
  id: string
  organization_id: string
  chapter_id: string
  content_type: ContentType
  title: string
  description?: string
  display_order: number
  is_required: boolean
  status: 'draft' | 'published' | 'archived'
  created_by: string
  created_at: string
  updated_at: string
  chapter?: Chapter
  video?: Video
  lesson?: Lesson
  worksheet?: Worksheet
  activity?: Activity
  assignment?: Assignment
  quiz?: Quiz
  progress?: StudentContentProgress
}

// ─── Videos ──────────────────────────────────────────────────────────────────
export interface Video {
  id: string
  organization_id: string
  chapter_content_id: string
  video_url?: string
  thumbnail_url?: string
  duration?: number
  description?: string
  created_at: string
  updated_at: string
}

// ─── Lessons ─────────────────────────────────────────────────────────────────
export interface Lesson {
  id: string
  chapter_content_id: string
  content?: string
  estimated_duration?: number
  created_at: string
  updated_at: string
}

// ─── Worksheets ──────────────────────────────────────────────────────────────
export interface Worksheet {
  id: string
  chapter_content_id: string
  description?: string
  instructions?: string
  file_url?: string
  worksheet_type: 'pdf' | 'interactive'
  maximum_marks?: number
  time_limit?: number
  attempt_limit?: number
  created_at: string
  updated_at: string
}

// ─── Activities ──────────────────────────────────────────────────────────────
export type ActivityType =
  | 'multiple_choice'
  | 'true_false'
  | 'fill_blank'
  | 'match_following'
  | 'ordering'
  | 'short_answer'
  | 'long_answer'

export interface Activity {
  id: string
  chapter_content_id: string
  activity_type: ActivityType
  instructions?: string
  maximum_marks?: number
  attempt_limit?: number
  created_at: string
  updated_at: string
}

// ─── Assignments ─────────────────────────────────────────────────────────────
export interface Assignment {
  id: string
  chapter_content_id: string
  instructions?: string
  maximum_marks?: number
  due_date?: string
  maximum_attempts?: number
  allowed_file_types?: string[]
  created_at: string
  updated_at: string
}

export interface AssignmentSubmission {
  id: string
  assignment_id: string
  student_id: string
  submission_text?: string
  file_url?: string
  submitted_at: string
  status: 'submitted' | 'under_review' | 'graded'
  marks?: number
  feedback?: string
  graded_by?: string
  graded_at?: string
}

export interface WorkbookSubmission {
  id: string
  organization_id: string
  chapter_content_id: string
  student_id: string
  responses: Record<string, string>
  file_url?: string
  feedback?: string
  status: 'draft' | 'submitted' | 'reviewed'
  submitted_at: string
  created_at: string
  updated_at: string
  student?: Profile
}

// ─── Quizzes ─────────────────────────────────────────────────────────────────
export type QuestionType = 'mcq' | 'multiple_select' | 'true_false' | 'fill_blank' | 'short_answer'

export interface Quiz {
  id: string
  chapter_content_id: string
  instructions?: string
  time_limit?: number
  passing_percentage?: number
  maximum_attempts?: number
  randomize_questions: boolean
  randomize_answers: boolean
  negative_marks: number
  created_at: string
  updated_at: string
}

export interface Question {
  id: string
  organization_id: string
  question: string
  question_type: QuestionType
  subject_id?: string
  chapter_id?: string
  difficulty: 'easy' | 'medium' | 'hard'
  marks: number
  explanation?: string
  tags?: string[]
  status: 'active' | 'archived'
  created_by: string
  created_at: string
  updated_at: string
  options?: QuestionOption[]
}

export interface QuestionOption {
  id: string
  question_id: string
  option_text: string
  is_correct: boolean
  display_order: number
}

export interface QuizQuestion {
  id: string
  quiz_id: string
  question_id: string
  display_order: number
  question?: Question
}

export interface QuizAttempt {
  id: string
  quiz_id: string
  student_id: string
  started_at: string
  completed_at?: string
  total_marks?: number
  scored_marks?: number
  percentage?: number
  passed?: boolean
  status: 'in_progress' | 'completed' | 'timed_out'
}

export interface QuizAnswer {
  id: string
  attempt_id: string
  question_id: string
  selected_option_ids?: string[]
  text_answer?: string
  is_correct?: boolean
  marks_awarded?: number
}

// ─── Enrollments ─────────────────────────────────────────────────────────────
export interface Enrollment {
  id: string
  organization_id: string
  student_id: string
  class_id?: string
  subject_id?: string
  status: 'active' | 'inactive' | 'completed'
  enrolled_at: string
  created_at: string
  class?: Class
  subject?: Subject
  student?: Profile
}

// ─── Progress ────────────────────────────────────────────────────────────────
export type ProgressStatus = 'not_started' | 'in_progress' | 'completed'

export interface StudentContentProgress {
  id: string
  organization_id: string
  student_id: string
  chapter_content_id: string
  status: ProgressStatus
  completion_percentage: number
  time_spent?: number
  last_accessed_at?: string
  started_at?: string
  completed_at?: string
  video_position?: number
}

// ─── Notifications ───────────────────────────────────────────────────────────
export interface Notification {
  id: string
  organization_id: string
  user_id: string
  title: string
  message: string
  type: string
  entity_type?: string
  entity_id?: string
  is_read: boolean
  created_at: string
}

// ─── Audit Logs ──────────────────────────────────────────────────────────────
export interface AuditLog {
  id: string
  user_id: string
  organization_id: string
  action: string
  entity_type: string
  entity_id?: string
  old_data?: Record<string, unknown>
  new_data?: Record<string, unknown>
  created_at: string
  profile?: Profile
}

// ─── Auth Context ─────────────────────────────────────────────────────────────
export interface AuthUser {
  id: string
  email: string
  profile: Profile
  role: RoleName
  organization_id: string
}
