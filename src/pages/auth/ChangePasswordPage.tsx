import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'
import { Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import { InteractiveRobotMascot } from '../../components/auth/InteractiveRobotMascot'
import toast from 'react-hot-toast'

export default function ChangePasswordPage() {
  const { user, refreshUser, signOut } = useAuth()
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [focusedField, setFocusedField] = useState<'newPassword' | 'confirmPassword' | null>(null)
  const [loading, setLoading] = useState(false)

  const isTypingPassword =
    focusedField !== null ||
    newPassword.length > 0 ||
    confirmPassword.length > 0

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
    <div className="min-h-screen min-h-[100dvh] bg-[#f8fafc] text-slate-800 flex flex-col justify-between p-4 sm:p-6 font-sans select-none">
      {/* Top Header Logo */}
      <header className="w-full flex items-center justify-center sm:justify-start">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 p-0.5 flex items-center justify-center shrink-0 shadow-2xs">
            <img src="/mama-ada-logo.png" alt="Mamma Ada LMS" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="text-xs sm:text-sm font-black tracking-tight text-[#0f244a] block leading-tight">
              Mamma Ada LMS
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-amber-600 tracking-wider uppercase block">
              Global AI Olympiad
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center py-4 sm:py-6">
        <div className="w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(15,35,80,0.06),0_4px_12px_rgba(15,35,80,0.02)] border border-slate-200/90 transition-all">
          
          {/* Interactive Eye-Closing Robot Mascot */}
          <div className="mb-4">
            <InteractiveRobotMascot
              isPasswordFocused={isTypingPassword}
              isPeeking={showPassword}
              isLoading={loading}
              customStatus="Set your secure password"
            />
          </div>

          {/* Minimal Header */}
          <div className="text-center mb-5">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Set New Password
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Create a secure password for your account.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* New Password */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onFocus={() => setFocusedField('newPassword')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full h-11 pl-10 pr-10 rounded-2xl bg-[#f4f7fc]/90 hover:bg-[#f4f7fc] focus:bg-white border border-[#e2e8f0] focus:border-[#0f244a] focus:ring-4 focus:ring-blue-900/5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full h-11 pl-10 pr-10 rounded-2xl bg-[#f4f7fc]/90 hover:bg-[#f4f7fc] focus:bg-white border border-[#e2e8f0] focus:border-[#0f244a] focus:ring-4 focus:ring-blue-900/5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Save & Continue</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Minimal Bottom Action */}
          <div className="mt-5 pt-4 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => signOut()}
              className="text-xs text-slate-400 hover:text-slate-600 transition cursor-pointer"
            >
              Log out and return later
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-2 text-center text-[10px] text-slate-400">
        © {new Date().getFullYear()} Mamma Ada LMS • Global AI Olympiad
      </footer>
    </div>
  )
}
