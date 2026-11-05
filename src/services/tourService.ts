import { supabase } from '../lib/supabase'

export const tourService = {
  /**
   * Permanently marks the sidebar tour as completed for the authenticated student.
   * Updates database via RPC with fallback to direct table update, and caches locally.
   */
  async completeSidebarTour(userId: string): Promise<boolean> {
    if (!userId) return false

    // Cache locally immediately to ensure no race conditions
    try {
      localStorage.setItem(`student_sidebar_tour_completed_${userId}`, 'true')
    } catch {
      // LocalStorage access might be blocked in some private contexts
    }

    // Handle demo student
    const demoStored = localStorage.getItem('nanjil_demo_auth')
    if (demoStored) {
      try {
        const parsed = JSON.parse(demoStored)
        if (parsed?.profile) {
          parsed.profile.sidebar_tour_completed = true
          localStorage.setItem('nanjil_demo_auth', JSON.stringify(parsed))
        }
      } catch {
        // ignore
      }
    }

    let success = false

    // 1. Try atomic RPC function
    try {
      const { data, error } = await supabase.rpc('complete_sidebar_tour')
      if (!error && data) {
        success = true
      }
    } catch (rpcErr) {
      console.warn('RPC complete_sidebar_tour failed, falling back to direct update:', rpcErr)
    }

    // 2. Direct table update fallback
    if (!success) {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({ sidebar_tour_completed: true, updated_at: new Date().toISOString() })
          .eq('id', userId)

        if (!error) {
          success = true
        } else {
          console.warn('Direct profile update for sidebar tour error:', error)
        }
      } catch (err) {
        console.warn('Direct profile update exception:', err)
      }
    }

    // Notify all active tabs / components
    try {
      window.dispatchEvent(new CustomEvent('student_sidebar_tour_completed', { detail: { userId } }))
    } catch {
      // ignore
    }

    return success
  },

  /**
   * Checks whether the given student has completed or skipped the sidebar tour.
   */
  async isSidebarTourCompleted(userId: string, profileFlag?: boolean): Promise<boolean> {
    if (profileFlag === true) return true

    if (userId) {
      try {
        const cached = localStorage.getItem(`student_sidebar_tour_completed_${userId}`)
        if (cached === 'true') return true
      } catch {
        // ignore
      }

      try {
        const { data } = await supabase
          .from('profiles')
          .select('sidebar_tour_completed')
          .eq('id', userId)
          .maybeSingle()

        if (data?.sidebar_tour_completed) {
          try {
            localStorage.setItem(`student_sidebar_tour_completed_${userId}`, 'true')
          } catch {
            // ignore
          }
          return true
        }
      } catch {
        // ignore
      }
    }

    return false
  },

  /**
   * Resets sidebar tour completion for a student (useful for testing or profile reset).
   */
  async resetSidebarTour(userId: string): Promise<boolean> {
    if (!userId) return false
    try {
      localStorage.removeItem(`student_sidebar_tour_completed_${userId}`)
      await supabase
        .from('profiles')
        .update({ sidebar_tour_completed: false })
        .eq('id', userId)
      return true
    } catch {
      return false
    }
  },

  /**
   * Permanently marks the PDF toolbar tour as completed across ALL chapters for the authenticated student.
   * Updates database via RPC with fallback to direct table update, and caches locally.
   */
  async completePdfTour(userId: string, organizationId?: string): Promise<boolean> {
    if (!userId) return false

    // Cache locally immediately to ensure no race conditions
    try {
      localStorage.setItem(`student_pdf_tour_completed_${userId}`, 'true')
      localStorage.setItem(`nanjil_pdf_tutorial_completed_${userId}`, 'true')
    } catch {
      // ignore
    }

    // Handle demo student
    const demoStored = localStorage.getItem('nanjil_demo_auth')
    if (demoStored) {
      try {
        const parsed = JSON.parse(demoStored)
        if (parsed?.profile) {
          parsed.profile.pdf_tour_completed = true
          localStorage.setItem('nanjil_demo_auth', JSON.stringify(parsed))
        }
      } catch {
        // ignore
      }
    }

    let success = false

    // 1. Try atomic RPC function
    try {
      const { data, error } = await supabase.rpc('complete_pdf_tour')
      if (!error && data) {
        success = true
      }
    } catch (rpcErr) {
      console.warn('RPC complete_pdf_tour failed, falling back to direct update:', rpcErr)
    }

    // 2. Direct table update fallback
    if (!success) {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({ pdf_tour_completed: true, updated_at: new Date().toISOString() })
          .eq('id', userId)

        if (!error) {
          success = true
        } else {
          console.warn('Direct profile update for pdf tour error:', error)
        }
      } catch (err) {
        console.warn('Direct profile update exception:', err)
      }
    }

    // 3. Also update student_tutorial_progress table
    try {
      const payload: any = {
        student_id: userId,
        tour_id: 'pdf_studio_tour',
        completed: true,
        last_step: 9,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      if (organizationId) payload.organization_id = organizationId
      await supabase.from('student_tutorial_progress').upsert(payload, {
        onConflict: 'student_id,tour_id'
      })
    } catch {
      // ignore
    }

    // Notify all active tabs / components
    try {
      window.dispatchEvent(new CustomEvent('student_pdf_tour_completed', { detail: { userId } }))
    } catch {
      // ignore
    }

    return success
  },

  /**
   * Checks whether the given student has completed or skipped the PDF toolbar tour.
   */
  async isPdfTourCompleted(userId: string, profileFlag?: boolean): Promise<boolean> {
    if (profileFlag === true) return true

    if (userId) {
      try {
        const cached = localStorage.getItem(`student_pdf_tour_completed_${userId}`)
        if (cached === 'true') return true
        const cachedLegacy = localStorage.getItem(`nanjil_pdf_tutorial_completed_${userId}`)
        if (cachedLegacy === 'true') return true
      } catch {
        // ignore
      }

      // Check profiles table
      try {
        const { data } = await supabase
          .from('profiles')
          .select('pdf_tour_completed')
          .eq('id', userId)
          .maybeSingle()

        if (data?.pdf_tour_completed) {
          try {
            localStorage.setItem(`student_pdf_tour_completed_${userId}`, 'true')
          } catch {
            // ignore
          }
          return true
        }
      } catch {
        // ignore
      }

      // Check student_tutorial_progress table
      try {
        const { data } = await supabase
          .from('student_tutorial_progress')
          .select('completed')
          .eq('student_id', userId)
          .eq('tour_id', 'pdf_studio_tour')
          .maybeSingle()

        if (data?.completed) {
          try {
            localStorage.setItem(`student_pdf_tour_completed_${userId}`, 'true')
          } catch {
            // ignore
          }
          return true
        }
      } catch {
        // ignore
      }
    }

    return false
  },

  /**
   * Resets PDF toolbar tour completion for a student (useful for testing or profile reset).
   */
  async resetPdfTour(userId: string): Promise<boolean> {
    if (!userId) return false
    try {
      localStorage.removeItem(`student_pdf_tour_completed_${userId}`)
      localStorage.removeItem(`nanjil_pdf_tutorial_completed_${userId}`)
      await supabase
        .from('profiles')
        .update({ pdf_tour_completed: false })
        .eq('id', userId)
      await supabase
        .from('student_tutorial_progress')
        .delete()
        .eq('student_id', userId)
        .eq('tour_id', 'pdf_studio_tour')
      return true
    } catch {
      return false
    }
  }
}
