import { supabase, isUuid } from '../lib/supabase'
import type { Class } from '../types'
import { SYLLABUS_SPECS } from './curriculumData'

export const classService = {
  /**
   * Resolves a class identifier (which may be a database UUID or a custom catalog slug like "cat-cls-class5")
   * to an actual database Class record with a valid UUID.
   */
  async resolveClassRecord(classIdentifier?: string | null, organizationId?: string): Promise<Class | null> {
    if (!classIdentifier || typeof classIdentifier !== 'string') return null

    // 1. If already a valid UUID, look up directly by id
    if (isUuid(classIdentifier)) {
      try {
        const { data } = await supabase
          .from('classes')
          .select('*, category:categories(*)')
          .eq('id', classIdentifier)
          .maybeSingle()
        if (data) return data
      } catch {}
    }

    // 2. Identify curriculum spec from custom slug, gradeKey, name, or code
    const cleanSlug = classIdentifier.toLowerCase().replace(/^(cat-cls-|cls-)/, '')
    const spec = SYLLABUS_SPECS.find(s =>
      s.gradeKey.toLowerCase() === cleanSlug ||
      s.name.toLowerCase().replace(/[\s-_]/g, '') === classIdentifier.toLowerCase().replace(/[\s-_]/g, '') ||
      (s.code && s.code.toLowerCase() === classIdentifier.toLowerCase()) ||
      classIdentifier.toLowerCase().includes(s.gradeKey.toLowerCase())
    )

    // 3. Search database classes by matching name or code
    try {
      let query = supabase
        .from('classes')
        .select('*, category:categories(*)')
        .neq('status', 'archived')

      if (organizationId && isUuid(organizationId)) {
        query = query.eq('organization_id', organizationId)
      }

      const { data: dbClasses } = await query
      if (dbClasses && dbClasses.length > 0) {
        const matched = dbClasses.find(c =>
          (spec && c.name.toLowerCase().replace(/[\s-_]/g, '') === spec.name.toLowerCase().replace(/[\s-_]/g, '')) ||
          (spec?.code && c.code && c.code.toLowerCase() === spec.code.toLowerCase()) ||
          c.name.toLowerCase().replace(/[\s-_]/g, '') === classIdentifier.toLowerCase().replace(/[\s-_]/g, '') ||
          (spec && c.name.toLowerCase().includes(spec.name.toLowerCase()))
        )
        if (matched) return matched
      }

      // If org-specific query returned nothing, search database classes globally
      if (organizationId) {
        const { data: globalClasses } = await supabase
          .from('classes')
          .select('*, category:categories(*)')
          .neq('status', 'archived')
        if (globalClasses && globalClasses.length > 0) {
          const matchedGlobal = globalClasses.find(c =>
            (spec && c.name.toLowerCase().replace(/[\s-_]/g, '') === spec.name.toLowerCase().replace(/[\s-_]/g, '')) ||
            (spec?.code && c.code && c.code.toLowerCase() === spec.code.toLowerCase()) ||
            c.name.toLowerCase().replace(/[\s-_]/g, '') === classIdentifier.toLowerCase().replace(/[\s-_]/g, '') ||
            (spec && c.name.toLowerCase().includes(spec.name.toLowerCase()))
          )
          if (matchedGlobal) return matchedGlobal
        }
      }
    } catch {}

    // 4. If still not in database and we have an organization, attempt to auto-create standard class
    if (organizationId && isUuid(organizationId) && spec) {
      try {
        let { data: cat } = await supabase
          .from('categories')
          .select('id')
          .eq('organization_id', organizationId)
          .limit(1)
          .maybeSingle()

        if (!cat) {
          const { data: newCat } = await supabase
            .from('categories')
            .insert({
              organization_id: organizationId,
              name: 'AI Olympiad Curriculum',
              slug: 'ai-curriculum',
              status: 'published',
              display_order: 1
            })
            .select('id')
            .maybeSingle()
          cat = newCat
        }

        if (cat?.id && isUuid(cat.id)) {
          const dispOrder = SYLLABUS_SPECS.indexOf(spec) + 1
          const { data: createdCls } = await supabase
            .from('classes')
            .insert({
              organization_id: organizationId,
              category_id: cat.id,
              name: spec.name,
              code: spec.code,
              status: 'published',
              display_order: dispOrder
            })
            .select('*, category:categories(*)')
            .maybeSingle()

          if (createdCls) return createdCls
        }
      } catch {}
    }

    return null
  },

  async getAll(organizationId: string, categoryId?: string): Promise<Class[]> {
    let query = supabase
      .from('classes')
      .select('*, category:categories(*)')
      .eq('organization_id', organizationId)
      .neq('status', 'archived')
      .order('display_order', { ascending: true })

    if (categoryId) {
      if (isUuid(categoryId)) {
        query = query.eq('category_id', categoryId)
      } else {
        // Never pass a non-UUID string to the UUID column category_id
        return []
      }
    }

    const { data, error } = await query
    if (error) throw error
    return data || []
  },

  async getById(id: string): Promise<Class> {
    if (!isUuid(id)) {
      const resolved = await classService.resolveClassRecord(id)
      if (resolved) return resolved
      throw new Error(`Class "${id}" not found`)
    }

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
    if (!isUuid(id)) throw new Error(`Invalid class ID: ${id}`)
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
    const validItems = items.filter(i => isUuid(i.id))
    const updates = validItems.map(({ id, display_order }) =>
      supabase.from('classes').update({ display_order }).eq('id', id)
    )
    await Promise.all(updates)
  },

  async archive(id: string) {
    if (!isUuid(id)) return
    return classService.update(id, { status: 'archived' })
  },

  async delete(id: string): Promise<void> {
    if (!isUuid(id)) return

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
