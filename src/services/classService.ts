import { supabase } from '../lib/supabase'
import type { Class } from '../types'

export const classService = {
  async getAll(organizationId: string, categoryId?: string): Promise<Class[]> {
    let query = supabase
      .from('classes')
      .select('*, category:categories(*)')
      .eq('organization_id', organizationId)
      .neq('status', 'archived')
      .order('display_order', { ascending: true })
    if (categoryId) query = query.eq('category_id', categoryId)
    const { data, error } = await query
    if (error) throw error
    return data || []
  },

  async getById(id: string): Promise<Class> {
    const { data, error } = await supabase
      .from('classes')
      .select('*, category:categories(*)')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  },

  async create(payload: Partial<Class>): Promise<Class> {
    const { data, error } = await supabase
      .from('classes')
      .insert(payload)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async update(id: string, payload: Partial<Class>): Promise<Class> {
    const { data, error } = await supabase
      .from('classes')
      .update(payload)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async reorder(items: { id: string; display_order: number }[]) {
    const updates = items.map(({ id, display_order }) =>
      supabase.from('classes').update({ display_order }).eq('id', id)
    )
    await Promise.all(updates)
  },

  async archive(id: string) {
    return classService.update(id, { status: 'archived' })
  },

  async delete(id: string): Promise<void> {
    // Clean up enrollments for this class
    await supabase.from('enrollments').delete().eq('class_id', id)

    // Clean up subjects and their chapters/contents
    const { data: subs } = await supabase.from('subjects').select('id').eq('class_id', id)
    if (subs && subs.length > 0) {
      const subIds = subs.map(s => s.id)
      const { data: chaps } = await supabase.from('chapters').select('id').in('subject_id', subIds)
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
      await supabase.from('subjects').delete().in('id', subIds)
    }

    const { error } = await supabase
      .from('classes')
      .delete()
      .eq('id', id)
    if (error) throw error
  },
}

