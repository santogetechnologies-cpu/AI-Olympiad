// ─────────────────────────────────────────────────────────────────────────────
// PDF REGION OVERLAY COMPONENT
// Renders authentic interactive DOM widgets directly over the PDF page:
// - Say-It microphone pronunciation targets
// - Color-fillable interactive trigger zones
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'
import { Sparkles } from 'lucide-react'

export interface PageRegion {
  id: string
  type: 'typeable' | 'sayIt' | 'colorFill' | 'draggable'
  bbox?: [number, number, number, number] // x, y, w, h in PDF coordinate points
  placeholder?: string
  prompt?: string
  fontSize?: number
  label?: string
  optionText?: string
  targetWord?: string
  imageSrc?: string
}

export interface PdfRegionOverlayProps {
  pageNumber: number
  bookKey: string
  regions: PageRegion[]
  scale: number
  onStartSayWord?: (word: string) => void
  onAddStar?: (count?: number) => void
  showReviewBoxes?: boolean
}

export const PdfRegionOverlay: React.FC<PdfRegionOverlayProps> = ({
  regions,
  scale,
  showReviewBoxes = false
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {regions.map((region) => {
        if (!region.bbox && region.type !== 'sayIt') return null

        // Scale bounding box to canvas pixels
        const [x, y, w, h] = region.bbox || [0, 0, 0, 0]
        const sx = x * scale
        const sy = y * scale
        const sw = w * scale
        const sh = h * scale

        // COLOR FILL REGION PROMPT
        if (region.type === 'colorFill') {
          return (
            <div
              key={region.id}
              style={{ left: `${sx}px`, top: `${sy}px`, width: `${sw}px`, height: `${sh}px` }}
              className={`absolute pointer-events-none rounded-2xl border-2 border-dashed border-pink-400/50 flex items-start justify-end p-2 ${
                showReviewBoxes ? 'bg-pink-500/10' : ''
              }`}
            >
              <span className="text-[10px] bg-pink-500 text-white font-extrabold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                <Sparkles size={10} />
                {region.prompt || 'Colour Me!'}
              </span>
            </div>
          )
        }

        return null
      })}
    </div>
  )
}
