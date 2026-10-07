import { Video, BookOpen, ClipboardList, Zap, FileText, HelpCircle, FolderOpen, type LucideIcon } from 'lucide-react'
import type { ContentType } from '../../types'

export const CONTENT_TYPE_CONFIG: Record<ContentType, {
  label: string
  icon: LucideIcon
  color: string
  bg: string
  border: string
}> = {
  video: {
    label: 'Video',
    icon: Video,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
  },
  lesson: {
    label: 'Lesson',
    icon: BookOpen,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  worksheet: {
    label: 'Worksheet',
    icon: ClipboardList,
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
  },
  activity: {
    label: 'Activity',
    icon: Zap,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  assignment: {
    label: 'Assignment',
    icon: FileText,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
  },
  quiz: {
    label: 'Quiz',
    icon: HelpCircle,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
  },
  resource: {
    label: 'Resource',
    icon: FolderOpen,
    color: 'text-slate-600',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
  },
}

export function ContentTypeIcon({ type, size = 16 }: { type: ContentType; size?: number }) {
  const config = CONTENT_TYPE_CONFIG[type]
  const Icon = config.icon
  return (
    <div className={`flex items-center justify-center rounded-lg w-8 h-8 ${config.bg}`}>
      <Icon size={size} className={config.color} />
    </div>
  )
}

export function ContentTypeBadge({ type }: { type: ContentType }) {
  const config = CONTENT_TYPE_CONFIG[type]
  const Icon = config.icon
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${config.bg} ${config.color} ${config.border}`}>
      <Icon size={10} />
      {config.label}
    </span>
  )
}
