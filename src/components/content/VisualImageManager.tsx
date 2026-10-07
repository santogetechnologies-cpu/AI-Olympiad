import { useState, useEffect } from 'react'
import {
  Image, Upload, Trash2, Edit, Eye, CheckCircle,
  Layers, BookOpen, ChevronRight, AlertCircle,
  RefreshCw, Search
} from 'lucide-react'
import { Card, Button, Input, Modal, Badge } from '../ui'
import {
  imagePlacementService,
  type ImagePlacement,
  type ImagePosition
} from '../../services/imagePlacementService'
import { curriculumCatalogService } from '../../services/curriculumCatalogService'
import toast from 'react-hot-toast'

export const POSITION_OPTIONS: { id: ImagePosition; label: string; desc: string; icon: string }[] = [
  { id: 'header', label: 'Top Hero Banner', desc: 'Prominent header illustration above the lesson title', icon: '🖼️' },
  { id: 'after_hook', label: 'After Concept Spark / Hook', desc: 'Embedded right below the curiosity hook question', icon: '✨' },
  { id: 'mid_lesson', label: 'Mid-Lesson Educational Diagram', desc: 'Core concept diagram embedded in the main lesson body', icon: '📊' },
  { id: 'activity', label: 'Practical Activity / Lab Slot', desc: 'Graphic illustrating the interactive task or sandbox', icon: '🛠️' },
  { id: 'bottom_summary', label: 'Bottom Takeaway & Recap', desc: 'Visual takeaway summary at the conclusion of the section', icon: '🎯' },
]

export interface VisualImageManagerProps {
  initialGradeKey?: string
  initialChapterNum?: string
  initialLessonKey?: 'lesson1' | 'lesson2'
  initialSectionKey?: string
  initialPosition?: ImagePosition
}

