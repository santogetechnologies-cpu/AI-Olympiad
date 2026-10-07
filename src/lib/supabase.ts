import { createClient } from '@supabase/supabase-js'

const globalProcessEnv = typeof globalThis !== 'undefined' ? (globalThis as unknown as { process?: { env?: Record<string, string> } }).process?.env : undefined
const supabaseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || globalProcessEnv?.VITE_SUPABASE_URL || 'https://mock.supabase.co'
const supabaseKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY) || globalProcessEnv?.VITE_SUPABASE_PUBLISHABLE_KEY || 'mock-key'

if (!supabaseUrl || !supabaseKey) {
  console.warn('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

export function isUuid(id?: string | null): boolean {
  if (!id || typeof id !== 'string') return false
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id.trim())
}

export type { User, Session } from '@supabase/supabase-js'
