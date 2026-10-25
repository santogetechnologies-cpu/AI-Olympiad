import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { authService } from '../../services/authService'
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

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

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
    <div className="relative w-full h-screen h-[100dvh] overflow-hidden select-none bg-[#f1f5f9] flex flex-col justify-between font-sans">
      {/* ── Background Image of 3D Robot in Futuristic Room ── */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url('/login-robot-bg.png')` }}
      />

      {/* Subtle Ambient Light Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-white/30 pointer-events-none" />

      {/* ── Top-Left Header Branding ── */}
      <header className="relative z-20 w-full p-4 sm:p-6 lg:p-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white shadow-[0_4px_16px_rgba(15,35,80,0.08)] border border-slate-100 p-1 flex items-center justify-center shrink-0">
            <img src="/mama-ada-logo.png" alt="Mamma Ada LMS" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="text-sm sm:text-base font-black tracking-tight text-[#0f244a] block leading-tight">
              Mamma Ada LMS
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-amber-600 tracking-wider uppercase block">
              Global AI Olympiad
            </span>
          </div>
        </div>

        <div className="hidden sm:block text-xs font-medium text-slate-500 bg-white/70 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-white/60 shadow-2xs">
          Olympiad Learning Portal
        </div>
      </header>

      {/* ── Main Canvas Area with Animated Ring & Login Card ── */}
      <main className="relative z-10 flex-1 flex items-center justify-center lg:justify-end px-4 sm:px-8 lg:px-16 xl:px-28 pb-6 sm:pb-12">
        {/* ── Animated 3D Holographic Ring around Robot's Waist ── */}
        <div
          className="absolute pointer-events-none hidden lg:block"
          style={{
            left: '28%',
            top: '63%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="relative w-80 h-36">
            {/* Outer Glowing Ring with 3D Tilt and Animation */}
            <div
              className="absolute inset-0 rounded-full border-[3.5px] border-cyan-300/80 bg-gradient-to-r from-cyan-400/20 via-blue-300/30 to-indigo-400/20 backdrop-blur-[1px] animate-float-ring"
              style={{
                boxShadow:
                  '0 0 35px rgba(56, 189, 248, 0.65), inset 0 0 25px rgba(56, 189, 248, 0.45)',
              }}
            />
            {/* Inner Shimmer Reflection */}
            <div
              className="absolute inset-1 rounded-full border border-white/60 opacity-80"
              style={{
                transform: 'rotateX(70deg) rotateY(-14deg) rotateZ(-3deg)',
              }}
            />
          </div>
        </div>

        {/* ── Floating Hologram Bar Chart near Robot's Tablet ── */}
        <div
          className="absolute pointer-events-none hidden lg:block animate-float-holo"
          style={{
            left: '43%',
            top: '40%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/90 shadow-[0_8px_24px_rgba(56,189,248,0.25)] p-2.5 flex items-end gap-1.5">
            <div className="w-1.5 h-3 rounded-full bg-blue-300" />
            <div className="w-1.5 h-6 rounded-full bg-blue-500 shadow-xs shadow-blue-400" />
            <div className="w-1.5 h-4.5 rounded-full bg-cyan-400 shadow-xs shadow-cyan-300" />
            <div className="w-1.5 h-7 rounded-full bg-indigo-500 shadow-xs shadow-indigo-400" />
          </div>
        </div>

        {/* ── Floating Ambient Cyan Sphere ── */}
        <div
          className="absolute pointer-events-none hidden lg:block"
          style={{
            left: '48%',
            top: '53%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-200 shadow-[0_0_16px_rgba(56,189,248,0.6)] animate-pulse opacity-90" />
        </div>

        {/* ── Login Card (As shown in design mockup) ── */}
        <div className="w-full max-w-[360px] sm:max-w-[400px] bg-white/95 backdrop-blur-md rounded-[32px] p-6 sm:p-9 shadow-[0_24px_60px_rgba(15,35,80,0.1),0_4px_16px_rgba(15,35,80,0.03)] border border-white/80 transition-all">
          {/* Card Header: Login Text */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0f244a]">
              Login
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
            {/* Email Field */}
            <div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  autoComplete="email"
                  {...register('email')}
                  className={`w-full h-12 pl-11 pr-4 rounded-2xl bg-[#f4f7fc]/90 hover:bg-[#f4f7fc] focus:bg-white border text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:ring-4 focus:ring-blue-900/5 focus:border-[#0f244a] ${
                    errors.email ? 'border-rose-400' : 'border-[#e2e8f0]'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-[10px] font-medium text-rose-500 mt-1 pl-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  {...register('password')}
                  className={`w-full h-12 pl-11 pr-11 rounded-2xl bg-[#f4f7fc]/90 hover:bg-[#f4f7fc] focus:bg-white border text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:ring-4 focus:ring-blue-900/5 focus:border-[#0f244a] ${
                    errors.password ? 'border-rose-400' : 'border-[#e2e8f0]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[10px] font-medium text-rose-500 mt-1 pl-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button with Right Arrow as in design */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#203a6a] hover:bg-[#182e56] active:scale-[0.98] text-white rounded-2xl font-bold transition-all shadow-[0_8px_20px_rgba(32,58,106,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <ArrowRight size={20} className="text-white" />
                )}
              </button>
            </div>
          </form>

          {/* Footer inside card */}
          <div className="mt-4 pt-3 flex items-center justify-between text-xs text-slate-500">
            <Link
              to="/forgot-password"
              className="text-xs text-blue-600 hover:text-[#0f244a] hover:underline transition"
            >
              Forgot password?
            </Link>
            <span className="text-[11px] text-slate-400">Secure AI Portal</span>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-20 w-full py-2.5 px-4 sm:px-8 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500 bg-white/40 backdrop-blur-xs border-t border-slate-200/50">
        <span>© {new Date().getFullYear()} Mamma Ada LMS • Global AI Olympiad</span>
        <span className="font-medium text-[#0f244a] hidden sm:inline">
          Official Olympiad Learning Platform
        </span>
      </footer>
    </div>
  )
}