export function VisualImageManager({
  initialGradeKey,
  initialChapterNum,
  initialLessonKey,
  initialSectionKey,
  initialPosition,
}: VisualImageManagerProps = {}) {
  const allLevels = curriculumCatalogService.getAllLevelsData()

  // 5-LEVEL HIERARCHY STATE: Class → Chapter → Lesson → Section → Image Position
  const [selectedGradeKey, setSelectedGradeKey] = useState<string>(initialGradeKey || allLevels[0]?.gradeKey || 'class3')
  const [selectedChapterNum, setSelectedChapterNum] = useState<string>(initialChapterNum || '1')
  const [selectedLessonKey, setSelectedLessonKey] = useState<'lesson1' | 'lesson2'>(initialLessonKey || 'lesson1')
  const [selectedSectionKey, setSelectedSectionKey] = useState<string>(initialSectionKey || 'lesson1')
  const [selectedPosition, setSelectedPosition] = useState<ImagePosition>(initialPosition || 'mid_lesson')

  // Placements state
  const [placements, setPlacements] = useState<ImagePlacement[]>([])

  // Upload/Edit Form state
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [caption, setCaption] = useState<string>('')
  const [altText, setAltText] = useState<string>('')
  const [uploading, setUploading] = useState<boolean>(false)

  // Preview Modal
  const [previewModal, setPreviewModal] = useState<{ open: boolean; placement?: ImagePlacement }>({ open: false })
  const [filterSearch, setFilterSearch] = useState('')

  const activeLevel = allLevels.find(l => l.gradeKey === selectedGradeKey) || allLevels[0]
  const activeChapter = activeLevel?.chapters.find(c => String(c.chapterNumber) === selectedChapterNum) || activeLevel?.chapters[0]

  // All 8 canonical sections available in this chapter
  const sectionOptions = [
    { key: 'video', sectionNum: 1, lesson: 'general', label: `Section 1: Video Briefing (${activeChapter?.chapterTitle || 'Visual Exploration'})` },
    { key: 'lesson1', sectionNum: 2, lesson: 'lesson1', label: `Section 2: Lesson 1 (${activeChapter?.topic1 || 'Topic 1'} Foundations)` },
    { key: 'lesson2', sectionNum: 3, lesson: 'lesson2', label: `Section 3: Lesson 2 (${activeChapter?.topic2 || 'Topic 2'} Mission Scenario)` },
    { key: 'worksheet', sectionNum: 4, lesson: 'general', label: 'Section 4: Interactive Reflection Workbook' },
    { key: 'activity', sectionNum: 5, lesson: 'general', label: 'Section 5: Practical Activity / Challenge Game' },
    { key: 'resource', sectionNum: 6, lesson: 'general', label: 'Section 6: Discovery Lab / Virtual Experiment' },
    { key: 'assignment', sectionNum: 7, lesson: 'general', label: 'Section 7: Graded Capstone Assignment' },
    { key: 'quiz', sectionNum: 8, lesson: 'general', label: 'Section 8: Chapter Mastery Assessment Quiz' },
  ]

  const activeSection = sectionOptions.find(s => s.key === selectedSectionKey) || sectionOptions[0]

  const loadPlacements = async () => {
    try {
      const data = await imagePlacementService.getAllPlacements()
      setPlacements(data)
    } catch {
      // Ignored
    }
  }

  useEffect(() => {
    loadPlacements()
    const handleUpdate = () => loadPlacements()
    window.addEventListener('image_placements_updated', handleUpdate)
    return () => window.removeEventListener('image_placements_updated', handleUpdate)
  }, [])

  // Find currently assigned image for the active slot
  const currentSlotPlacement = imagePlacementService.getPlacement(
    selectedGradeKey,
    selectedChapterNum,
    selectedSectionKey,
    selectedPosition
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadFile(file)
      const objUrl = URL.createObjectURL(file)
      setPreviewUrl(objUrl)
    }
  }

  const handleSavePlacement = async () => {
    let imageUrl = previewUrl
    if (uploadFile) {
      setUploading(true)
      try {
        imageUrl = await imagePlacementService.uploadImageFile(uploadFile)
      } catch {
        toast.error('Upload failed, using local preview')
      } finally {
        setUploading(false)
      }
    }

    if (!imageUrl) {
      toast.error('Please upload an image file or provide a valid image URL')
      return
    }

    try {
      await imagePlacementService.assignPlacement({
        classKey: selectedGradeKey,
        className: activeLevel.name,
        chapterNum: selectedChapterNum,
        chapterTitle: activeChapter?.chapterTitle || `Chapter ${selectedChapterNum}`,
        sectionKey: selectedSectionKey,
        sectionTitle: activeSection.label,
        position: selectedPosition,
        imageUrl,
        caption: caption || `Educational visual for ${activeSection.label}`,
        altText: altText || `${activeLevel.name} - ${activeSection.label}`,
      })

      toast.success(`✓ Image assigned at [${selectedPosition}] for ${activeLevel.name}!`)
      setUploadFile(null)
      setPreviewUrl('')
      setCaption('')
      setAltText('')
      loadPlacements()
    } catch {
      toast.error('Failed to save image assignment')
    }
  }

  const handleRemove = async (id: string) => {
    if (confirm('Are you sure you want to remove this assigned image? Students will no longer see it.')) {
      await imagePlacementService.removePlacement(id)
      toast.success('Image removed from lesson slot')
      loadPlacements()
    }
  }

  const filteredPlacements = placements.filter(p => {
    const s = filterSearch.toLowerCase()
    return (
      p.className.toLowerCase().includes(s) ||
      p.chapterTitle.toLowerCase().includes(s) ||
      p.sectionTitle.toLowerCase().includes(s) ||
      p.position.toLowerCase().includes(s) ||
      (p.caption && p.caption.toLowerCase().includes(s))
    )
  })

  return (
    <div className="space-y-8 fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 rounded-3xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden border border-blue-900/50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-blue-300 border border-blue-400/20">
            <Image size={14} className="text-amber-300" />
            <span>Lesson Images Hub: Class → Chapter → Lesson → Section → Position</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
            Lesson Images & Visual Slot Manager
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Upload, preview, replace, and remove images mapped directly to specific lesson sections. Images appear at varied positions inside the selected section and are visible only to enrolled students in that class.
          </p>
        </div>
      </div>

      {/* ── 1. HIERARCHY SELECTOR & PLACEMENT ENGINE ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: 5-Step Strict Hierarchy Selection */}
        <Card className="lg:col-span-5 p-5 sm:p-6 space-y-5 border border-slate-200 shadow-sm bg-white">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
              <Layers size={18} className="text-blue-600" />
              <span>1. Image Placement Hierarchy</span>
            </div>
            <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              5-Step Mapping
            </span>
          </div>

          {/* Step 1: Academic Class */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Step 1: Academic Class
            </label>
            <select
              value={selectedGradeKey}
              onChange={e => {
                setSelectedGradeKey(e.target.value)
                setSelectedChapterNum('1')
                setSelectedLessonKey('lesson1')
                setSelectedSectionKey('lesson1')
              }}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3 py-2.5 text-xs font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {allLevels.map(lvl => (
                <option key={lvl.gradeKey} value={lvl.gradeKey}>
                  {lvl.name} ({lvl.tier.toUpperCase()} • {lvl.age})
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: Chapter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Step 2: Chapter
            </label>
            <div className="grid grid-cols-3 gap-2">
              {activeLevel.chapters.map(ch => (
                <button
                  key={ch.chapterNumber}
                  type="button"
                  onClick={() => {
                    setSelectedChapterNum(String(ch.chapterNumber))
                    setSelectedSectionKey(selectedLessonKey === 'lesson2' ? 'lesson2' : 'lesson1')
                  }}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                    String(ch.chapterNumber) === selectedChapterNum
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="block text-[10px] opacity-80">Ch. {ch.chapterNumber}</span>
                  <span className="truncate block mt-0.5">{ch.chapterTitle}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Lesson */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Step 3: Lesson
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedLessonKey('lesson1')
                  setSelectedSectionKey('lesson1')
                }}
                className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                  selectedLessonKey === 'lesson1'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="block text-[10px] opacity-80">Lesson 1</span>
                <span className="truncate block mt-0.5">{activeChapter?.topic1 || 'Topic 1'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedLessonKey('lesson2')
                  setSelectedSectionKey('lesson2')
                }}
                className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                  selectedLessonKey === 'lesson2'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="block text-[10px] opacity-80">Lesson 2</span>
                <span className="truncate block mt-0.5">{activeChapter?.topic2 || 'Topic 2'}</span>
              </button>
            </div>
          </div>

          {/* Step 4: Section */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Step 4: Section
            </label>
            <select
              value={selectedSectionKey}
              onChange={e => setSelectedSectionKey(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3 py-2.5 text-xs font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {sectionOptions.map(opt => (
                <option key={opt.key} value={opt.key}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Step 5: Image Position */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Step 5: Image Slot Position Inside Section
            </label>
            <div className="space-y-2">
              {POSITION_OPTIONS.map(pos => (
                <label
                  key={pos.id}
                  onClick={() => setSelectedPosition(pos.id)}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedPosition === pos.id
                      ? 'bg-indigo-50/80 border-indigo-300 shadow-xs'
                      : 'bg-slate-50/60 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-lg flex-shrink-0 mt-0.5">{pos.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{pos.label}</span>
                      {selectedPosition === pos.id && (
                        <CheckCircle size={14} className="text-indigo-600 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{pos.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </Card>

        {/* Right Column: Active Mapping Status & Upload / Replace Action Panel */}
        <Card className="lg:col-span-7 p-5 sm:p-6 space-y-5 border border-slate-200 shadow-sm bg-white flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Exact Mapping Breadcrumb Pill */}
            <div className="p-3.5 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-1.5 shadow-inner">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                Target Educational Mapping Slot:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap text-xs font-bold text-slate-200">
                <span className="bg-blue-600 text-white px-2 py-0.5 rounded">{activeLevel.name}</span>
                <ChevronRight size={12} className="text-slate-500" />
                <span className="bg-indigo-600 text-white px-2 py-0.5 rounded">Ch.{selectedChapterNum}: {activeChapter?.chapterTitle}</span>
                <ChevronRight size={12} className="text-slate-500" />
                <span className="bg-purple-600 text-white px-2 py-0.5 rounded truncate max-w-[180px]">{activeSection.label}</span>
                <ChevronRight size={12} className="text-slate-500" />
                <span className="bg-amber-500 text-white px-2 py-0.5 rounded">[{selectedPosition}]</span>
              </div>
            </div>

            {/* Current Slot State (Assigned vs Empty) */}
            {currentSlotPlacement ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="success" className="font-bold">✓ Active Image Assigned</Badge>
                    <span className="text-xs text-slate-500">
                      Uploaded {new Date(currentSlotPlacement.uploadedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setPreviewModal({ open: true, placement: currentSlotPlacement })}
                      className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Eye size={14} /> Preview
                    </button>
                    <button
                      onClick={() => handleRemove(currentSlotPlacement.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-24 h-20 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 flex-shrink-0">
                    <img
                      src={currentSlotPlacement.imageUrl}
                      alt={currentSlotPlacement.altText}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1 text-xs space-y-1">
                    <p className="font-bold text-slate-900 truncate">{currentSlotPlacement.caption || 'No caption'}</p>
                    <p className="text-[11px] text-slate-500 font-mono truncate">{currentSlotPlacement.imageUrl}</p>
                    <span className="text-[10px] text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full inline-block font-semibold">
                      Visible to {activeLevel.name} Students
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-2xl flex items-center gap-3 text-slate-500 text-xs">
                <AlertCircle size={18} className="text-slate-400 flex-shrink-0" />
                <p>
                  No image is currently assigned to this slot. The lesson will display a clean formatted conceptual layout without placeholder gaps.
                </p>
              </div>
            )}

            {/* Upload or Replace Form */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Upload size={14} className="text-blue-600" />
                <span>{currentSlotPlacement ? 'Replace Existing Image' : 'Upload & Assign New Image'}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select Image File (PNG, JPG, SVG, WebP)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Or Enter Image URL Directly
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
              </div>

              {previewUrl && (
                <div className="relative aspect-video max-h-40 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    Slot Preview
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Figure Caption (Displayed under image in lesson)"
                  placeholder="e.g. Figure 1.1: Decision logic sensor flow."
                  value={caption}
                  onChange={e => setCaption(e.target.value)}
                />
                <Input
                  label="Accessibility Alt Text"
                  placeholder="e.g. Robot arm path finding visual"
                  value={altText}
                  onChange={e => setAltText(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
            <span className="text-xs text-slate-500">
              Assigned visuals immediately sync to student lesson views.
            </span>
            <Button
              onClick={handleSavePlacement}
              loading={uploading}
              disabled={!previewUrl && !uploadFile}
              className="px-6 font-bold"
            >
              {currentSlotPlacement ? 'Update & Replace Image' : 'Save & Assign Image'}
            </Button>
          </div>
        </Card>
      </div>

      {/* ── 2. COMPREHENSIVE DIRECTORY TABLE OF ALL PLACED IMAGES ── */}
      <Card className="p-5 sm:p-6 space-y-4 border border-slate-200 shadow-sm bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <BookOpen size={18} className="text-blue-600" />
              <span>All Placed Lesson Images Directory ({placements.length})</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified active image placements mapped across all academic classes, chapters and lessons.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Filter by Class, Chapter or Lesson..."
                value={filterSearch}
                onChange={e => setFilterSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-52 sm:w-64"
              />
            </div>
            <Button variant="outline" size="sm" onClick={loadPlacements}>
              <RefreshCw size={13} />
            </Button>
          </div>
        </div>

        {filteredPlacements.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <th className="p-3">Preview</th>
                  <th className="p-3">Academic Class</th>
                  <th className="p-3">Chapter</th>
                  <th className="p-3">Lesson / Section</th>
                  <th className="p-3">Slot Position</th>
                  <th className="p-3">Caption</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPlacements.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3">
                      <div
                        onClick={() => setPreviewModal({ open: true, placement: p })}
                        className="w-12 h-10 rounded-lg overflow-hidden bg-slate-900 cursor-pointer shadow-xs border border-slate-200 hover:scale-105 transition-transform"
                      >
                        <img src={p.imageUrl} alt={p.altText} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="p-3 font-bold text-slate-900">{p.className}</td>
                    <td className="p-3 text-slate-700">Ch.{p.chapterNum}: {p.chapterTitle}</td>
                    <td className="p-3 text-slate-700 font-medium truncate max-w-[160px]">{p.sectionTitle}</td>
                    <td className="p-3">
                      <span className="bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full text-[10px] border border-indigo-200">
                        {p.position}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500 truncate max-w-[200px]">{p.caption || '—'}</td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setPreviewModal({ open: true, placement: p })}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Preview"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedGradeKey(p.classKey)
                            setSelectedChapterNum(String(p.chapterNum))
                            setSelectedSectionKey(p.sectionKey)
                            setSelectedPosition(p.position)
                            setPreviewUrl(p.imageUrl)
                            setCaption(p.caption || '')
                            setAltText(p.altText || '')
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                          }}
                          className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit / Replace"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleRemove(p.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Remove"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50/60 rounded-2xl border border-dashed border-slate-200">
            <Image size={36} className="text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-700">No Image Placements Found</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Use the placement engine above to assign illustrations to specific lesson slots.
            </p>
          </div>
        )}
      </Card>

      {/* ── 3. IMAGE PREVIEW IN CONTEXT MODAL ── */}
      <Modal
        open={previewModal.open}
        onClose={() => setPreviewModal({ open: false })}
        title={`Lesson Visual Preview: ${previewModal.placement?.sectionTitle || 'Image'}`}
      >
        {previewModal.placement && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 p-2.5 rounded-xl">
              <span>Mapping:</span>
              <span className="text-blue-700">{previewModal.placement.className}</span>
              <span>→</span>
              <span className="text-indigo-700">Chapter {previewModal.placement.chapterNum}</span>
              <span>→</span>
              <span className="text-purple-700">{previewModal.placement.sectionTitle}</span>
              <span>→</span>
              <span className="text-amber-700">[{previewModal.placement.position}]</span>
            </div>

            <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-md">
              <img
                src={previewModal.placement.imageUrl}
                alt={previewModal.placement.altText}
                className="w-full max-h-96 object-contain"
              />
            </div>

            {previewModal.placement.caption && (
              <p className="text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                💬 Caption: {previewModal.placement.caption}
              </p>
            )}

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle size={14} /> Active in student curriculum view
              </span>
              <Button variant="outline" size="sm" onClick={() => setPreviewModal({ open: false })}>
                Close Preview
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
