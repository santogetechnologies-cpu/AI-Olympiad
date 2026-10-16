import React from 'react'
import type { GaioScreenItem } from '../types'
import { ArrowRight } from 'lucide-react'

export interface GaioScreenRendererProps {
  screen: GaioScreenItem
  onNextScreen: () => void
  savedAnswer?: any
  onSaveAnswer?: (val: any) => void
  onAddStars?: (count: number) => void
  studentName?: string
}

export const GaioScreenRenderer: React.FC<GaioScreenRendererProps> = ({
  screen,
  onNextScreen,
}) => {
  // Simply show the PDF screenshot for ALL screens
  // This ensures EVERYTHING from the PDF is visible
  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold opacity-75 uppercase">
              {screen.interactionType?.replace(/_/g, ' ')}
            </div>
            <h1 className="text-xl font-black">{screen.title}</h1>
          </div>
          <div className="text-xs opacity-75">
            Screen {screen.screenNumber} | PDF Page {screen.pdfPageNumber}
          </div>
        </div>
      </div>

      {/* Full PDF Page - Shows EVERYTHING */}
      <div className="flex-1 overflow-y-auto bg-slate-50 p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={screen.sourcePdfImage}
            alt={screen.title}
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex-shrink-0 p-4 border-t bg-white">
        <button
          onClick={onNextScreen}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl flex items-center justify-center gap-2 transition-all"
        >
          Continue
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  )
}