import { supabase, isUuid } from '../lib/supabase'
import type { Category } from '../types'

export const categoryService = {
  async resolveCategory(categoryIdentifier?: string | null, organizationId?: string): Promise<Category | null> {
    if (!categoryIdentifier || typeof categoryIdentifier !== 'string') return null

    if (isUuid(categoryIdentifier)) {
      try {
        const { data } = await supabase
          .from('categories')
          .select('*')
          .eq('id', categoryIdentifier)
          .maybeSingle()
        if (data) return data
      } catch {}
    }

    const cleanSlug = categoryIdentifier.toLowerCase().replace(/^cat-/, '')

    try {
      let query = supabase.from('categories').select('*').neq('status', 'archived')
      if (organizationId && isUuid(organizationId)) {
        query = query.eq('organization_id', organizationId)
      }
      const { data: cats } = await query
      if (cats && cats.length > 0) {
        const matched = cats.find(c =>
          c.slug.toLowerCase() === cleanSlug ||
          c.name.toLowerCase().includes(cleanSlug) ||
          c.name.toLowerCase() === 'ai olympiad'
        )
        if (matched) return matched
      }
    } catch {}

    return null
  },

  async getAll(organizationId: string): Promise<Category[]> {
    let query = supabase
      .from('categories')
      .select('*')
      .neq('status', 'archived')
      .order('display_order', { ascending: true })

    if (organizationId && isUuid(organizationId)) {
      query = query.eq('organization_id', organizationId)
    }

    const { data, error } = await query
    if (error) throw error
    return data || []
  },

  async getPublished(organizationId: string): Promise<Category[]> {
    let query = supabase
      .from('categories')
      .select('*')
      .eq('status', 'published')
      .order('display_order', { ascending: true })

    if (organizationId && isUuid(organizationId)) {
      query = query.eq('organization_id', organizationId)
    }

    const { data, error } = await query
    if (error) throw error
    return data || []
  },

  async getById(id: string): Promise<Category | null> {
    if (!isUuid(id)) {
      return categoryService.resolveCategory(id)
    }

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .maybeSingle()
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
    if (!isUuid(id)) throw new Error(`Invalid category ID: ${id}`)
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
    const validItems = items.filter(i => isUuid(i.id))
    const updates = validItems.map(({ id, display_order }) =>
      supabase.from('categories').update({ display_order }).eq('id', id)
    )
    await Promise.all(updates)
  },

  async archive(id: string) {
    if (!isUuid(id)) return
    return categoryService.update(id, { status: 'archived' })
  },

  async delete(id: string): Promise<void> {
    if (!isUuid(id)) return

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
