import { useState, useEffect } from 'react'
import {
  Image, Upload, Trash2, Eye, CheckCircle2,
  Compass, FileImage
} from 'lucide-react'
import { Button, Input } from '../ui'
import {
  imagePlacementService,
  type ImagePlacement,
  type ImagePosition,
  normalizeClassKey,
  normalizeChapterNum,
  normalizeSectionKey
} from '../../services/imagePlacementService'
import toast from 'react-hot-toast'

export const SECTION_IMAGE_POSITIONS: { id: ImagePosition; label: string; desc: string; icon: string }[] = [
  { id: 'header', label: 'Top Hero Banner', desc: 'Prominent header image at the very top of this section', icon: '🖼️' },
  { id: 'after_hook', label: 'After Intro / Spark Hook', desc: 'Visual placed right under the opening question or hook', icon: '✨' },
  { id: 'mid_lesson', label: 'Mid-Section Educational Diagram', desc: 'Primary conceptual visual placed inside the section body', icon: '📊' },
  { id: 'activity', label: 'Activity / Interactive Sandbox Slot', desc: 'Visual placed adjacent to the practical task or instructions', icon: '🛠️' },
  { id: 'bottom_summary', label: 'Bottom Takeaway & Recap', desc: 'Closing summary visual at the base of this section', icon: '🎯' },
]

export interface SectionImageEditorProps {
  classKey: string
  className?: string
  chapterNum: string | number
  chapterTitle?: string
  sectionKey: string
  sectionTitle: string
  onUpdated?: () => void
}

