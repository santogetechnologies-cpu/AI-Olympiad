import type { ExamQuestionDraft } from '../services/examService'

export const blankQuestion = (optionCount: number): ExamQuestionDraft => ({
  question_text: '',
  options: Array.from({ length: optionCount }, () => ''),
  marks: 1,
  correct_option: null,
  explanation: '',
})

export const round2 = (n: number) => Math.round(n * 100) / 100

/** Split total marks equally; the last question absorbs rounding so the sum is exact. */
export function distributeEqually(questions: ExamQuestionDraft[], total: number): ExamQuestionDraft[] {
  if (!questions.length) return questions
  const each = round2(total / questions.length)
  return questions.map((q, i) => ({
    ...q,
    marks: i === questions.length - 1 ? round2(total - each * (questions.length - 1)) : each,
  }))
}

export function toLocalInput(iso?: string | null) {
  if (!iso) return ''
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}
export const fromLocalInput = (v: string) => (v ? new Date(v).toISOString() : null)

/**
 * Bulk import format — questions separated by a blank line:
 *   1. What is AI?
 *   A) A fruit
 *   B) Artificial Intelligence
 *   Answer: B
 *   Explanation: optional
 * Marking an option with * (e.g. "*B) ...") also sets it as correct.
 */
export function parseBulk(text: string): ExamQuestionDraft[] {
  const blocks = text.replace(/\r/g, '').split(/\n\s*\n/).map(b => b.trim()).filter(Boolean)
  const out: ExamQuestionDraft[] = []
  for (const block of blocks) {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean)
    const q = blankQuestion(0)
    const qLines: string[] = []
    for (const line of lines) {
      const opt = line.match(/^(\*?)\s*\(?([A-Ha-h])[).:\]]\s*(.+)$/)
      const ans = line.match(/^(?:answer|ans|correct)\s*[:-]\s*\(?([A-Ha-h])\)?/i)
      const exp = line.match(/^(?:explanation|exp|reason)\s*[:-]\s*(.+)$/i)
      if (ans) q.correct_option = ans[1].toUpperCase().charCodeAt(0) - 65
      else if (exp) q.explanation = exp[1]
      else if (opt && (q.options.length > 0 || qLines.length > 0)) {
        if (opt[1] === '*') q.correct_option = q.options.length
        q.options.push(opt[3])
      } else if (q.options.length === 0) qLines.push(line.replace(/^(?:Q?\d+[).:]\s*)/i, ''))
    }
    q.question_text = qLines.join(' ')
    if (q.question_text && q.options.length >= 2) {
      if (q.correct_option !== null && q.correct_option >= q.options.length) q.correct_option = null
      out.push(q)
    }
  }
  return out
}
