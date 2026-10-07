import { supabase } from '../lib/supabase'
import type { Subject } from '../types'

export const subjectService = {
  async getAll(organizationId: string, classId?: string): Promise<Subject[]> {
    let query = supabase
      .from('subjects')
      .select('*, class:classes(*)')
      .eq('organization_id', organizationId)
      .neq('status', 'archived')
      .order('display_order', { ascending: true })
    if (classId) query = query.eq('class_id', classId)
    const { data, error } = await query
    if (error) throw error
    return data || []
  },

  async getById(id: string): Promise<Subject> {
    const { data, error } = await supabase
      .from('subjects')
      .select('*, class:classes(*, category:categories(*))')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  },

  async create(payload: Partial<Subject>): Promise<Subject> {
    const { data, error } = await supabase
      .from('subjects')
      .insert(payload)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async update(id: string, payload: Partial<Subject>): Promise<Subject> {
    const { data, error } = await supabase
      .from('subjects')
      .update(payload)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async reorder(items: { id: string; display_order: number }[]) {
    const updates = items.map(({ id, display_order }) =>
      supabase.from('subjects').update({ display_order }).eq('id', id)
    )
    await Promise.all(updates)
  },

  async archive(id: string) {
    return subjectService.update(id, { status: 'archived' })
  },

  async delete(id: string): Promise<void> {
    // Clean up enrollments for this subject
    await supabase.from('enrollments').delete().eq('subject_id', id)

    // Clean up chapters and their contents
    const { data: chaps } = await supabase.from('chapters').select('id').eq('subject_id', id)
    if (chaps && chaps.length > 0) {
      const chapIds = chaps.map(c => c.id)
      const { data: contents } = await supabase.from('chapter_content').select('id').in('chapter_id', chapIds)
      if (contents && contents.length > 0) {
        const contentIds = contents.map(c => c.id)
        await supabase.from('workbook_submissions').delete().in('chapter_content_id', contentIds)
        await supabase.from('student_content_progress').delete().in('chapter_content_id', contentIds)
        await supabase.from('lessons').delete().in('chapter_content_id', contentIds)
        await supabase.from('videos').delete().in('chapter_content_id', contentIds)
        await supabase.from('worksheets').delete().in('chapter_content_id', contentIds)
        await supabase.from('activities').delete().in('chapter_content_id', contentIds)
        await supabase.from('quizzes').delete().in('chapter_content_id', contentIds)
        await supabase.from('chapter_content').delete().in('chapter_id', chapIds)
      }
      await supabase.from('chapters').delete().in('id', chapIds)
    }

    const { error } = await supabase
      .from('subjects')
      .delete()
      .eq('id', id)
    if (error) throw error
  },
}

