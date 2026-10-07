import { Check, Play, Star, Trophy, Sparkles, Award, Video, BookOpen, FileEdit, HelpCircle, Zap, FileText } from 'lucide-react'
import type { ChapterContent, StudentContentProgress } from '../../types'

interface DuolingoRoadmapProps {
  items: ChapterContent[]
  activeItemId?: string
  progressMap: Map<string, StudentContentProgress>
  onSelectItem: (item: ChapterContent) => void
}

function getSectionIcon(type: string, size = 20) {
  switch (type) {
    case 'video':
      return <Video size={size} />
    case 'lesson':
      return <BookOpen size={size} />
    case 'worksheet':
      return <FileEdit size={size} />
    case 'resource':
      return <HelpCircle size={size} />
    case 'activity':
      return <Zap size={size} />
    case 'assignment':
      return <FileText size={size} />
    case 'quiz':
      return <Award size={size} />
    default:
      return <Sparkles size={size} />
  }
}

export function DuolingoRoadmap({
  items,
  activeItemId,
  progressMap,
  onSelectItem,
}: DuolingoRoadmapProps) {
  const nodes = items.map((item, index) => {
    const progress = progressMap.get(item.id)
    const isCompleted = progress?.status === 'completed'
    const isCurrent = item.id === activeItemId
    const isLocked = false

    return {
      item,
      index,
      isCompleted,
      isCurrent,
      isLocked,
    }
  })

  // Winding offset calculation for playful Duolingo path alignment
  const getOffsetClass = (index: number) => {
    const cycle = index % 4
    switch (cycle) {
      case 0:
        return 'translate-x-0'
      case 1:
        return 'translate-x-6 sm:translate-x-12'
      case 2:
        return 'translate-x-0'
      case 3:
        return '-translate-x-6 sm:-translate-x-12'
      default:
        return 'translate-x-0'
    }
  }

  const allCompleted = nodes.length > 0 && nodes.every(n => n.isCompleted)

  return (
    <div className="py-6 px-4 bg-gradient-to-b from-blue-50/50 via-slate-50/50 to-indigo-50/50 rounded-3xl border border-slate-200/80 shadow-inner">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md">
          <Sparkles size={14} className="text-yellow-300 animate-spin" />
          <span>Interactive Chapter Roadmap</span>
        </div>
        <h3 className="text-lg font-black text-slate-900 mt-2">8-Section Mastery Path</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Explore all sections freely in any order to earn XP and master chapter topics!
        </p>
      </div>

      <div className="relative flex flex-col items-center max-w-md mx-auto space-y-6 sm:space-y-8">
        {/* Continuous SVG Winding Track Line */}
        <div className="absolute top-8 bottom-12 w-1.5 bg-gradient-to-b from-blue-200 via-indigo-300 to-emerald-300 rounded-full -z-0 opacity-70" />

        {nodes.map(({ item, index, isCompleted, isCurrent, isLocked }) => {
          const offset = getOffsetClass(index)

          return (
            <div
              key={item.id}
              className={`relative z-10 flex flex-col items-center transition-all duration-300 ${offset}`}
            >
              {/* Floating Start/Active Tag */}
              {isCurrent && !isCompleted && (
                <div className="absolute -top-7 px-3 py-1 bg-blue-600 text-white text-[11px] font-black rounded-full shadow-lg border-2 border-white animate-bounce flex items-center gap-1">
                  <Play size={10} className="fill-current" />
                  <span>START</span>
                </div>
              )}

              {/* Node Button */}
              <button
                onClick={() => onSelectItem(item)}
                title={item.title}
                className={`
                  group relative w-16 h-16 sm:w-18 sm:h-18 rounded-3xl flex items-center justify-center transition-all duration-200 transform cursor-pointer
                  ${
                    isCompleted
                      ? 'bg-gradient-to-b from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/30 ring-4 ring-emerald-200 hover:scale-105 active:scale-95'
                      : isCurrent
                      ? 'bg-gradient-to-b from-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-500/40 ring-4 ring-blue-300 animate-pulse hover:scale-110 active:scale-95'
                      : 'bg-white text-slate-700 border-2 border-slate-300 hover:border-blue-400 hover:text-blue-600 shadow-md hover:scale-105 active:scale-95'
                  }
                `}
              >
                {/* Center Icon */}
                {isCompleted ? (
                  <div className="flex flex-col items-center">
                    <Check size={26} className="stroke-[3.5]" />
                  </div>
                ) : (
                  getSectionIcon(item.content_type, 26)
                )}

                {/* Level / Section Number Badge */}
                <span
                  className={`
                    absolute -bottom-2 -right-1 text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-sm border-2 border-white
                    ${
                      isCompleted
                        ? 'bg-amber-400 text-amber-950'
                        : isCurrent
                        ? 'bg-blue-700 text-white'
                        : 'bg-slate-800 text-white'
                    }
                  `}
                >
                  {index + 1}
                </span>

                {/* Star Accent on Completed */}
                {isCompleted && (
                  <span className="absolute -top-1.5 -right-1.5 text-yellow-300 drop-shadow-md">
                    <Star size={16} className="fill-yellow-300" />
                  </span>
                )}
              </button>

              {/* Title & XP Pill */}
              <div className="mt-2.5 text-center max-w-[150px]">
                <p
                  className={`text-xs font-bold truncate ${
                    isCurrent ? 'text-blue-900 font-black' : isCompleted ? 'text-slate-800' : 'text-slate-500'
                  }`}
                >
                  {item.title}
                </p>
                <div className="inline-flex items-center gap-1 text-[10px] font-semibold mt-0.5">
                  {isCompleted ? (
                    <span className="text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                      ✓ Done (+15 XP)
                    </span>
                  ) : isLocked ? (
                    <span className="text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Locked</span>
                  ) : (
                    <span className="text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-full">
                      +15 XP reward
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {/* Milestone Trophy Chest at the end */}
        <div className="relative z-10 pt-4 text-center">
          <div
            className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center shadow-2xl transition-all duration-300 ${
              allCompleted
                ? 'bg-gradient-to-tr from-yellow-400 via-amber-400 to-yellow-200 text-amber-950 ring-4 ring-yellow-300 animate-bounce'
                : 'bg-slate-200 text-slate-400 border-2 border-slate-300'
            }`}
          >
            <Trophy size={36} className={allCompleted ? 'fill-amber-300' : ''} />
          </div>
          <p className="font-black text-xs text-slate-800 mt-2">
            {allCompleted ? '🏆 Chapter Mastered (+50 XP)!' : 'Chapter Mastery Trophy'}
          </p>
          <p className="text-[11px] text-slate-400">Complete all 8 sections to unlock</p>
        </div>
      </div>
    </div>
  )
}
