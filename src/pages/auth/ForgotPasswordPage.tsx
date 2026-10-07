import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { GraduationCap, ArrowLeft, CheckCircle2, RefreshCw, Clock } from 'lucide-react'
import { authService } from '../../services/authService'
import { Button, Input } from '../../components/ui'
import toast from 'react-hot-toast'

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type ForgotForm = z.infer<typeof schema>

function formatTimeRemaining(seconds: number): string {
  if (seconds <= 0) return '0 seconds'
  if (seconds < 60) {
    return `${seconds} second${seconds === 1 ? '' : 's'}`
  }
  const minutes = Math.floor(seconds / 60)
  const remainingSecs = seconds % 60

  if (seconds < 3600) {
    if (remainingSecs === 0) {
      return `${minutes} minute${minutes === 1 ? '' : 's'}`
    }
    return `${minutes} minute${minutes === 1 ? '' : 's'} and ${remainingSecs} second${remainingSecs === 1 ? '' : 's'}`
  }

  const hours = Math.floor(seconds / 3600)
  const remainingMins = Math.floor((seconds % 3600) / 60)
  if (remainingMins === 0) {
    return `${hours} hour${hours === 1 ? '' : 's'}`
  }
  return `${hours} hour${hours === 1 ? '' : 's'} and ${remainingMins} minute${remainingMins === 1 ? '' : 's'}`
}

