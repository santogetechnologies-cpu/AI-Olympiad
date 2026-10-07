import { supabase, isUuid } from '../lib/supabase'
import type { ChapterContent, ContentType } from '../types'

export const chapterContentService = {
  async getByChapter(chapterId: string, includeAll = false): Promise<ChapterContent[]> {
    if (!isUuid(chapterId)) return []

    let query = supabase
      .from('chapter_content')
      .select(`
        *,
        video:videos(*),
        lesson:lessons(*),
        worksheet:worksheets(*),
        activity:activities(*),
        assignment:assignments(*),
        quiz:quizzes(*)
      `)
      .eq('chapter_id', chapterId)
      .order('display_order', { ascending: true })
    
    if (!includeAll) {
      query = query.neq('status', 'archived')
    }
    
    const { data, error } = await query
    if (error) throw error
    return (data || []) as ChapterContent[]
  },

  async getPublishedByChapter(chapterId: string): Promise<ChapterContent[]> {
    if (!isUuid(chapterId)) return []

    const { data, error } = await supabase
      .from('chapter_content')
      .select(`
        *,
        video:videos(*),
        lesson:lessons(*),
        worksheet:worksheets(*),
        activity:activities(*),
        assignment:assignments(*),
        quiz:quizzes(*)
      `)
      .eq('chapter_id', chapterId)
      .eq('status', 'published')
      .order('display_order', { ascending: true })
    if (error) throw error
    return (data || []) as ChapterContent[]
  },

  async getById(id: string): Promise<ChapterContent | null> {
    if (!isUuid(id)) return null

    const { data, error } = await supabase
      .from('chapter_content')
      .select(`
        *,
        video:videos(*),
        lesson:lessons(*),
        worksheet:worksheets(*),
        activity:activities(*),
        assignment:assignments(*),
        quiz:quizzes(*)
      `)
      .eq('id', id)
      .maybeSingle()
    if (error) throw error
    return data as ChapterContent
  },

  async create(payload: {
    organization_id: string
    chapter_id: string
    content_type: ContentType
    title: string
    description?: string
    display_order: number
    is_required?: boolean
    status?: 'draft' | 'published' | 'archived'
    created_by: string
  }): Promise<ChapterContent> {
    const { data, error } = await supabase
      .from('chapter_content')
      .insert({
        status: 'published',
        ...payload,
      })
      .select()
      .single()
    if (error) throw error
    return data
  },

  async update(id: string, payload: Partial<ChapterContent>): Promise<ChapterContent> {
    const { data, error } = await supabase
      .from('chapter_content')
      .update(payload)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async reorder(items: { id: string; display_order: number }[]) {
    const updates = items.map(({ id, display_order }) =>
      supabase.from('chapter_content').update({ display_order }).eq('id', id)
    )
    await Promise.all(updates)
  },

  async publish(id: string) {
    return chapterContentService.update(id, { status: 'published' })
  },

  async unpublish(id: string) {
    return chapterContentService.update(id, { status: 'draft' })
  },

  async archive(id: string) {
    return chapterContentService.update(id, { status: 'archived' })
  },

  async duplicate(id: string, newOrder: number): Promise<ChapterContent> {
    const original = await chapterContentService.getById(id)
    if (!original) throw new Error('Content not found')
    const { data, error } = await supabase
      .from('chapter_content')
      .insert({
        organization_id: original.organization_id,
        chapter_id: original.chapter_id,
        content_type: original.content_type,
        title: `${original.title} (Copy)`,
        description: original.description,
        display_order: newOrder,
        is_required: original.is_required,
        status: 'draft',
        created_by: original.created_by,
      })
      .select()
      .single()
    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('chapter_content')
      .delete()
      .eq('id', id)
    if (error) throw error
  },
}
