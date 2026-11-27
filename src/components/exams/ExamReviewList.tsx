import { CheckCircle2, XCircle, MinusCircle } from 'lucide-react'
import type { ReviewItem } from '../../services/examService'

/** Question-by-question breakdown of an attempt, shared by admin and student views. */
export function ExamReviewList({ items }: { items: ReviewItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const unanswered = item.selected_option === null
        const keyKnown = item.correct_option !== null
        const correct = keyKnown && item.selected_option === item.correct_option
        const Icon = unanswered ? MinusCircle : !keyKnown ? MinusCircle : correct ? CheckCircle2 : XCircle
        const tone = unanswered ? 'text-slate-400' : !keyKnown ? 'text-blue-500' : correct ? 'text-emerald-600' : 'text-rose-600'
        return (
          <div key={item.question_id} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-start gap-2 mb-2">
              <Icon size={18} className={`shrink-0 mt-0.5 ${tone}`} />
              <p className="text-sm font-semibold text-slate-900 flex-1">Q{i + 1}. {item.question_text}</p>
              <span className="text-xs text-slate-500 shrink-0">{item.marks} marks</span>
            </div>
            <div className="space-y-1.5 pl-6">
              {item.options.map((opt, oi) => {
                const isSelected = item.selected_option === oi
                const isAnswer = item.correct_option === oi
                const cls = isAnswer
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                  : isSelected && keyKnown
                    ? 'border-rose-300 bg-rose-50 text-rose-900'
                    : isSelected
                      ? 'border-blue-300 bg-blue-50 text-blue-900'
                      : 'border-slate-200 text-slate-700'
                return (
                  <div key={oi} className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm ${cls}`}>
                    <span className="font-bold text-xs w-4">{String.fromCharCode(65 + oi)}</span>
                    <span className="flex-1">{opt}</span>
                    {isSelected && <span className="text-[11px] font-bold">Selected</span>}
                    {isAnswer && <span className="text-[11px] font-bold">Correct</span>}
                  </div>
                )
              })}
              {unanswered && <p className="text-xs text-slate-500 italic">Not answered</p>}
              {item.explanation && <p className="text-xs text-slate-600 bg-slate-50 rounded-lg p-2 mt-1"><span className="font-semibold">Explanation:</span> {item.explanation}</p>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
