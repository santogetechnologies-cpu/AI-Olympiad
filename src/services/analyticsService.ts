import { supabase } from '../lib/supabase'

export const analyticsService = {
  async getAdminStats(organizationId: string) {
    const [
      { count: totalStudents },
      { count: totalManagers },
      { count: totalCategories },
      { count: totalClasses },
      { count: totalSubjects },
      { count: totalChapters },
      { count: totalContent },
      { count: publishedContent },
      { count: draftContent },
    ] = await Promise.all([
      supabase.from('user_roles').select('id, roles!inner(name)', { count: 'exact', head: true })
        .eq('organization_id', organizationId)
        .eq('roles.name', 'student'),
      supabase.from('user_roles').select('id', { count: 'exact', head: true })
        .eq('organization_id', organizationId),
      supabase.from('categories').select('id', { count: 'exact', head: true }).eq('organization_id', organizationId).neq('status','archived'),
      supabase.from('classes').select('id', { count: 'exact', head: true }).eq('organization_id', organizationId).neq('status','archived'),
      supabase.from('subjects').select('id', { count: 'exact', head: true }).eq('organization_id', organizationId).neq('status','archived'),
      supabase.from('chapters').select('id', { count: 'exact', head: true }).eq('organization_id', organizationId).neq('status','archived'),
      supabase.from('chapter_content').select('id', { count: 'exact', head: true }).eq('organization_id', organizationId).neq('status','archived'),
      supabase.from('chapter_content').select('id', { count: 'exact', head: true }).eq('organization_id', organizationId).eq('status','published'),
      supabase.from('chapter_content').select('id', { count: 'exact', head: true }).eq('organization_id', organizationId).eq('status','draft'),
    ])

    return {
      totalStudents: totalStudents || 0,
      totalManagers: totalManagers || 0,
      totalCategories: totalCategories || 0,
      totalClasses: totalClasses || 0,
      totalSubjects: totalSubjects || 0,
      totalChapters: totalChapters || 0,
      totalContent: totalContent || 0,
      publishedContent: publishedContent || 0,
      draftContent: draftContent || 0,
    }
  },

  async getContentManagerStats(organizationId: string, userId: string) {
    const [
      { count: totalChapters },
      { count: totalContent },
      { count: published },
      { count: draft },
    ] = await Promise.all([
      supabase.from('chapters').select('id', { count: 'exact', head: true }).eq('organization_id', organizationId).eq('created_by', userId),
      supabase.from('chapter_content').select('id', { count: 'exact', head: true }).eq('organization_id', organizationId).eq('created_by', userId),
      supabase.from('chapter_content').select('id', { count: 'exact', head: true }).eq('organization_id', organizationId).eq('created_by', userId).eq('status', 'published'),
      supabase.from('chapter_content').select('id', { count: 'exact', head: true }).eq('organization_id', organizationId).eq('created_by', userId).eq('status', 'draft'),
    ])

    return {
      totalChapters: totalChapters || 0,
      totalContent: totalContent || 0,
      published: published || 0,
      draft: draft || 0,
    }
  },

  async getStudentStats(studentId: string, organizationId: string) {
    const { data: progress } = await supabase
      .from('student_content_progress')
      .select('status, time_spent')
      .eq('student_id', studentId)
      .eq('organization_id', organizationId)
    
    const items = progress || []
    const completed = items.filter(i => i.status === 'completed').length
    const totalTime = items.reduce((s, i) => s + (i.time_spent || 0), 0)

    const { data: attempts } = await supabase
      .from('quiz_attempts')
      .select('percentage')
      .eq('student_id', studentId)
      .eq('status', 'completed')
    
    const quizAvg = attempts && attempts.length > 0
      ? attempts.reduce((s, a) => s + (a.percentage || 0), 0) / attempts.length
      : 0

    return { completed, totalTime, quizAvg, totalItems: items.length }
  },

  async getRecentActivity(organizationId: string, limit = 10) {
    const { data } = await supabase
      .from('audit_logs')
      .select('*, profile:profiles(full_name, avatar_url)')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false })
      .limit(limit)
    return data || []
  },
}

export const notificationService = {
  async getForUser(userId: string, limit = 20) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)
    if (error) throw error
    return data || []
  },

  async markRead(id: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id)
    if (error) throw error
  },

  async markAllRead(userId: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
    if (error) throw error
  },

  async create(payload: {
    organization_id: string
    user_id: string
    title: string
    message: string
    type: string
    entity_type?: string
    entity_id?: string
  }) {
    const { error } = await supabase.from('notifications').insert(payload)
    if (error) throw error
  },

  async getUnreadCount(userId: string): Promise<number> {
    const { count } = await supabase
      .from('notifications')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false)
    return count || 0
  },
}

export const auditService = {
  async log(payload: {
    organization_id: string
    user_id: string
    action: string
    entity_type: string
    entity_id?: string
    old_data?: Record<string, unknown>
    new_data?: Record<string, unknown>
  }) {
    await supabase.from('audit_logs').insert(payload)
  },

  async getRecentActivity(organizationId: string, limit = 10) {
    const { data } = await supabase
      .from('audit_logs')
      .select('*, profile:profiles(full_name, avatar_url)')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false })
      .limit(limit)
    return data || []
  },

  async _noop() {
  },
}

export const userService = {
  async getAll(organizationId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*, user_roles(*, role:roles(*))')
      .eq('organization_id', organizationId)
      .neq('status', 'suspended')
      .order('full_name', { ascending: true })
    if (error) throw error
    return data || []
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*, user_roles(*, role:roles(*))')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  },

  async updateProfile(id: string, payload: { full_name?: string; phone?: string; avatar_url?: string }) {
    const { data, error } = await supabase
      .from('profiles')
      .update(payload)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async assignRole(userId: string, roleId: string, organizationId: string) {
    const { error } = await supabase
      .from('user_roles')
      .upsert({ user_id: userId, role_id: roleId, organization_id: organizationId })
    if (error) throw error
  },

  async getRoles() {
    const { data, error } = await supabase.from('roles').select('*')
    if (error) throw error
    return data || []
  },

  async deleteStudent(studentId: string, organizationId: string, callerRole?: string) {
    if (callerRole && callerRole !== 'admin') {
      throw new Error('Unauthorized: Content Managers and other staff cannot remove students. Only Administrators have permission.')
    }

    try {
      // 1. Delete student enrollments
      try {
        await supabase
          .from('enrollments')
          .delete()
          .eq('student_id', studentId)
      } catch {}

      // 2. Delete student content progress
      try {
        await supabase
          .from('student_content_progress')
          .delete()
          .eq('student_id', studentId)
      } catch {}

      // 3. Delete student user roles
      try {
        await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', studentId)
      } catch {}

      // 4. Mark student profile as suspended/deleted to block any future logins
      try {
        const { error: profileErr } = await supabase
          .from('profiles')
          .update({ status: 'suspended' })
          .eq('id', studentId)

        if (profileErr) {
          // Try deleting profile directly if update fails
          await supabase
            .from('profiles')
            .delete()
            .eq('id', studentId)
        }
      } catch {}

      // 5. Clean up any local storage caches
      try {
        localStorage.removeItem(`nanjil_enrollment_${studentId}`)
        localStorage.removeItem(`enrolled_classes_${studentId}`)
        Object.keys(localStorage).forEach(k => {
          if (k.startsWith(`progress_${studentId}_`)) {
            localStorage.removeItem(k)
          }
        })
      } catch {}

      return { success: true }
    } catch (err: any) {
      throw new Error(err.message || 'Failed to remove student account')
    }
  },
}