function parseWaitTimeFromError(errMsg: string): number {
  // Check for explicit seconds e.g. "once every 60 seconds", "wait 45 seconds"
  const secMatch = errMsg.match(/(?:every|wait|after|in)\s+(\d+)\s*sec/i) || errMsg.match(/(\d+)\s*seconds?/i)
  if (secMatch && secMatch[1]) {
    const s = parseInt(secMatch[1], 10)
    if (!isNaN(s) && s > 0) return s
  }

  // Check for explicit minutes e.g. "wait 5 minutes"
  const minMatch = errMsg.match(/(?:every|wait|after|in)\s+(\d+)\s*min/i) || errMsg.match(/(\d+)\s*minutes?/i)
  if (minMatch && minMatch[1]) {
    const m = parseInt(minMatch[1], 10)
    if (!isNaN(m) && m > 0) return m * 60
  }

  // Check for explicit hours
  const hrMatch = errMsg.match(/(?:every|wait|after|in)\s+(\d+)\s*hour/i) || errMsg.match(/(\d+)\s*hours?/i)
  if (hrMatch && hrMatch[1]) {
    const h = parseInt(hrMatch[1], 10)
    if (!isNaN(h) && h > 0) return h * 3600
  }

  // Default fallback cooldown for standard rate limit
  return 60
}

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  // Persisted cooldown timestamp so page refresh accurately preserves remaining time
  const [cooldownExpiry, setCooldownExpiry] = useState<number | null>(() => {
    try {
      const saved = sessionStorage.getItem('reset_pw_cooldown_expiry')
      if (saved) {
        const exp = parseInt(saved, 10)
        if (exp > Date.now()) return exp
      }
    } catch {
      // Ignore storage errors
    }
    return null
  })

  const [remainingSeconds, setRemainingSeconds] = useState<number>(() => {
    if (cooldownExpiry) {
      return Math.max(0, Math.ceil((cooldownExpiry - Date.now()) / 1000))
    }
    return 0
  })

  const { register, handleSubmit, formState: { errors }, getValues } = useForm<ForgotForm>({
    resolver: zodResolver(schema),
  })

  // Live countdown timer based on actual timestamp
  useEffect(() => {
    if (!cooldownExpiry) {
      setRemainingSeconds(0)
      return
    }

    const updateRemaining = () => {
      const diff = Math.max(0, Math.ceil((cooldownExpiry - Date.now()) / 1000))
      setRemainingSeconds(diff)

      if (diff <= 0) {
        setCooldownExpiry(null)
        try {
          sessionStorage.removeItem('reset_pw_cooldown_expiry')
        } catch {
          // Ignore
        }
      }
    }

    updateRemaining()
    const interval = setInterval(updateRemaining, 1000)
    return () => clearInterval(interval)
  }, [cooldownExpiry])

  const startCooldown = (seconds: number) => {
    const expiry = Date.now() + seconds * 1000
    setCooldownExpiry(expiry)
    setRemainingSeconds(seconds)
    try {
      sessionStorage.setItem('reset_pw_cooldown_expiry', expiry.toString())
    } catch {
      // Ignore
    }
  }

  const onSubmit = async ({ email }: { email: string }) => {
    if (remainingSeconds > 0) {
      toast.error(`Please try again in ${formatTimeRemaining(remainingSeconds)}.`)
      return
    }

    setLoading(true)

    try {
      await authService.resetPasswordRequest(email)
      setSent(true)
      startCooldown(60) // 60s cooldown between successful link sends
      toast.success('Reset link sent! Please check your email inbox.')
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : typeof err === 'string' ? err : 'Failed to send reset email'
      const lowerMsg = errMsg.toLowerCase()
      const status = typeof err === 'object' && err !== null && 'status' in err ? (err as { status?: number }).status : undefined

      const isRateLimitError =
        status === 429 ||
        lowerMsg.includes('rate limit') ||
        lowerMsg.includes('over_email_send_rate_limit') ||
        lowerMsg.includes('429') ||
        lowerMsg.includes('security purposes') ||
        lowerMsg.includes('too many requests')

      if (isRateLimitError) {
        const waitTime = parseWaitTimeFromError(errMsg)
        startCooldown(waitTime)
        toast.error(`Please try again in ${formatTimeRemaining(waitTime)}.`)
      } else if (lowerMsg.includes('failed to fetch') || lowerMsg.includes('internet') || lowerMsg.includes('network')) {
        toast.error('Network connection issue. Please check your internet connection.')
      } else {
        toast.error('Unable to send reset email. Please verify the email address.')
      }
    } finally {
      setLoading(false)
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
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
              <GraduationCap size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Reset Password</h1>
            <p className="text-sm text-slate-500 mt-1 text-center">
              Enter your registered email and we'll send you a password reset link
            </p>
          </div>

          {/* Cooldown / Rate Limit Banner */}
          {remainingSeconds > 0 && (
            <div className="mb-5 p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-sm flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-900">
                  Please try again in {formatTimeRemaining(remainingSeconds)}.
                </p>
                <p className="mt-1 text-amber-700 text-xs leading-relaxed">
                  For your security, password reset requests are temporarily paused.
                </p>
              </div>
            </div>
          )}

          {sent ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle2 size={52} className="text-green-500" />
              </div>
              <p className="text-slate-800 font-semibold text-lg">Check your email</p>
              <p className="text-sm text-slate-600">
                We've sent a password reset link to <strong>{getValues('email')}</strong>.
              </p>

              <div className="pt-2 space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={remainingSeconds > 0 || loading}
                  onClick={handleSubmit(onSubmit)}
                >
                  <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
                  {remainingSeconds > 0
                    ? `Resend link in ${formatTimeRemaining(remainingSeconds)}`
                    : 'Resend link'}
                </Button>

                <Link to="/login" className="block">
                  <Button variant="ghost" className="w-full">
                    <ArrowLeft size={14} className="mr-1" /> Back to Login
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register('email')}
              />

              <Button
                type="submit"
                className="w-full"
                size="lg"
                loading={loading}
                disabled={remainingSeconds > 0 || loading}
              >
                {remainingSeconds > 0
                  ? `Please try again in ${formatTimeRemaining(remainingSeconds)}`
                  : 'Send Reset Link'}
              </Button>

              <Link
                to="/login"
                className="flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-slate-700 mt-2 transition"
              >
                <ArrowLeft size={14} /> Back to Login
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
