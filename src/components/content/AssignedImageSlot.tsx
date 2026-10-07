import { useState, useEffect } from 'react'
import { Eye, Compass, Sparkles, ZoomIn, Layers } from 'lucide-react'
import { imagePlacementService, type ImagePosition } from '../../services/imagePlacementService'

export interface CanonicalSection {
  id: string
  title: string
  description?: string
  estimatedMinutes?: number
  videoUrl?: string
  videoDescription?: string
  htmlContent?: string
  imageSrc?: string
  imageCaption?: string
  topicTitle?: string
  sectionNumber?: number
  contentType?: string
  matchingPairs?: { title?: string; pairs: { id: string; term: string; definition: string }[] } | { id: string; term: string; definition: string }[]
  mcq?: { question: string; options: string[]; correctIndex: number; explanation: string; hint: string }
  workbookPrompts?: string
  flashcards?: { q: string; a: string }[]
  labChecklist?: string[]
  labStarter?: string
  assignmentBrief?: string
  assignmentMarks?: number
  quizQuestions?: { question: string; options: { text: string; isCorrect: boolean }[]; explanation: string }[]
  lessonJourney?: any
}

export function AssignedImageSlot({
  classKey,
  chapterNum,
  sectionKey,
  sectionNumber,
  contentType,
  position,
  fallbackImage,
  fallbackCaption,
  className = '',
}: {
  classKey: string
  chapterNum: string | number
  sectionKey: string
  sectionNumber?: number
  contentType?: string
  position: ImagePosition
  fallbackImage?: string
  fallbackCaption?: string
  className?: string
}) {
  const [, setTick] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const handleUpdate = () => setTick(t => t + 1)
    window.addEventListener('image_placements_updated', handleUpdate)
    window.addEventListener('storage', handleUpdate)
    return () => {
      window.removeEventListener('image_placements_updated', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [])

  const placement = imagePlacementService.getPlacement(
    classKey,
    chapterNum,
    sectionKey,
    position,
    sectionNumber,
    contentType
  )
  const imgUrl = placement?.imageUrl
  const caption = placement?.caption
  const altText = placement?.altText || caption || `${sectionKey} Visual`

  if (!imgUrl) return null

  // Varied layout styles based on position
  if (position === 'header') {
    return (
      <div className={`relative overflow-hidden rounded-3xl border border-slate-200/80 shadow-md my-4 max-h-72 w-full bg-slate-950 group ${className}`}>
        <img
          src={imgUrl}
          alt={altText}
          className="w-full h-full object-cover max-h-72 opacity-90 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
          <span className="font-bold flex items-center gap-1.5 drop-shadow-md">
            <Sparkles size={14} className="text-amber-400" /> {caption || 'Official Chapter Visual'}
          </span>
          <button
            onClick={() => setModalOpen(true)}
            className="p-1.5 bg-black/50 hover:bg-black/80 rounded-xl backdrop-blur-md text-white transition-all cursor-pointer"
            title="Enlarge Image"
          >
            <ZoomIn size={14} />
          </button>
        </div>
      </div>
    )
  }

  if (position === 'after_hook') {
    return (
      <div className={`bg-gradient-to-r from-blue-50/70 to-indigo-50/50 p-4 rounded-3xl border border-blue-200/70 shadow-xs my-3 flex flex-col sm:flex-row items-center gap-4 ${className}`}>
        <div className="w-full sm:w-44 h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-900 shadow-inner relative group cursor-pointer" onClick={() => setModalOpen(true)}>
          <img src={imgUrl} alt={altText} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
        </div>
        <div className="flex-1 space-y-1 text-center sm:text-left">
          <span className="text-[10px] font-black uppercase text-blue-700 tracking-wider">Concept Visual Clue</span>
          <p className="text-xs text-slate-700 font-semibold leading-relaxed">{caption || 'Observe this visual clue to understand the lesson concept.'}</p>
        </div>
      </div>
    )
  }

  if (position === 'activity') {
    return (
      <div className={`bg-white rounded-3xl border-2 border-emerald-100 p-4 shadow-sm my-4 space-y-2.5 ${className}`}>
        <div className="flex items-center justify-between text-xs font-black text-emerald-800 uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Layers size={14} className="text-emerald-600" /> Practical Task Diagram
          </span>
          <button onClick={() => setModalOpen(true)} className="text-[10px] text-emerald-600 hover:underline">Tap to Zoom</button>
        </div>
        <div className="rounded-2xl overflow-hidden max-h-64 bg-slate-950 cursor-pointer" onClick={() => setModalOpen(true)}>
          <img src={imgUrl} alt={altText} className="w-full h-full object-cover max-h-64 hover:scale-105 transition-transform duration-500" />
        </div>
        {caption && (
          <p className="text-xs text-slate-600 font-medium italic pt-1">{caption}</p>
        )}
      </div>
    )
  }

  // Default: mid_lesson / bottom_summary
  return (
    <div className={`bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 my-4 ${className}`}>
      <div className="relative aspect-video max-h-80 w-full overflow-hidden bg-slate-950 cursor-pointer" onClick={() => setModalOpen(true)}>
        <img
          src={imgUrl}
          alt={altText}
          className="w-full h-full object-cover opacity-95 hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
          <Eye size={12} className="text-cyan-400" />
          <span>Curriculum Visual</span>
        </div>
      </div>
      {caption && (
        <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600 font-semibold italic">
          <Compass size={15} className="text-blue-600 flex-shrink-0" />
          <span>{caption}</span>
        </div>
      )}

      {/* Fullscreen Image Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer" onClick={() => setModalOpen(false)}>
          <div className="relative max-w-4xl max-h-[90vh] bg-slate-950 rounded-3xl overflow-hidden p-2 border border-slate-700 shadow-2xl">
            <img src={imgUrl} alt={altText} className="max-w-full max-h-[80vh] object-contain rounded-2xl mx-auto" />
            {caption && <p className="text-white text-xs font-semibold text-center py-2">{caption}</p>}
          </div>
        </div>
      )}
    </div>
  )
}
