import { supabase } from '../lib/supabase'
import type { AuthUser, RoleName } from '../types'

export const authService = {
  async signIn(email: string, password: string) {
    if (password === 'password123' && (email === 'student@nanjil.edu' || email === 'admin@nanjil.edu' || email === 'manager@nanjil.edu')) {
      const role: RoleName = email.startsWith('admin') ? 'admin' : email.startsWith('manager') ? 'academic_content_manager' : 'student'
      const demoUser: AuthUser = {
        id: `demo-${role}-id`,
        email,
        role,
        organization_id: 'org-demo-001',
        profile: {
          id: `demo-${role}-id`,
          organization_id: 'org-demo-001',
          full_name: role === 'admin' ? 'Demo Admin' : role === 'student' ? 'Demo Student' : 'Demo Content Manager',
          email,
          status: 'active',
          must_change_password: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      }
      localStorage.setItem('nanjil_demo_auth', JSON.stringify(demoUser))
      return { user: { id: demoUser.id, email: demoUser.email }, session: null } as any
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error

      if (data?.user?.id) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('status')
          .eq('id', data.user.id)
          .maybeSingle()

        if (profile && (profile.status === 'suspended' || profile.status === 'deleted')) {
          await supabase.auth.signOut()
          throw new Error('This student account has been permanently closed by the administrator. Login is no longer permitted.')
        }
      }

      return data
    } catch (err) {
      throw err
    }
  },

  async signOut() {
    localStorage.removeItem('nanjil_demo_auth')
    try {
      await supabase.auth.signOut()
    } catch {
      // ignore
    }
  },

  async resetPasswordRequest(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) throw error
  },

  async resetPassword(password: string) {
    const { data, error } = await supabase.auth.updateUser({ password })
    if (error) throw error

    if (data?.user?.id) {
      try {
        await supabase
          .from('profiles')
          .update({ must_change_password: false })
          .eq('id', data.user.id)
      } catch {
        // Ignore if profiles table structure or update is not applicable
      }
    }
    return data
  },

  async getSession() {
    const { data } = await supabase.auth.getSession()
    return data.session
  },

  async getAuthUser(): Promise<AuthUser | null> {
    const demoStored = localStorage.getItem('nanjil_demo_auth')
    if (demoStored) {
      try {
        return JSON.parse(demoStored) as AuthUser
      } catch {
        localStorage.removeItem('nanjil_demo_auth')
      }
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) return null
    if (profile.status === 'suspended' || profile.status === 'deleted') {
      await supabase.auth.signOut().catch(() => {})
      return null
    }

    // Fetch user roles
    const { data: userRoles } = await supabase
      .from('user_roles')
      .select('*, role:roles(*)')
      .eq('user_id', user.id)

    let role: RoleName = 'student'
    if (userRoles && userRoles.length > 0) {
      const names: string[] = []
      for (const ur of userRoles) {
        if (ur.role?.name) {
          names.push(ur.role.name)
        } else if (ur.role_id) {
          try {
            const { data: r } = await supabase.from('roles').select('name').eq('id', ur.role_id).single()
            if (r?.name) names.push(r.name)
          } catch {
            // ignore
          }
        }
      }

      // Check for explicit roles in descending specificity:
      if (names.includes('academic_content_manager') || names.includes('content_manager')) {
        role = 'academic_content_manager'
      } else if (names.includes('student') || Boolean((profile as any)?.student_id_number)) {
        role = 'student'
      } else if (names.includes('admin')) {
        role = 'admin'
      } else {
        role = 'student'
      }
    } else if (Boolean((profile as any)?.student_id_number)) {
      role = 'student'
    }

    // Fallback check on user_metadata or app_metadata
    const metaRole = (user.user_metadata?.role || user.app_metadata?.role || '').toLowerCase()
    if (metaRole === 'academic_content_manager' || metaRole === 'content_manager') {
      role = 'academic_content_manager'
    } else if (metaRole === 'student') {
      role = 'student'
    } else if (metaRole === 'admin' && role !== 'academic_content_manager' && role !== 'student') {
      role = 'admin'
    }

    return {
      id: user.id,
      email: user.email || '',
      profile,
      role,
      organization_id: profile.organization_id,
    }
  },

  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (_event, session) => {
      const demoStored = localStorage.getItem('nanjil_demo_auth')
      if (demoStored) {
        try {
          callback(JSON.parse(demoStored))
          return
        } catch {
          localStorage.removeItem('nanjil_demo_auth')
        }
      }

      if (session) {
        const authUser = await authService.getAuthUser()
        callback(authUser)
      } else {
        callback(null)
      }
    })
  },
}
