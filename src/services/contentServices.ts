import { supabase, isUuid } from '../lib/supabase'
import type { Video, Lesson, Worksheet, Activity, Assignment, Quiz, Question, QuestionOption, QuizQuestion, QuizAttempt, QuizAnswer } from '../types'

// ─── Video Service ────────────────────────────────────────────────────────────
export const videoService = {
  async upsert(payload: Partial<Video> & { chapter_content_id: string; organization_id: string }): Promise<Video> {
    const { data, error } = await supabase
      .from('videos')
      .upsert(payload, { onConflict: 'chapter_content_id' })
      .select()
      .single()
    if (error) throw error
    return data
  },

  async getByContentId(contentId: string): Promise<Video | null> {
    if (!isUuid(contentId)) return null
    const { data } = await supabase
      .from('videos')
      .select('*')
      .eq('chapter_content_id', contentId)
      .maybeSingle()
    return data
  },

  async update(id: string, payload: Partial<Video>): Promise<Video> {
    if (!isUuid(id)) return payload as Video
    const { data, error } = await supabase
      .from('videos')
      .update(payload)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },
}

// ─── Lesson Service ───────────────────────────────────────────────────────────
export const lessonService = {
  async upsert(payload: Partial<Lesson> & { chapter_content_id: string }): Promise<Lesson> {
    const { data, error } = await supabase
      .from('lessons')
      .upsert(payload, { onConflict: 'chapter_content_id' })
      .select()
      .single()
    if (error) throw error
    return data
  },

  async getByContentId(contentId: string): Promise<Lesson | null> {
    if (!isUuid(contentId)) return null
    const { data } = await supabase
      .from('lessons')
      .select('*')
      .eq('chapter_content_id', contentId)
      .maybeSingle()
    return data
  },

  async update(id: string, payload: Partial<Lesson>): Promise<Lesson> {
    if (!isUuid(id)) return payload as Lesson
    const { data, error } = await supabase
      .from('lessons')
      .update(payload)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },
}

// ─── Worksheet Service ────────────────────────────────────────────────────────
export const worksheetService = {
  async upsert(payload: Partial<Worksheet> & { chapter_content_id: string }): Promise<Worksheet> {
    const { data, error } = await supabase
      .from('worksheets')
      .upsert(payload, { onConflict: 'chapter_content_id' })
      .select()
      .single()
    if (error) throw error
    return data
  },

  async getByContentId(contentId: string): Promise<Worksheet | null> {
    if (!isUuid(contentId)) return null
    const { data } = await supabase
      .from('worksheets')
      .select('*')
      .eq('chapter_content_id', contentId)
      .maybeSingle()
    return data
  },

  async update(id: string, payload: Partial<Worksheet>): Promise<Worksheet> {
    if (!isUuid(id)) return payload as Worksheet
    const { data, error } = await supabase
      .from('worksheets')
      .update(payload)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },
}

// ─── Activity Service ─────────────────────────────────────────────────────────
export const activityService = {
  async upsert(payload: Partial<Activity> & { chapter_content_id: string }): Promise<Activity> {
    const { data, error } = await supabase
      .from('activities')
      .upsert(payload, { onConflict: 'chapter_content_id' })
      .select()
      .single()
    if (error) throw error
    return data
  },

  async getByContentId(contentId: string): Promise<Activity | null> {
    if (!isUuid(contentId)) return null
    const { data } = await supabase
      .from('activities')
      .select('*')
      .eq('chapter_content_id', contentId)
      .maybeSingle()
    return data
  },

  async update(id: string, payload: Partial<Activity>): Promise<Activity> {
    if (!isUuid(id)) return payload as Activity
    const { data, error } = await supabase
      .from('activities')
      .update(payload)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },
}

