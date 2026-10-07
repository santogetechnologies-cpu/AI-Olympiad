import { supabase } from '../lib/supabase'
import type { Chapter } from '../types'

export const chapterService = {
  async getAll(organizationId: string, subjectId?: string): Promise<Chapter[]> {
    let query = supabase
      .from('chapters')
      .select('*, subject:subjects(*)')
      .eq('organization_id', organizationId)
      .neq('status', 'archived')
      .order('display_order', { ascending: true })
    if (subjectId) query = query.eq('subject_id', subjectId)
    const { data, error } = await query
    if (error) throw error
    return data || []
  },

  async getPublished(organizationId?: string, subjectId?: string): Promise<Chapter[]> {
    let query = supabase
      .from('chapters')
      .select('*, subject:subjects(*)')
      .neq('status', 'archived')
      .order('display_order', { ascending: true })

    if (organizationId) {
      query = query.eq('organization_id', organizationId)
    }
    if (subjectId) {
      query = query.eq('subject_id', subjectId)
    }

    const { data, error } = await query
    if (error) throw error

    if ((!data || data.length === 0) && subjectId && organizationId) {
      const fallback = await supabase
        .from('chapters')
        .select('*, subject:subjects(*)')
        .eq('subject_id', subjectId)
        .neq('status', 'archived')
        .order('display_order', { ascending: true })
      return fallback.data || []
    }

    return data || []
  },

  async getById(id: string): Promise<Chapter> {
    const { data, error } = await supabase
      .from('chapters')
      .select('*, subject:subjects(*, class:classes(*, category:categories(*)))')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  },

  async create(payload: Partial<Chapter>): Promise<Chapter> {
    const { data, error } = await supabase
      .from('chapters')
      .insert(payload)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async update(id: string, payload: Partial<Chapter>): Promise<Chapter> {
    const { data, error } = await supabase
      .from('chapters')
      .update(payload)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async publish(id: string) {
    return chapterService.update(id, { status: 'published' })
  },

  async unpublish(id: string) {
    return chapterService.update(id, { status: 'draft' })
  },

  async reorder(items: { id: string; display_order: number }[]) {
    const updates = items.map(({ id, display_order }) =>
      supabase.from('chapters').update({ display_order }).eq('id', id)
    )
    await Promise.all(updates)
  },

  async archive(id: string) {
    return chapterService.update(id, { status: 'archived' })
  },

  async delete(id: string) {
    const { data: contents } = await supabase.from('chapter_content').select('id').eq('chapter_id', id)
    if (contents && contents.length > 0) {
      const contentIds = contents.map(cc => cc.id)
      await supabase.from('workbook_submissions').delete().in('chapter_content_id', contentIds)
      await supabase.from('student_content_progress').delete().in('chapter_content_id', contentIds)
      await supabase.from('lessons').delete().in('chapter_content_id', contentIds)
      await supabase.from('videos').delete().in('chapter_content_id', contentIds)
      await supabase.from('worksheets').delete().in('chapter_content_id', contentIds)
      await supabase.from('activities').delete().in('chapter_content_id', contentIds)
      await supabase.from('quizzes').delete().in('chapter_content_id', contentIds)
      await supabase.from('chapter_content').delete().eq('chapter_id', id)
    }

    const { error } = await supabase
      .from('chapters')
      .delete()
      .eq('id', id)
    if (error) throw error
  },
}
