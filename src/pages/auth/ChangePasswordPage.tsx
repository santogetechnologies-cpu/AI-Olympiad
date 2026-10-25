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
    <div className="h-screen h-[100dvh] max-h-screen max-h-[100dvh] w-full overflow-hidden bg-[#f8fafc] text-slate-800 flex flex-col justify-between p-2 sm:p-4 font-sans select-none">
      {/* Top Header Logo */}
      <header className="w-full flex items-center justify-center sm:justify-start shrink-0 py-0.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-xl bg-amber-50 border border-amber-200 p-0.5 flex items-center justify-center shrink-0 shadow-2xs">
            <img src="/mama-ada-logo.png" alt="Mamma Ada LMS" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="text-xs sm:text-sm font-black tracking-tight text-[#0f244a] block leading-none">
              Mamma Ada LMS
            </span>
            <span className="text-[8px] sm:text-[10px] font-bold text-amber-600 tracking-wider uppercase block mt-0.5">
              Global AI Olympiad
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area: Responsive Split (Desktop Left/Right, Mobile Stacked) */}
      <main className="flex-1 min-h-0 flex items-center justify-center py-0.5 px-2">
        <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-1.5 sm:gap-3 md:gap-10 lg:gap-14">
          
          {/* Mascot Section: Big on Left on Desktop, Above form on Mobile */}
          <div className="flex flex-col items-center justify-center text-center shrink-0">
            {/* Mascot Container: w-24 h-24 sm:w-32 sm:h-32 on mobile, w-56 to w-64 on desktop */}
            <InteractiveRobotMascot
              isPasswordFocused={isTypingPassword}
              isPeeking={showPassword}
              isLoading={loading}
              robotClassName="w-24 h-24 xs:w-28 xs:h-28 sm:w-36 sm:h-36 md:w-56 md:h-56 lg:w-64 lg:h-64"
              customStatus="Set your secure password"
            />
            {/* Desktop Mascot Subtext */}
            <div className="hidden md:block mt-2.5 max-w-[240px]">
              <h2 className="text-sm font-black text-slate-800">Your AI Study Buddy</h2>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Keeping your credentials safe while you explore the Global AI Olympiad.
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="w-full max-w-[340px] sm:max-w-sm md:max-w-md bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-[0_8px_30px_rgba(15,35,80,0.05),0_2px_6px_rgba(15,35,80,0.02)] border border-slate-200/90 transition-all shrink-0">
            {/* Form Header */}
            <div className="text-center sm:text-left mb-2 sm:mb-3">
              <h1 className="text-base sm:text-xl font-black text-slate-900 tracking-tight leading-tight">
                Set New Password
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                Create a secure password for your student account.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-2.5">
              {/* New Password */}
              <div>
                <label className="block text-[9px] sm:text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-0.5">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    onFocus={() => setFocusedField('newPassword')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full h-8.5 sm:h-9.5 pl-8.5 pr-8.5 rounded-lg sm:rounded-xl bg-[#f4f7fc]/90 hover:bg-[#f4f7fc] focus:bg-white border border-[#e2e8f0] focus:border-[#0f244a] focus:ring-2 focus:ring-blue-900/10 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors cursor-pointer"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[9px] sm:text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-0.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full h-8.5 sm:h-9.5 pl-8.5 pr-8.5 rounded-lg sm:rounded-xl bg-[#f4f7fc]/90 hover:bg-[#f4f7fc] focus:bg-white border border-[#e2e8f0] focus:border-[#0f244a] focus:ring-2 focus:ring-blue-900/10 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-0.5">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-8.5 sm:h-9.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm shadow-xs hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
                >
                  {loading ? (
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 size={15} />
                      <span>Save & Continue</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Minimal Bottom Action */}
            <div className="mt-2 pt-1.5 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={() => signOut()}
                className="text-[11px] text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                Log out and return later
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-0.5 text-center text-[9px] sm:text-[10px] text-slate-400 shrink-0">
        © {new Date().getFullYear()} Mamma Ada LMS • Global AI Olympiad
      </footer>
    </div>
  )
}
