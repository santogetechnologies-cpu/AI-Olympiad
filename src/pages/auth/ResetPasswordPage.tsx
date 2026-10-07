import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { GraduationCap, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowLeft, KeyRound } from 'lucide-react'
import { authService } from '../../services/authService'
import { supabase } from '../../lib/supabase'
import { Button } from '../../components/ui'
import toast from 'react-hot-toast'

const resetSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type ResetForm = z.infer<typeof resetSchema>

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isVerifying, setIsVerifying] = useState(true)
  const [isSessionValid, setIsSessionValid] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [countdown, setCountdown] = useState(4)

  const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetForm>({
    resolver: zodResolver(resetSchema),
    mode: 'onChange',
  })

  const passwordValue = watch('password', '')

  useEffect(() => {
    let isMounted = true

    const checkRecoverySession = async () => {
      // 1. Check for error description in URL hash or query params
      const hash = window.location.hash || ''
      const search = location.search || ''

      const hashParams = new URLSearchParams(hash.startsWith('#') ? hash.substring(1) : hash)
      const searchParams = new URLSearchParams(search)

      const error = hashParams.get('error') || searchParams.get('error')
      const errorDescription = hashParams.get('error_description') || searchParams.get('error_description')

      if (error || errorDescription) {
        if (isMounted) {
          setErrorMessage(errorDescription || 'The password reset link is invalid or has expired. Please request a new one.')
          setIsVerifying(false)
          setIsSessionValid(false)
        }
        return
      }

      // 2. Check existing session
      const { data: { session } } = await supabase.auth.getSession()
      if (session && isMounted) {
        setIsSessionValid(true)
        setIsVerifying(false)
        return
      }

      // 3. Listen for PASSWORD_RECOVERY or SIGNED_IN event from Supabase URL parsing
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (!isMounted) return
        if (event === 'PASSWORD_RECOVERY' || (session && event === 'SIGNED_IN')) {
          setIsSessionValid(true)
          setIsVerifying(false)
          setErrorMessage(null)
        }
      })

      // 4. Fallback timeout: if after 2.5s no session or hash tokens found, show invalid message
      const timer = setTimeout(() => {
        if (isMounted) {
          supabase.auth.getSession().then(({ data: { session: s } }) => {
            if (s) {
              setIsSessionValid(true)
            } else {
              // If there's no hash/code and no session, link is missing or expired
              setIsSessionValid(false)
              setErrorMessage('No valid password reset token found. Please request a new password reset link.')
            }
            setIsVerifying(false)
          })
        }
      }, 2000)

      return () => {
        subscription.unsubscribe()
        clearTimeout(timer)
      }
    }

    checkRecoverySession()

    return () => {
      isMounted = false
    }
  }, [location])

  // Countdown and redirect on success
  useEffect(() => {
    if (!isSuccess) return

    if (countdown <= 0) {
      navigate('/login', { replace: true })
      return
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [isSuccess, countdown, navigate])

  const onSubmit = async (data: ResetForm) => {
    setIsSubmitting(true)
    try {
      await authService.resetPassword(data.password)

      // Sign out recovery session so user explicitly logs in with their new credentials
      try {
        await authService.signOut()
      } catch {
        // Ignore signout error if session already closed
      }

      toast.success('Password updated successfully!')
      setIsSuccess(true)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update password. Please try again.'
      toast.error(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
              {isSuccess ? (
                <CheckCircle2 size={28} className="text-white" />
              ) : (
                <GraduationCap size={28} className="text-white" />
              )}
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              {isSuccess ? 'Password Reset Complete' : 'Reset Password'}
            </h1>
            <p className="text-sm text-slate-500 mt-1 text-center">
              {isSuccess
                ? 'Your password has been successfully updated.'
                : 'Create a strong, new password for your account'}
            </p>
          </div>

          {/* State 1: Verifying */}
          {isVerifying ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-slate-600 font-medium text-sm">Verifying reset link...</p>
            </div>
          ) : isSuccess ? (
            /* State 2: Success */
            <div className="text-center space-y-6">
              <div className="p-4 bg-green-50 rounded-xl border border-green-200 text-green-800 text-sm">
                <p className="font-semibold mb-1">Success!</p>
                <p>You can now sign in using your new password. Redirecting to login in <strong>{countdown}s</strong>...</p>
              </div>

              <Button
                type="button"
                onClick={() => navigate('/login', { replace: true })}
                className="w-full"
                size="lg"
              >
                Go to Login Now
              </Button>
            </div>
          ) : !isSessionValid ? (
            /* State 3: Invalid / Expired Link */
            <div className="text-center space-y-5">
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-sm flex items-start gap-3 text-left">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-800">Invalid or Expired Link</p>
                  <p className="mt-1 text-amber-700">
                    {errorMessage || 'This password reset link has either expired or already been used.'}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Link to="/forgot-password" className="block w-full">
                  <Button className="w-full" size="lg">
                    Request New Reset Link
                  </Button>
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition"
                >
                  <ArrowLeft size={14} /> Back to Login
                </Link>
              </div>
            </div>
          ) : (
            /* State 4: Reset Password Form */
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* New Password */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                  <Lock size={14} className="text-slate-400" /> New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter new password (min 6 characters)"
                    className={`h-10 px-3 pr-10 text-sm border rounded-lg bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full ${
                      errors.password ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-300'
                    }`}
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-0.5">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                  <KeyRound size={14} className="text-slate-400" /> Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Re-enter your new password"
                    className={`h-10 px-3 pr-10 text-sm border rounded-lg bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full ${
                      errors.confirmPassword ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-300'
                    }`}
                    {...register('confirmPassword')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-0.5">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Password checklist */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5 text-slate-600">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                      passwordValue.length >= 6
                        ? 'bg-green-500 text-white'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    ✓
                  </div>
                  <span className={passwordValue.length >= 6 ? 'text-green-700 font-medium' : ''}>
                    At least 6 characters long
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                loading={isSubmitting}
              >
                Update Password
              </Button>

              <div className="text-center pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition"
                >
                  <ArrowLeft size={14} /> Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
