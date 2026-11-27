// ============================================================
// EXAM SERVICE — customizable multiple-choice exams
// Answer keys live in exam_answer_keys (admin-only); students submit
// through the submit_exam_attempt RPC, which grades server-side.
// ============================================================

import { supabase } from '../lib/supabase'

export type ExamStatus = 'draft' | 'published' | 'closed'
export type ResultsVisibility = 'immediate' | 'after_end' | 'manual'

export interface Exam {
  id: string
  organization_id?: string | null
  class_id?: string | null
  title: string
  description?: string | null
  instructions?: string | null
  total_marks: number
  duration_minutes?: number | null
  pass_percentage: number
  negative_marking: number
  max_attempts: number
  shuffle_questions: boolean
  shuffle_options: boolean
  show_answers_in_review: boolean
  results_visibility: ResultsVisibility
  results_published: boolean
  start_at?: string | null
  end_at?: string | null
  status: ExamStatus
  created_by?: string | null
  created_at: string
  updated_at: string
  question_count?: number
  class?: { id: string; name: string } | null
}

export interface ExamQuestion {
  id: string
  exam_id: string
  question_text: string
  options: string[]
  marks: number
  display_order: number
}

/** Question as edited by the admin, including its answer key. */
export interface ExamQuestionDraft {
  id?: string
  question_text: string
  options: string[]
  marks: number
  correct_option: number | null
  explanation?: string
}

export interface ExamAttempt {
  id: string
  exam_id: string
  student_id?: string
  score: number | null
  total_marks: number
  percentage: number | null
  correct_count: number | null
  wrong_count: number | null
  unanswered_count: number | null
  passed: boolean | null
  started_at: string
  submitted_at: string
  time_taken_seconds: number
  results_visible?: boolean
  student?: { id: string; full_name: string; email: string; student_id_number?: string | null } | null
}

export interface ReviewItem {
  question_id: string
  question_text: string
  options: string[]
  marks: number
  display_order: number
  selected_option: number | null
  correct_option: number | null
  explanation: string | null
}

export type ExamPayload = Omit<Exam, 'id' | 'created_at' | 'updated_at' | 'question_count' | 'class' | 'results_published'> & {
  results_published?: boolean
}

function fail(error: unknown, fallback: string): never {
  const message = (error as { message?: string })?.message || fallback
  throw new Error(message)
}

/** Exam availability from a student's point of view. */
export function examWindowState(exam: Pick<Exam, 'status' | 'start_at' | 'end_at'>, now = Date.now()) {
  if (exam.status === 'closed') return 'closed' as const
  if (exam.start_at && now < new Date(exam.start_at).getTime()) return 'upcoming' as const
  if (exam.end_at && now > new Date(exam.end_at).getTime()) return 'closed' as const
  return 'open' as const
}

export function resultsVisibleFor(exam: Pick<Exam, 'results_visibility' | 'results_published' | 'status' | 'end_at'>, now = Date.now()) {
  if (exam.results_visibility === 'immediate') return true
  if (exam.results_visibility === 'manual') return exam.results_published
  return exam.status === 'closed' || (!!exam.end_at && now >= new Date(exam.end_at).getTime())
}