// ─── Assignment Service ───────────────────────────────────────────────────────
export const assignmentService = {
  async upsert(payload: Partial<Assignment> & { chapter_content_id: string }): Promise<Assignment> {
    const { data, error } = await supabase
      .from('assignments')
      .upsert(payload, { onConflict: 'chapter_content_id' })
      .select()
      .single()
    if (error) throw error
    return data
  },

  async getByContentId(contentId: string): Promise<Assignment | null> {
    if (!isUuid(contentId)) return null
    const { data } = await supabase
      .from('assignments')
      .select('*')
      .eq('chapter_content_id', contentId)
      .maybeSingle()
    return data
  },

  async submitAssignment(payload: {
    assignment_id: string
    student_id: string
    submission_text?: string
    file_url?: string
  }) {
    const { data, error } = await supabase
      .from('assignment_submissions')
      .insert({ ...payload, submitted_at: new Date().toISOString() })
      .select()
      .single()
    if (error) throw error
    return data
  },

  async getSubmissions(assignmentId: string) {
    const { data, error } = await supabase
      .from('assignment_submissions')
      .select('*, student:profiles(*)')
      .eq('assignment_id', assignmentId)
    if (error) throw error
    return data || []
  },

  async getStudentSubmission(assignmentId: string, studentId: string) {
    const { data } = await supabase
      .from('assignment_submissions')
      .select('*')
      .eq('assignment_id', assignmentId)
      .eq('student_id', studentId)
      .order('submitted_at', { ascending: false })
      .limit(1)
      .single()
    return data
  },

  async gradeSubmission(submissionId: string, marks: number, feedback: string, gradedBy: string) {
    const { data, error } = await supabase
      .from('assignment_submissions')
      .update({ marks, feedback, graded_by: gradedBy, graded_at: new Date().toISOString(), status: 'graded' })
      .eq('id', submissionId)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async getAllForStudent(studentId: string) {
    const { data, error } = await supabase
      .from('assignments')
      .select('*, chapter_content:chapter_content(*, chapter:chapters(*, subject:subjects(*))), submissions:assignment_submissions(*)')
      .eq('assignment_submissions.student_id', studentId)
      .order('created_at', { ascending: false })
    if (error) {
      // Fallback without embedded filter if join syntax differs
      const { data: fallback, error: err2 } = await supabase
        .from('assignments')
        .select('*, chapter_content:chapter_content(*, chapter:chapters(*, subject:subjects(*))), submissions:assignment_submissions(*)')
        .order('created_at', { ascending: false })
      if (err2) throw err2
      return fallback || []
    }
    return data || []
  },
}

// ─── Workbook Service ────────────────────────────────────────────────────────
export const workbookService = {
  async submitWorkbook(payload: {
    chapter_content_id: string
    student_id: string
    organization_id: string
    responses: Record<string, string>
    file_url?: string
    feedback?: string
    status?: 'draft' | 'submitted' | 'reviewed'
  }) {
    const { data, error } = await supabase
      .from('workbook_submissions')
      .upsert({
        chapter_content_id: payload.chapter_content_id,
        student_id: payload.student_id,
        organization_id: payload.organization_id,
        responses: payload.responses,
        file_url: payload.file_url,
        feedback: payload.feedback,
        status: payload.status || 'submitted',
        submitted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }, { onConflict: 'chapter_content_id,student_id' })
      .select()
      .single()
    if (error) throw error
    return data
  },

  async getStudentSubmission(contentId: string, studentId: string) {
    if (!isUuid(contentId) || !isUuid(studentId)) return null
    const { data } = await supabase
      .from('workbook_submissions')
      .select('*')
      .eq('chapter_content_id', contentId)
      .eq('student_id', studentId)
      .maybeSingle()
    return data
  },

  async getSubmissions(contentId: string) {
    if (!isUuid(contentId)) return []
    const { data, error } = await supabase
      .from('workbook_submissions')
      .select('*, student:profiles(*)')
      .eq('chapter_content_id', contentId)
    if (error) return []
    return data || []
  },

  async getAllPendingReview(orgId: string) {
    if (!isUuid(orgId)) return []
    const { data, error } = await supabase
      .from('workbook_submissions')
      .select('*, student:profiles(*), chapter_content:chapter_content(*, chapter:chapters(*))')
      .eq('organization_id', orgId)
      .order('submitted_at', { ascending: false })
    if (error) return []
    return data || []
  },
}

// ─── Quiz Service ─────────────────────────────────────────────────────────────
export const quizService = {
  async upsert(payload: Partial<Quiz> & { chapter_content_id: string }): Promise<Quiz> {
    const { data, error } = await supabase
      .from('quizzes')
      .upsert(payload, { onConflict: 'chapter_content_id' })
      .select()
      .single()
    if (error) throw error
    return data
  },

  async getByContentId(contentId: string): Promise<Quiz | null> {
    if (!isUuid(contentId)) return null
    const { data } = await supabase
      .from('quizzes')
      .select('*')
      .eq('chapter_content_id', contentId)
      .maybeSingle()
    return data
  },

  async getQuestionsForQuiz(quizId: string): Promise<QuizQuestion[]> {
    if (!isUuid(quizId)) return []
    const { data, error } = await supabase
      .from('quiz_questions')
      .select('*, question:questions(*, options:question_options(*))')
      .eq('quiz_id', quizId)
      .order('display_order', { ascending: true })
    if (error) return []
    return (data || []) as QuizQuestion[]
  },

  async addQuestion(quizId: string, questionId: string, order: number) {
    const { data, error } = await supabase
      .from('quiz_questions')
      .insert({ quiz_id: quizId, question_id: questionId, display_order: order })
      .select()
      .single()
    if (error) throw error
    return data
  },

  async removeQuestion(quizQuestionId: string) {
    const { error } = await supabase
      .from('quiz_questions')
      .delete()
      .eq('id', quizQuestionId)
    if (error) throw error
  },

  async startAttempt(quizId: string, studentId: string): Promise<QuizAttempt> {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert({ quiz_id: quizId, student_id: studentId, started_at: new Date().toISOString() })
      .select()
      .single()
    if (error) throw error
    return data
  },

  async submitAttempt(attemptId: string, answers: Omit<QuizAnswer, 'id'>[], totalMarks: number, scoredMarks: number, passingPct: number) {
    // Save answers
    if (answers.length > 0) {
      const { error: answersError } = await supabase
        .from('quiz_answers')
        .insert(answers.map(a => ({ ...a, attempt_id: attemptId })))
      if (answersError) throw answersError
    }
    const percentage = totalMarks > 0 ? (scoredMarks / totalMarks) * 100 : 0
    const passed = percentage >= passingPct
    const { data, error } = await supabase
      .from('quiz_attempts')
      .update({
        completed_at: new Date().toISOString(),
        total_marks: totalMarks,
        scored_marks: scoredMarks,
        percentage,
        passed,
        status: 'completed',
      })
      .eq('id', attemptId)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async getStudentAttempts(quizId: string, studentId: string): Promise<QuizAttempt[]> {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('quiz_id', quizId)
      .eq('student_id', studentId)
      .order('started_at', { ascending: false })
    if (error) throw error
    return data || []
  },

  async getAllForStudent(studentId: string) {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*, chapter_content:chapter_content(*, chapter:chapters(*, subject:subjects(*))), attempts:quiz_attempts(*)')
      .eq('quiz_attempts.student_id', studentId)
      .order('created_at', { ascending: false })
    if (error) {
      const { data: fallback, error: err2 } = await supabase
        .from('quizzes')
        .select('*, chapter_content:chapter_content(*, chapter:chapters(*, subject:subjects(*))), attempts:quiz_attempts(*)')
        .order('created_at', { ascending: false })
      if (err2) throw err2
      return fallback || []
    }
    return data || []
  },

  async getAllAttemptsForStudent(studentId: string) {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*, quiz:quizzes(*, chapter_content:chapter_content(*, chapter:chapters(*, subject:subjects(*))))')
      .eq('student_id', studentId)
      .order('started_at', { ascending: false })
    if (error) throw error
    return data || []
  },
}

// ─── Question Bank Service ────────────────────────────────────────────────────
export const questionService = {
  async getAll(organizationId: string, filters?: { subjectId?: string; chapterId?: string; difficulty?: string }): Promise<Question[]> {
    let query = supabase
      .from('questions')
      .select('*, options:question_options(*)')
      .eq('organization_id', organizationId)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
    if (filters?.subjectId) query = query.eq('subject_id', filters.subjectId)
    if (filters?.chapterId) query = query.eq('chapter_id', filters.chapterId)
    if (filters?.difficulty) query = query.eq('difficulty', filters.difficulty)
    const { data, error } = await query
    if (error) throw error
    return (data || []) as Question[]
  },

  async create(payload: Partial<Question>, options: Omit<QuestionOption, 'id' | 'question_id'>[]): Promise<Question> {
    const { data: question, error } = await supabase
      .from('questions')
      .insert(payload)
      .select()
      .single()
    if (error) throw error
    if (options.length > 0) {
      const { error: optError } = await supabase
        .from('question_options')
        .insert(options.map(o => ({ ...o, question_id: question.id })))
      if (optError) throw optError
    }
    return question
  },

  async update(id: string, payload: Partial<Question>, options?: Omit<QuestionOption, 'id' | 'question_id'>[]): Promise<Question> {
    const { data, error } = await supabase
      .from('questions')
      .update(payload)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    if (options) {
      await supabase.from('question_options').delete().eq('question_id', id)
      if (options.length > 0) {
        await supabase.from('question_options').insert(options.map(o => ({ ...o, question_id: id })))
      }
    }
    return data
  },
}
