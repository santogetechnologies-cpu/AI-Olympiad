import { supabase } from '../lib/supabase'
import type { Category } from '../types'

export const categoryService = {
  async getAll(organizationId: string): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('organization_id', organizationId)
      .neq('status', 'archived')
      .order('display_order', { ascending: true })
    if (error) throw error
    return data || []
  },

  async getPublished(organizationId: string): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('status', 'published')
      .order('display_order', { ascending: true })
    if (error) throw error
    return data || []
  },

  async getById(id: string): Promise<Category> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  },

  async create(payload: Partial<Category>): Promise<Category> {
    const { data, error } = await supabase
      .from('categories')
      .insert(payload)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async update(id: string, payload: Partial<Category>): Promise<Category> {
    const { data, error } = await supabase
      .from('categories')
      .update(payload)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async reorder(items: { id: string; display_order: number }[]) {
    const updates = items.map(({ id, display_order }) =>
      supabase.from('categories').update({ display_order }).eq('id', id)
    )
    await Promise.all(updates)
  },

  async archive(id: string) {
    return categoryService.update(id, { status: 'archived' })
  },

  async delete(id: string): Promise<void> {
    const { data: cls } = await supabase.from('classes').select('id').eq('category_id', id)
    if (cls && cls.length > 0) {
      for (const c of cls) {
        // Cascade delete each class
        await supabase.from('enrollments').delete().eq('class_id', c.id)
        const { data: subs } = await supabase.from('subjects').select('id').eq('class_id', c.id)
        if (subs && subs.length > 0) {
          const subIds = subs.map(s => s.id)
          const { data: chaps } = await supabase.from('chapters').select('id').in('subject_id', subIds)
          if (chaps && chaps.length > 0) {
            const chapIds = chaps.map(ch => ch.id)
            const { data: contents } = await supabase.from('chapter_content').select('id').in('chapter_id', chapIds)
            if (contents && contents.length > 0) {
              const contentIds = contents.map(cc => cc.id)
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
        await supabase.from('classes').delete().eq('id', c.id)
      }
    }

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)
    if (error) throw error
  },
}

