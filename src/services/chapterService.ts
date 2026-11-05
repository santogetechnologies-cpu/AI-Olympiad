import { supabase, isUuid } from '../lib/supabase'
import type { Chapter } from '../types'

export const chapterService = {
  async getAll(organizationId?: string, subjectId?: string): Promise<Chapter[]> {
    let query = supabase
      .from('chapters')
      .select('*, subject:subjects(*)')
      .neq('status', 'archived')
      .order('display_order', { ascending: true })

    if (organizationId && isUuid(organizationId)) {
      query = query.eq('organization_id', organizationId)
    }

    if (subjectId) {
      if (isUuid(subjectId)) {
        query = query.eq('subject_id', subjectId)
      } else {
        return []
      }
    }

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

    if (organizationId && isUuid(organizationId)) {
      query = query.eq('organization_id', organizationId)
    }

    if (subjectId) {
      if (isUuid(subjectId)) {
        query = query.eq('subject_id', subjectId)
      } else {
        return []
      }
    }

    const { data, error } = await query
    if (error) throw error

    if ((!data || data.length === 0) && subjectId && isUuid(subjectId) && organizationId) {
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

  async getById(id: string): Promise<Chapter | null> {
    if (!isUuid(id)) return null

    const { data, error } = await supabase
      .from('chapters')
      .select('*, subject:subjects(*, class:classes(*, category:categories(*)))')
      .eq('id', id)
      .maybeSingle()
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
    if (!isUuid(id)) throw new Error(`Invalid chapter ID: ${id}`)
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
    if (!isUuid(id)) return
    return chapterService.update(id, { status: 'published' })
  },

  async unpublish(id: string) {
    if (!isUuid(id)) return
    return chapterService.update(id, { status: 'draft' })
  },

  async reorder(items: { id: string; display_order: number }[]) {
    const validItems = items.filter(i => isUuid(i.id))
    const updates = validItems.map(({ id, display_order }) =>
      supabase.from('chapters').update({ display_order }).eq('id', id)
    )
    await Promise.all(updates)
  },

  async archive(id: string) {
    if (!isUuid(id)) return
    return chapterService.update(id, { status: 'archived' })
  },

  async delete(id: string) {
    if (!isUuid(id)) return

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