export function SectionImageEditor({
  classKey,
  className = 'Enrolled Class',
  chapterNum,
  chapterTitle = 'Chapter',
  sectionKey,
  sectionTitle,
  onUpdated,
}: SectionImageEditorProps) {
  const [selectedPosition, setSelectedPosition] = useState<ImagePosition>('mid_lesson')
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [caption, setCaption] = useState<string>('')
  const [altText, setAltText] = useState<string>('')
  const [uploading, setUploading] = useState<boolean>(false)
  const [currentPlacements, setCurrentPlacements] = useState<Record<string, ImagePlacement | undefined>>({})

  const cleanClass = normalizeClassKey(classKey)
  const cleanChap = normalizeChapterNum(chapterNum)
  const cleanSec = normalizeSectionKey(sectionKey)

  const loadCurrentPlacements = () => {
    const map = imagePlacementService.getPlacementsForSection(cleanClass, cleanChap, cleanSec)
    setCurrentPlacements(map)

    const activePlacement = map[selectedPosition]
    if (activePlacement) {
      setPreviewUrl(activePlacement.imageUrl)
      setCaption(activePlacement.caption || '')
      setAltText(activePlacement.altText || '')
    } else {
      setPreviewUrl('')
      setCaption('')
      setAltText('')
      setUploadFile(null)
    }
  }

  useEffect(() => {
    loadCurrentPlacements()
  }, [cleanClass, cleanChap, cleanSec, selectedPosition])

  useEffect(() => {
    const handleUpdate = () => loadCurrentPlacements()
    window.addEventListener('image_placements_updated', handleUpdate)
    return () => window.removeEventListener('image_placements_updated', handleUpdate)
  }, [cleanClass, cleanChap, cleanSec, selectedPosition])

  const handlePositionChange = (pos: ImagePosition) => {
    setSelectedPosition(pos)
    const existing = currentPlacements[pos]
    if (existing) {
      setPreviewUrl(existing.imageUrl)
      setCaption(existing.caption || '')
      setAltText(existing.altText || '')
      setUploadFile(null)
    } else {
      setPreviewUrl('')
      setCaption('')
      setAltText('')
      setUploadFile(null)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadFile(file)
      const objUrl = URL.createObjectURL(file)
      setPreviewUrl(objUrl)
    }
  }

  const handleSave = async () => {
    if (!previewUrl && !uploadFile) {
      toast.error('Please select or upload an image first')
      return
    }

    setUploading(true)
    try {
      let finalUrl = previewUrl
      if (uploadFile) {
        finalUrl = await imagePlacementService.uploadImageFile(uploadFile)
      }

      await imagePlacementService.assignPlacement({
        classKey: cleanClass,
        className,
        chapterNum: cleanChap,
        chapterTitle,
        sectionKey: cleanSec,
        sectionTitle,
        position: selectedPosition,
        imageUrl: finalUrl,
        caption,
        altText: altText || `${sectionTitle} - ${selectedPosition}`,
      })

      toast.success(`Image saved for ${sectionTitle} (${selectedPosition})! Visible on Student Page ✓`)
      setUploadFile(null)
      loadCurrentPlacements()
      onUpdated?.()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to save image')
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = async () => {
    const active = currentPlacements[selectedPosition]
    if (!active) {
      setPreviewUrl('')
      setUploadFile(null)
      return
    }

    try {
      await imagePlacementService.removePlacement(active.id)
      toast.success('Assigned image removed')
      setPreviewUrl('')
      setUploadFile(null)
      setCaption('')
      setAltText('')
      loadCurrentPlacements()
      onUpdated?.()
    } catch {
      toast.error('Failed to remove image')
    }
  }

  const activePlacement = currentPlacements[selectedPosition]

  return (
    <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-4 my-4">
      {/* Header and Hierarchy Path */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0 shadow-xs">
            <Image size={16} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">Section Image Manager</h4>
            <p className="text-[11px] text-slate-500 font-medium">
              Assign, replace, or preview visual media embedded inside this section
            </p>
          </div>
        </div>

        {/* Live Active Status Badge */}
        {activePlacement ? (
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full text-xs font-semibold">
            <CheckCircle2 size={13} className="text-emerald-600" /> Active in Student View
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-500 border border-slate-200 px-2.5 py-1 rounded-full text-xs font-medium">
            No image assigned
          </span>
        )}
      </div>

      {/* Hierarchy Breadcrumb Line */}
      <div className="bg-white px-3 py-2 rounded-xl border border-slate-200/80 flex items-center gap-1.5 text-xs text-slate-600 flex-wrap font-mono">
        <span className="text-slate-400">Path:</span>
        <span className="font-bold text-blue-600">{className}</span>
        <span className="text-slate-300">→</span>
        <span className="font-bold text-indigo-600">Ch.{cleanChap}</span>
        <span className="text-slate-300">→</span>
        <span className="font-bold text-purple-600">{sectionTitle}</span>
        <span className="text-slate-300">→</span>
        <span className="font-bold text-amber-600">Image ({selectedPosition})</span>
      </div>

      {/* Position Selector */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
          Image Placement Position Inside Section:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {SECTION_IMAGE_POSITIONS.map(pos => {
            const hasAssigned = Boolean(currentPlacements[pos.id])
            const isSelected = selectedPosition === pos.id
            return (
              <button
                key={pos.id}
                type="button"
                onClick={() => handlePositionChange(pos.id)}
                className={`flex flex-col text-left p-2.5 rounded-xl border-2 transition-all relative ${
                  isSelected
                    ? 'border-purple-600 bg-purple-50/50 shadow-xs'
                    : hasAssigned
                    ? 'border-emerald-300 bg-white hover:border-emerald-400'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                {hasAssigned && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" title="Has assigned image" />
                )}
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <span>{pos.icon}</span>
                  <span className="truncate">{pos.label}</span>
                </div>
                <p className="text-[10px] text-slate-400 line-clamp-2 mt-1 font-medium">{pos.desc}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Image Upload, Preview & Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {/* Left: Upload and URL Form */}
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Upload Image File
            </label>
            <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-purple-400 hover:bg-purple-50/20 transition-all text-center">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={uploading}
              />
              <Upload size={20} className="text-slate-400 mb-1" />
              <p className="text-xs font-medium text-slate-700">
                {uploadFile ? uploadFile.name : 'Click to select image file'}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, WebP, SVG supported</p>
            </label>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Or Paste External Image URL
            </label>
            <Input
              placeholder="https://images.unsplash.com/..."
              value={previewUrl}
              onChange={e => {
                setPreviewUrl(e.target.value)
                setUploadFile(null)
              }}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Caption / Explanatory Note (Visible under image)
            </label>
            <Input
              placeholder="e.g. Visual architectural diagram explaining neural layer routing..."
              value={caption}
              onChange={e => setCaption(e.target.value)}
            />
          </div>
        </div>

        {/* Right: Live Preview Box */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-700 block">
            Student View Preview ({selectedPosition})
          </label>
          <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-950 aspect-video max-h-52 flex items-center justify-center relative group">
            {previewUrl ? (
              <>
                <img
                  src={previewUrl}
                  alt={altText || caption || 'Section visual'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/10 flex items-center gap-1">
                  <Eye size={11} className="text-cyan-400" /> Preview
                </div>
              </>
            ) : (
              <div className="text-center p-6 text-slate-400">
                <FileImage size={32} className="mx-auto mb-1 opacity-40 text-slate-500" />
                <p className="text-xs font-semibold text-slate-300">No image assigned yet</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Upload a file or paste URL to preview</p>
              </div>
            )}
          </div>
          {caption && previewUrl && (
            <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 italic flex items-center gap-1.5 font-medium">
              <Compass size={14} className="text-purple-600 flex-shrink-0" />
              <span className="truncate">{caption}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-200">
        {activePlacement && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="text-red-600 hover:bg-red-50"
            icon={<Trash2 size={14} />}
          >
            Remove Image
          </Button>
        )}
        <Button
          type="button"
          size="sm"
          onClick={handleSave}
          loading={uploading}
          disabled={!previewUrl && !uploadFile}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-xs"
          icon={<CheckCircle2 size={14} />}
        >
          {activePlacement ? 'Update & Save Image' : 'Save Section Image'}
        </Button>
      </div>
    </div>
  )
}
