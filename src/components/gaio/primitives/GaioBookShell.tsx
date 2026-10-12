import React from 'react'
import { ArrowLeft, ChevronLeft } from 'lucide-react'

export interface GaioBookShellProps {
  categoryText: string
  headerTitle?: string
  pdfPageNumber: number
  screenNumber?: number
  totalScreens?: number
  contentBlockTitle?: string
  gradeTitle?: string
  onExit?: () => void
  onPrevPage?: () => void
  canGoPrev?: boolean
  children: React.ReactNode
}

export const GaioBookShell: React.FC<GaioBookShellProps> = ({
  categoryText,
  headerTitle,
  pdfPageNumber,
  contentBlockTitle,
  gradeTitle = 'Class 3',
  onExit,
  onPrevPage,
  canGoPrev,
  children
}) => {
  const isClass4 = gradeTitle.toLowerCase().includes('4')
  const isClass5 = gradeTitle.toLowerCase().includes('5')
  const borderColor = isClass5 ? 'border-[#7C3AED]' : isClass4 ? 'border-[#0D9488]' : 'border-[#0288D1]'
  const accentColor = isClass5 ? '#7C3AED' : isClass4 ? '#0D9488' : '#0288D1'

  return (
    <div
      className={`w-full h-full max-h-full flex-1 flex flex-col justify-between overflow-hidden bg-white rounded-2xl sm:rounded-3xl border-3 sm:border-4 ${borderColor} shadow-xl p-1 sm:p-2 relative select-none`}
      style={{ fontFamily: "'Poppins', 'Fredoka', 'Inter', system-ui, sans-serif" }}
    >
      {/* 1. Header Bar matching authentic book top rule: Back | AI OLYMPIAD • CLASS | Category */}
      <header className="shrink-0 flex items-center justify-between px-2 py-1 text-[9px] sm:text-[10px] font-bold text-slate-500 border-b border-sky-100 bg-sky-50/60 rounded-t-xl">
        <div className="flex items-center gap-1.5 min-w-0">
          {onExit && (
            <button
              type="button"
              onClick={onExit}
              className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-black text-[#0288D1] hover:text-sky-800 bg-white px-2 py-0.5 rounded-lg border border-sky-200 transition-colors cursor-pointer shadow-2xs active:scale-95 shrink-0"
              title="Return to Chapters"
            >
              <ArrowLeft size={11} />
              <span>Chapters</span>
            </button>
          )}
          {onPrevPage && canGoPrev && (
            <button
              type="button"
              onClick={onPrevPage}
              className="inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] font-bold text-slate-600 hover:text-slate-900 bg-white px-1.5 py-0.5 rounded-lg border border-slate-200 transition-colors cursor-pointer active:scale-95 shrink-0"
              title="Previous Screen"
            >
              <ChevronLeft size={11} />
              <span>Prev</span>
            </button>
          )}
          <span className="tracking-wide text-slate-700 font-extrabold hidden xs:inline-flex items-center gap-1 truncate">
            <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse shrink-0" style={{ backgroundColor: accentColor }} />
            AI OLYMPIAD • {gradeTitle.toUpperCase()}
          </span>
        </div>

        <span className="uppercase tracking-wider font-black truncate max-w-[150px] sm:max-w-xs text-right text-[9px] sm:text-[10px] shrink-0" style={{ color: accentColor }}>
          {categoryText || `MONTH 1: AI DISCOVER`}
        </span>
      </header>

      {/* Subheader with Content Block Tag (No screen counter labels) */}
      {contentBlockTitle && (
        <div className="shrink-0 px-2 py-0.5 bg-sky-50/30 border-b border-sky-50 flex items-center justify-between text-[8px] font-bold text-slate-400">
          <span className="text-sky-700 font-semibold truncate max-w-full">
            {contentBlockTitle}
          </span>
        </div>
      )}

      {/* 2. Main Page Viewport Container: 100% Mobile Contained, ZERO Scrolling */}
      <main className="flex-1 min-h-0 w-full overflow-hidden relative flex flex-col justify-between py-1">
        {children}
      </main>

      {/* 3. Subtle Book Reference */}
      <footer className="shrink-0 flex items-center justify-between px-2 pt-0.5 text-[8px] text-slate-400 font-medium border-t border-sky-50">
        <span>GAIO {gradeTitle}</span>
        <span className="font-mono text-slate-400">PDF Page {pdfPageNumber}</span>
      </footer>
    </div>
  )
}