export const examService = {
  // ─── Admin ────────────────────────────────────────────────────────────────
  async listAll(): Promise<Exam[]> {
    const { data, error } = await supabase
      .from('exams')
      .select('*, class:classes(id, name), exam_questions(count)')
      .order('created_at', { ascending: false })
    if (error) fail(error, 'Failed to load exams')
    return (data || []).map((row: any) => ({
      ...row,
      question_count: row.exam_questions?.[0]?.count ?? 0,
    }))
  },

  async getWithAnswerKey(examId: string): Promise<{ exam: Exam; questions: ExamQuestionDraft[] }> {
    const [{ data: exam, error: e1 }, { data: qs, error: e2 }, { data: keys, error: e3 }] = await Promise.all([
      supabase.from('exams').select('*').eq('id', examId).single(),
      supabase.from('exam_questions').select('*').eq('exam_id', examId).order('display_order'),
      supabase.from('exam_answer_keys').select('*').eq('exam_id', examId),
    ])
    if (e1) fail(e1, 'Exam not found')
    if (e2) fail(e2, 'Failed to load questions')
    if (e3) fail(e3, 'Failed to load answer key')
    const keyMap = new Map((keys || []).map((k: any) => [k.question_id, k]))
    return {
      exam: exam as Exam,
      questions: (qs || []).map((q: any) => ({
        id: q.id,
        question_text: q.question_text,
        options: Array.isArray(q.options) ? q.options : [],
        marks: Number(q.marks),
        correct_option: keyMap.get(q.id)?.correct_option ?? null,
        explanation: keyMap.get(q.id)?.explanation ?? '',
      })),
    }
  },

  /** Create or update an exam together with its full question set and answer key. */
  async save(examId: string | null, payload: ExamPayload, questions: ExamQuestionDraft[]): Promise<string> {
    let id = examId
    if (id) {
      const { error } = await supabase.from('exams').update(payload).eq('id', id)
      if (error) fail(error, 'Failed to update exam')
      // Replace question set (answer keys cascade)
      const { error: delErr } = await supabase.from('exam_questions').delete().eq('exam_id', id)
      if (delErr) fail(delErr, 'Failed to replace questions')
    } else {
      const { data, error } = await supabase.from('exams').insert(payload).select('id').single()
      if (error) fail(error, 'Failed to create exam')
      id = data.id as string
    }

    if (questions.length) {
      const rows = questions.map((q, i) => ({
        exam_id: id,
        question_text: q.question_text.trim(),
        options: q.options.map(o => o.trim()),
        marks: q.marks,
        display_order: i,
      }))
      const { data: inserted, error: qErr } = await supabase.from('exam_questions').insert(rows).select('id, display_order')
      if (qErr) fail(qErr, 'Failed to save questions')
      const byOrder = new Map((inserted || []).map((r: any) => [r.display_order, r.id]))
      const keyRows = questions
        .map((q, i) => ({
          question_id: byOrder.get(i),
          exam_id: id,
          correct_option: q.correct_option,
          explanation: q.explanation?.trim() || null,
        }))
        .filter(k => k.question_id && k.correct_option !== null)
      if (keyRows.length) {
        const { error: kErr } = await supabase.from('exam_answer_keys').insert(keyRows)
        if (kErr) fail(kErr, 'Failed to save answer key')
      }
    }
    return id!
  },

  async setStatus(examId: string, status: ExamStatus) {
    const { error } = await supabase.from('exams').update({ status }).eq('id', examId)
    if (error) fail(error, 'Failed to update status')
  },

  async setResultsPublished(examId: string, published: boolean) {
    const { error } = await supabase.from('exams').update({ results_published: published }).eq('id', examId)
    if (error) fail(error, 'Failed to update results')
  },

  async remove(examId: string) {
    const { error } = await supabase.from('exams').delete().eq('id', examId)
    if (error) fail(error, 'Failed to delete exam')
  },

  async getAttemptsForExam(examId: string): Promise<ExamAttempt[]> {
    const { data, error } = await supabase
      .from('exam_attempts')
      .select('*, student:profiles!exam_attempts_student_id_fkey(id, full_name, email, student_id_number)')
      .eq('exam_id', examId)
      .order('score', { ascending: false })
    if (error) fail(error, 'Failed to load results')
    return (data || []) as ExamAttempt[]
  },

  async deleteAttempt(attemptId: string) {
    const { error } = await supabase.from('exam_attempts').delete().eq('id', attemptId)
    if (error) fail(error, 'Failed to reset attempt')
  },

  // ─── Student ──────────────────────────────────────────────────────────────
  async listForStudent(): Promise<Exam[]> {
    // RLS limits this to published/closed exams for the student's class (or all students)
    const { data, error } = await supabase
      .from('exams')
      .select('*, exam_questions(count)')
      .in('status', ['published', 'closed'])
      .order('start_at', { ascending: true, nullsFirst: true })
    if (error) fail(error, 'Failed to load exams')
    return (data || []).map((row: any) => ({ ...row, question_count: row.exam_questions?.[0]?.count ?? 0 }))
  },

  async getQuestionsForStudent(examId: string): Promise<ExamQuestion[]> {
    const { data, error } = await supabase
      .from('exam_questions')
      .select('id, exam_id, question_text, options, marks, display_order')
      .eq('exam_id', examId)
      .order('display_order')
    if (error) fail(error, 'Failed to load questions')
    return (data || []).map((q: any) => ({ ...q, options: Array.isArray(q.options) ? q.options : [], marks: Number(q.marks) }))
  },

  async getMyAttempts(): Promise<ExamAttempt[]> {
    const { data, error } = await supabase.rpc('get_my_exam_attempts')
    if (error) fail(error, 'Failed to load your attempts')
    return (data || []) as ExamAttempt[]
  },

  async getExamForStudent(examId: string): Promise<Exam> {
    const { data, error } = await supabase.from('exams').select('*').eq('id', examId).single()
    if (error) fail(error, 'Exam not found or not available to you')
    return data as Exam
  },

  /** Submits answers ({ question_id: original option index }); returns the new attempt id. */
  async submit(examId: string, answers: Record<string, number>, startedAt: string): Promise<string> {
    const { data, error } = await supabase.rpc('submit_exam_attempt', {
      p_exam_id: examId,
      p_answers: answers,
      p_started_at: startedAt,
    })
    if (error) fail(error, 'Failed to submit exam')
    return data as string
  },

  async getReview(attemptId: string): Promise<ReviewItem[]> {
    const { data, error } = await supabase.rpc('get_exam_attempt_review', { p_attempt_id: attemptId })
    if (error) fail(error, 'Failed to load review')
    return ((data || []) as any[]).map(r => ({ ...r, options: Array.isArray(r.options) ? r.options : [], marks: Number(r.marks) }))
  },
}
