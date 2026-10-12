// ─────────────────────────────────────────────────────────────────────────────
// AURA GUIDANCE TOAST & AUDIO SYSTEM
// Prominent, large, readable notifications paired with Aura AI spoken voice
// Provides clear step-by-step guidance, celebrations, and next actions
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import toast from 'react-hot-toast'
import { Sparkles, CheckCircle2, ArrowRight, AlertCircle, Bot, Trophy, Play } from 'lucide-react'
import { gameAudio } from '../utils/gameAudio'
import { auraSpeechService } from './auraSpeechService'

export type AuraToastType =
  | 'start'
  | 'next_step'
  | 'great_job'
  | 'try_again'
  | 'activity_complete'
  | 'worksheet_complete'
  | 'quiz_time'
  | 'lesson_complete'

interface ToastConfig {
  title: string
  subtitle: string
  icon: React.ElementType
  bgGradient: string
  borderColor: string
  textColor: string
  sound: () => void
  speakText: string
}

const TOAST_PRESETS: Record<AuraToastType, (detail?: string) => ToastConfig> = {
  start: (detail) => ({
    title: "LET'S START!",
    subtitle: detail || 'Aura AI will guide you step by step.',
    icon: Sparkles,
    bgGradient: 'from-sky-600 via-blue-600 to-indigo-700',
    borderColor: 'border-sky-300',
    textColor: 'text-sky-100',
    sound: () => gameAudio.playTap(),
    speakText: `Let's start! ${detail || 'Aura AI will guide you.'}`,
  }),
  next_step: (detail) => ({
    title: 'NEXT STEP',
    subtitle: detail || 'Drag the card or tap to match the objects.',
    icon: ArrowRight,
    bgGradient: 'from-indigo-600 via-blue-600 to-sky-600',
    borderColor: 'border-blue-300',
    textColor: 'text-blue-100',
    sound: () => gameAudio.playTap(),
    speakText: `Next step. ${detail || 'Drag the card into the machine.'}`,
  }),
  great_job: (detail) => ({
    title: 'GREAT JOB!',
    subtitle: detail || 'You matched the correct objects!',
    icon: CheckCircle2,
    bgGradient: 'from-emerald-600 via-teal-600 to-green-600',
    borderColor: 'border-emerald-300',
    textColor: 'text-emerald-100',
    sound: () => gameAudio.playSuccess(),
    speakText: `Great job! ${detail || 'You matched the correct objects.'}`,
  }),
  try_again: (detail) => ({
    title: 'TRY AGAIN',
    subtitle: detail || "Let's look at the pictures carefully.",
    icon: AlertCircle,
    bgGradient: 'from-amber-600 via-orange-600 to-rose-600',
    borderColor: 'border-amber-300',
    textColor: 'text-amber-100',
    sound: () => gameAudio.playError(),
    speakText: `Try again! ${detail || "Let's look at the pictures carefully."}`,
  }),
  activity_complete: (detail) => ({
    title: 'ACTIVITY COMPLETE!',
    subtitle: detail || 'You finished this activity with flying colours.',
    icon: Trophy,
    bgGradient: 'from-purple-600 via-indigo-600 to-blue-700',
    borderColor: 'border-purple-300',
    textColor: 'text-purple-100',
    sound: () => gameAudio.playFanfare(),
    speakText: `Activity complete! ${detail || 'You finished this activity.'}`,
  }),
  worksheet_complete: (detail) => ({
    title: 'WORKSHEET COMPLETE!',
    subtitle: detail || 'You are ready for Quiz Time!',
    icon: CheckCircle2,
    bgGradient: 'from-teal-600 via-emerald-600 to-cyan-600',
    borderColor: 'border-teal-300',
    textColor: 'text-teal-100',
    sound: () => gameAudio.playFanfare(),
    speakText: `Worksheet complete! ${detail || 'You are ready for Quiz Time.'}`,
  }),
  quiz_time: (detail) => ({
    title: 'QUIZ TIME!',
    subtitle: detail || "Let's practise what you learned!",
    icon: Bot,
    bgGradient: 'from-amber-500 via-orange-600 to-rose-600',
    borderColor: 'border-amber-300',
    textColor: 'text-amber-100',
    sound: () => gameAudio.playTap(),
    speakText: `Quiz Time! ${detail || "Let's practise what you learned."}`,
  }),
  lesson_complete: (detail) => ({
    title: 'LESSON COMPLETE!',
    subtitle: detail || 'You are ready for the next lesson!',
    icon: Trophy,
    bgGradient: 'from-amber-600 via-yellow-600 to-amber-500',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-100',
    sound: () => gameAudio.playFanfare(),
    speakText: `Lesson complete! ${detail || 'You are ready for the next lesson.'}`,
  }),
}

export function showAuraToast(type: AuraToastType, detail?: string, speak = true) {
  const config = TOAST_PRESETS[type](detail)

  // Play audio effect
  config.sound()

  // Spoken voice guidance
  if (speak) {
    auraSpeechService.speak(config.speakText)
  }

  // Display custom high-contrast, large readable toast
  toast.custom(
    (t) => {
      const Icon = config.icon
      return (
        <div
          onClick={() => toast.dismiss(t.id)}
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } pointer-events-auto flex items-center gap-3.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl bg-gradient-to-r ${config.bgGradient} text-white shadow-2xl border-2 ${config.borderColor} cursor-pointer max-w-md w-full transition-all duration-200 hover:scale-[1.02]`}
          style={{ minHeight: '64px' }}
        >
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/30 shadow-inner">
            <Icon size={22} className="text-white drop-shadow-sm" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs sm:text-sm font-black tracking-wide text-white drop-shadow-xs">
              {config.title}
            </div>
            <div className={`text-[11px] sm:text-xs font-semibold ${config.textColor} leading-tight line-clamp-2 mt-0.5`}>
              {config.subtitle}
            </div>
          </div>
        </div>
      )
    },
    { duration: 3200, position: 'top-center' }
  )
}
