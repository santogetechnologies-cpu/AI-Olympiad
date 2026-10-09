// ─────────────────────────────────────────────────────────────────────────────
// GAIO BOOK SHELL PRIMITIVE
// Exact visual border, header, and containment from GAIO Class3 Book.pdf
// Zero scrolling anywhere: Guaranteed single mobile viewport containment.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'

export interface GaioBookShellProps {
  categoryText: string
  headerTitle: string
  pdfPageNumber: number
  screenNumber?: number
  totalScreens?: number
  contentBlockTitle?: string
  children: React.ReactNode
}

export const GaioBookShell: React.FC<GaioBookShellProps> = ({
  categoryText,
  headerTitle,
  pdfPageNumber,
  screenNumber,
  totalScreens,
  contentBlockTitle,
  children
}) => {
  return (
    <div
      className="w-full h-full max-h-full flex flex-col justify-between overflow-hidden bg-white rounded-3xl border-4 border-[#0288D1] shadow-2xl p-1.5 sm:p-2.5 relative select-none"
      style={{ fontFamily: "'Poppins', 'Fredoka', 'Inter', system-ui, sans-serif" }}
    >
      {/* 1. Header Bar matching exact PDF top rule: AI OLYMPIAD • CLASS 3 | Category */}
      <header className="shrink-0 flex items-center justify-between px-2.5 py-1 text-[9px] sm:text-[10px] font-bold text-slate-500 border-b border-sky-100 bg-sky-50/50 rounded-t-2xl">
        <span className="tracking-wide text-slate-700 font-extrabold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#0288D1] inline-block animate-pulse" />
          AI OLYMPIAD • CLASS 3
        </span>
        <span className="text-[#0288D1] uppercase tracking-wider font-black truncate max-w-[180px] sm:max-w-xs text-right">
          {categoryText || 'MONTH 1: AI DISCOVER'}
        </span>
      </header>

      {/* Subheader with Content Block Tag */}
      {contentBlockTitle && (
        <div className="shrink-0 px-2.5 py-0.5 bg-sky-50/20 border-b border-sky-50 flex items-center justify-between text-[8px] font-bold text-slate-400">
          <span className="text-sky-700 font-semibold truncate max-w-[220px]">
            {contentBlockTitle}
          </span>
          <span className="text-slate-400 font-mono">
            {screenNumber && totalScreens ? `Screen ${screenNumber}/${totalScreens}` : ''}
          </span>
        </div>
      )}

      {/* 2. Main Page Viewport Container: 100% Mobile Contained, ZERO Scrolling */}
      <main className="flex-1 min-h-0 w-full overflow-hidden relative flex flex-col justify-between py-1">
        {children}
      </main>

      {/* 3. Subtle Book Watermark / Footer Page Reference */}
      <div className="shrink-0 flex items-center justify-between px-2 pt-0.5 text-[8px] text-slate-400 font-medium">
        <span>GAIO Official Curriculum</span>
        <span className="font-mono text-slate-500">Source PDF: Page {pdfPageNumber}</span>
      </div>
    </div>
  )
}
