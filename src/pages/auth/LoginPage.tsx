import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { authService } from '../../services/authService'
import { InteractiveRobotMascot } from '../../components/auth/InteractiveRobotMascot'
import toast from 'react-hot-toast'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // Robot interaction states
  const [focusedField, setFocusedField] = useState<'email' | 'password' | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const emailRegister = register('email')
  const passwordRegister = register('password')

  const passwordValue = watch('password')
  const isTypingPassword =
    focusedField === 'password' ||
    (passwordValue && passwordValue.length > 0 && focusedField !== 'email')

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || null

  const onSubmit = async (data: LoginForm) => {
    setLoading(true)
    try {
      await signIn(data.email, data.password)
      toast.success('Welcome back!')

      // Retrieve verified authenticated user role
      const authUser = await authService.getAuthUser()
      const role = authUser?.role || 'student'

      let destination =
        role === 'student'
          ? '/student'
          : role === 'academic_content_manager'
          ? '/content-manager'
          : '/admin'

      // If redirected from a deep link that matches the user's role, preserve it
      if (
        from &&
        ((role === 'student' && from.startsWith('/student')) ||
          (role === 'academic_content_manager' && from.startsWith('/content-manager')) ||
          (role === 'admin' &&
            (from.startsWith('/admin') ||
              from.startsWith('/content-manager') ||
              from.startsWith('/settings'))))
      ) {
        destination = from
      }

      navigate(destination, { replace: true })
    } catch (err: unknown) {
      let message = 'Invalid email or password. Please try again.'
      if (err instanceof Error) {
        if (err.message.includes('Invalid login credentials')) {
          message = 'Invalid email or password. Please check your credentials.'
        } else if (err.message.includes('Email not confirmed')) {
          message = 'Please confirm your email address before signing in.'
        } else if (
          err.message.toLowerCase().includes('database') ||
          err.message.toLowerCase().includes('schema')
        ) {
          message =
            'Invalid credentials or account setup in progress. Please contact your administrator.'
        } else {
          message = err.message
        }
      }
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen h-[100dvh] max-h-screen max-h-[100dvh] w-full bg-white text-slate-900 flex flex-col font-sans select-none overflow-hidden">
      
      {/* ──────────────────────────────────────────────────────────── */}
      {/* TOP HEADER: MAMA ADA LMS LOGO IN TOP LEFT                    */}
      {/* ──────────────────────────────────────────────────────────── */}
      <header className="w-full shrink-0 px-4 py-2.5 sm:px-8 sm:py-3.5 flex items-center justify-between border-b border-slate-100 bg-white z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50/80 border border-amber-200/90 flex items-center justify-center p-0.5 shadow-2xs">
            <img src="/mama-ada-logo.png" alt="MAMA ADA LMS" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="text-base font-black tracking-tight text-[#0f244a] block leading-tight">
              MAMA ADA LMS
            </span>
            <span className="text-[10px] font-bold text-amber-600 tracking-wider uppercase block">
              Global AI Olympiad
            </span>
          </div>
        </div>

        {/* Minimalist Top Right Help Link */}
        <div className="text-xs text-slate-500 hidden sm:block">
          Need help?{' '}
          <span className="font-semibold text-[#0f244a]">
            Contact portal Administrator
          </span>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* MAIN NON-SCROLLABLE SPLIT VIEW                               */}
      {/* ──────────────────────────────────────────────────────────── */}
      <main className="flex-1 min-h-0 flex flex-col md:flex-row w-full items-center justify-center overflow-hidden">
        
        {/* LEFT SIDE (Desktop) / TOP (Mobile) : ROBOT MASCOT */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center py-2 sm:py-4 md:py-6 px-4 md:h-full md:border-r border-slate-100 shrink-0 md:shrink">
          <InteractiveRobotMascot
            isPasswordFocused={Boolean(isTypingPassword)}
            isEmailFocused={focusedField === 'email'}
            isPeeking={showPassword}
            isLoading={loading}
          />

          <div className="mt-1 sm:mt-2 text-center max-w-xs hidden sm:block">
            <h2 className="text-xs sm:text-sm font-bold text-[#0f244a]">
              Interactive AI Learning
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Your smart companion for Olympiad challenges and lessons.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE (Desktop) / BOTTOM (Mobile) : MINIMAL LOGIN FORM */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-4 py-2 sm:py-4 md:py-6 md:h-full overflow-hidden">
          <div className="w-full max-w-xs sm:max-w-sm space-y-3 sm:space-y-4">
            
            {/* Form Header */}
            <div className="text-left">
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-[#0f244a]">
                Welcome back
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 font-normal">
                Sign in to access your AI lessons and curriculum
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5 sm:space-y-3">
              
              {/* Email Address */}
              <div className="space-y-1 text-left">
                <label className="text-[11px] sm:text-xs font-semibold text-[#0f244a]">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-900/60" />
                  </div>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    autoComplete="email"
                    name={emailRegister.name}
                    ref={emailRegister.ref}
                    onChange={emailRegister.onChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={(e) => {
                      emailRegister.onBlur(e)
                      setFocusedField(null)
                    }}
                    className={`w-full h-8.5 sm:h-9.5 pl-9 pr-3 text-xs sm:text-sm rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 transition-all focus:outline-hidden focus:ring-2 focus:ring-blue-900/10 focus:border-[#0f244a] ${
                      errors.email ? 'border-rose-400' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-[10px] font-medium text-rose-500 mt-0.5">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1 text-left">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] sm:text-xs font-semibold text-[#0f244a]">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-[10px] sm:text-xs text-blue-600 hover:text-[#0f244a] hover:underline transition"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-900/60" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    name={passwordRegister.name}
                    ref={passwordRegister.ref}
                    onChange={passwordRegister.onChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={(e) => {
                      passwordRegister.onBlur(e)
                      setFocusedField(null)
                    }}
                    className={`w-full h-8.5 sm:h-9.5 pl-9 pr-9 text-xs sm:text-sm rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 transition-all focus:outline-hidden focus:ring-2 focus:ring-blue-900/10 focus:border-[#0f244a] ${
                      errors.password ? 'border-rose-400' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5 rounded transition"
                    title={showPassword ? 'Hide password' : 'Show password'}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0f244a]" />
                    ) : (
                      <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[10px] font-medium text-rose-500 mt-0.5">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button in Dark Blue */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-1.5 h-8.5 sm:h-9.5 px-4 bg-[#0f244a] hover:bg-[#18366d] active:bg-[#0a1833] text-white font-bold text-xs tracking-wide rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-200" />
                  </>
                )}
              </button>
            </form>

            {/* Mobile Contact Portal Administrator */}
            <div className="pt-2 text-center text-[10px] text-slate-400 sm:hidden">
              Need assistance?{' '}
              <span className="font-semibold text-[#0f244a] block mt-0.5">
                Contact portal Administrator
              </span>
            </div>

          </div>
        </div>

      </main>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* COMPACT FOOTER                                               */}
      {/* ──────────────────────────────────────────────────────────── */}
      <footer className="w-full shrink-0 py-2 sm:py-2.5 px-4 sm:px-8 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 bg-white">
        <span>© {new Date().getFullYear()} MAMA ADA LMS • Global AI Olympiad</span>
        <span className="font-medium text-[#0f244a] hidden sm:inline">
          Contact portal Administrator
        </span>
      </footer>

    </div>
  )
}
