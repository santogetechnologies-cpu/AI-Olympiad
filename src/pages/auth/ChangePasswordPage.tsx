import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import { Card, Button, Input } from '../../components/ui'
import { Lock, ShieldAlert, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ChangePasswordPage() {
  const { user, refreshUser, signOut } = useAuth()
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      // 1. Update Supabase Auth password
      const { error: authError } = await supabase.auth.updateUser({ password: newPassword })
      if (authError) throw authError

      // 2. Mark must_change_password as false in profiles
      if (user?.id) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ must_change_password: false })
          .eq('id', user.id)
        if (profileError) throw profileError
      }

      toast.success('Password updated successfully!')
      await refreshUser()
      navigate('/student', { replace: true })
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Failed to update password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 shadow-xl border-slate-200">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
            <ShieldAlert size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Set New Password</h1>
          <p className="text-slate-500 text-sm mt-2">
            Welcome, <strong>{user?.profile.full_name || 'Student'}</strong>! For security reasons, you must change your temporary password before accessing your learning dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              New Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                type="password"
                placeholder="Enter new password (min 6 characters)"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
                className="pl-9"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                type="password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                className="pl-9"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 flex items-center justify-center gap-2 font-semibold shadow-md"
            >
              <CheckCircle size={18} />
              {loading ? 'Updating Password...' : 'Save & Continue to Learning'}
            </Button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={() => signOut()}
            className="text-xs text-slate-500 hover:text-red-600 transition"
          >
            Log out and return later
          </button>
        </div>
      </Card>
    </div>
  )
}
