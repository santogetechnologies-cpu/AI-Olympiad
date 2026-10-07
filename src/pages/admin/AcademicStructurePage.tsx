import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Plus, ChevronRight, ChevronDown, Edit, BookOpen,
  Layers, FolderOpen, FileText, Trash2, AlertTriangle
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { AppLayout } from '../../components/layout/AppLayout'
import { Card, Button, Modal, Input, Textarea, Select, Badge, LoadingState, EmptyState } from '../../components/ui'
import { categoryService } from '../../services/categoryService'
import { classService } from '../../services/classService'
import { subjectService } from '../../services/subjectService'
import { chapterService } from '../../services/chapterService'
import type { Category, Class, Subject, Chapter } from '../../types'
import toast from 'react-hot-toast'
import { auditService } from '../../services/analyticsService'

// ─── Category Form ────────────────────────────────────────────────────────────
const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']),
})
type CategoryForm = z.infer<typeof categorySchema>

// ─── Class Form ───────────────────────────────────────────────────────────────
const classSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']),
})
type ClassForm = z.infer<typeof classSchema>

// ─── Subject Form ─────────────────────────────────────────────────────────────
const subjectSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']),
})
type SubjectForm = z.infer<typeof subjectSchema>

// ─── Chapter Form ─────────────────────────────────────────────────────────────
const chapterSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  chapter_number: z.string().optional(),
  short_description: z.string().optional(),
  description: z.string().optional(),
  estimated_duration: z.coerce.number().optional(),
  status: z.enum(['draft', 'published', 'archived']),
})
type ChapterForm = z.infer<typeof chapterSchema>

const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
]

export default function AcademicStructurePage() {
  const { user } = useAuth()
  const [categories, setCategories] = useState<Category[]>([])
  const [classes, setClasses] = useState<Class[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  // Modals
  const [catModal, setCatModal] = useState<{ open: boolean; editing?: Category }>({ open: false })
  const [classModal, setClassModal] = useState<{ open: boolean; categoryId?: string; editing?: Class }>({ open: false })
  const [subModal, setSubModal] = useState<{ open: boolean; classId?: string; editing?: Subject }>({ open: false })
  const [chapModal, setChapModal] = useState<{ open: boolean; subjectId?: string; editing?: Chapter }>({ open: false })

  // Delete Confirmation Modal
  const [deleteConfirm, setDeleteConfirm] = useState<{
    open: boolean
    type: 'category' | 'class' | 'subject' | 'chapter'
    id: string
    title: string
    subtitle?: string
  }>({
    open: false,
    type: 'class',
    id: '',
    title: '',
  })
  const [deleting, setDeleting] = useState(false)

  const orgId = user!.organization_id

  const loadAll = async () => {
    setLoading(true)
    try {
      const [cats, cls, subs, chaps] = await Promise.all([
        categoryService.getAll(orgId),
        classService.getAll(orgId),
        subjectService.getAll(orgId),
        chapterService.getAll(orgId),
      ])
      setCategories(cats)
      setClasses(cls)
      setSubjects(subs)
      setChapters(chaps)
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadAll() }, [])

  const toggle = (id: string) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }))

  const statusBadge = (status: string) => (
    <Badge variant={status as 'draft' | 'published' | 'archived'}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )

  // ── Handle Delete Confirmation ──
  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.id) return
    setDeleting(true)
    try {
      if (deleteConfirm.type === 'category') {
        await categoryService.delete(deleteConfirm.id)
        await auditService.log({
          organization_id: orgId,
          user_id: user!.id,
          action: 'DELETE',
          entity_type: 'category',
          old_data: { id: deleteConfirm.id, name: deleteConfirm.title }
        })
        toast.success(`Category "${deleteConfirm.title}" deleted`)
      } else if (deleteConfirm.type === 'class') {
        await classService.delete(deleteConfirm.id)
        await auditService.log({
          organization_id: orgId,
          user_id: user!.id,
          action: 'DELETE',
          entity_type: 'class',
          old_data: { id: deleteConfirm.id, name: deleteConfirm.title }
        })
        toast.success(`Class "${deleteConfirm.title}" deleted`)
      } else if (deleteConfirm.type === 'subject') {
        await subjectService.delete(deleteConfirm.id)
        await auditService.log({
          organization_id: orgId,
          user_id: user!.id,
          action: 'DELETE',
          entity_type: 'subject',
          old_data: { id: deleteConfirm.id, name: deleteConfirm.title }
        })
        toast.success(`Subject "${deleteConfirm.title}" deleted`)
      } else if (deleteConfirm.type === 'chapter') {
        await chapterService.delete(deleteConfirm.id)
        await auditService.log({
          organization_id: orgId,
          user_id: user!.id,
          action: 'DELETE',
          entity_type: 'chapter',
          old_data: { id: deleteConfirm.id, title: deleteConfirm.title }
        })
        toast.success(`Chapter "${deleteConfirm.title}" deleted`)
      }
      setDeleteConfirm({ open: false, type: 'class', id: '', title: '' })
      await loadAll()
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : `Failed to delete ${deleteConfirm.type}`)
    } finally {
      setDeleting(false)
    }
  }

  // ── Category CRUD ──
  const CategoryModal = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<CategoryForm>({
      resolver: zodResolver(categorySchema),
      defaultValues: catModal.editing ? {
        name: catModal.editing.name,
        description: catModal.editing.description || '',
        status: catModal.editing.status,
      } : { status: 'draft' },
    })
    const [saving, setSaving] = useState(false)
    const onSubmit = async (data: CategoryForm) => {
      setSaving(true)
      try {
        const slug = data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        if (catModal.editing) {
          await categoryService.update(catModal.editing.id, data)
          toast.success('Category updated')
        } else {
          await categoryService.create({ ...data, slug, organization_id: orgId, display_order: categories.length, created_by: user!.id })
          await auditService.log({ organization_id: orgId, user_id: user!.id, action: 'CREATE', entity_type: 'category', new_data: { name: data.name } })
          toast.success('Category created')
        }
        setCatModal({ open: false })
        loadAll()
      } catch (e: unknown) {
        toast.error(e instanceof Error ? e.message : 'Failed to save')
      } finally {
        setSaving(false)
      }
    }
    return (
      <Modal open={catModal.open} onClose={() => setCatModal({ open: false })} title={catModal.editing ? 'Edit Category' : 'Create Category'}>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <Input label="Category Name" placeholder="e.g. School Education" required error={errors.name?.message} {...register('name')} />
          <Textarea label="Description" placeholder="Brief description..." {...register('description')} />
          <Select label="Status" options={statusOptions} {...register('status')} />
          <div className="flex gap-3 justify-end pt-2">
            <Button type="button" variant="outline" onClick={() => setCatModal({ open: false })}>Cancel</Button>
            <Button type="submit" loading={saving}>{catModal.editing ? 'Update' : 'Create'} Category</Button>
          </div>
        </form>
      </Modal>
    )
  }

  const ClassModal = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ClassForm>({
      resolver: zodResolver(classSchema),
      defaultValues: classModal.editing ? { name: classModal.editing.name, code: classModal.editing.code || '', description: classModal.editing.description || '', status: classModal.editing.status } : { status: 'draft' },
    })
    const [saving, setSaving] = useState(false)
    const onSubmit = async (data: ClassForm) => {
      setSaving(true)
      try {
        if (classModal.editing) {
          await classService.update(classModal.editing.id, data)
          toast.success('Class updated')
        } else {
          await classService.create({ ...data, organization_id: orgId, category_id: classModal.categoryId!, display_order: classes.filter(c => c.category_id === classModal.categoryId).length, created_by: user!.id })
          toast.success('Class created')
        }
        setClassModal({ open: false })
        loadAll()
      } catch (e: unknown) { toast.error(e instanceof Error ? e.message : 'Failed') } finally { setSaving(false) }
    }
    return (
      <Modal open={classModal.open} onClose={() => setClassModal({ open: false })} title={classModal.editing ? 'Edit Class' : 'Add Class'}>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <Input label="Class Name" placeholder="e.g. Class 10" required error={errors.name?.message} {...register('name')} />
          <Input label="Code (Optional)" placeholder="e.g. CLS-10" {...register('code')} />
          <Textarea label="Description" {...register('description')} />
          <Select label="Status" options={statusOptions} {...register('status')} />
          <div className="flex gap-3 justify-end pt-2">
            <Button type="button" variant="outline" onClick={() => setClassModal({ open: false })}>Cancel</Button>
            <Button type="submit" loading={saving}>{classModal.editing ? 'Update' : 'Create'} Class</Button>
          </div>
        </form>
      </Modal>
    )
  }

  const SubjectModal = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SubjectForm>({
      resolver: zodResolver(subjectSchema),
      defaultValues: subModal.editing ? { name: subModal.editing.name, code: subModal.editing.code || '', description: subModal.editing.description || '', status: subModal.editing.status } : { status: 'draft' },
    })
    const [saving, setSaving] = useState(false)
    const onSubmit = async (data: SubjectForm) => {
      setSaving(true)
      try {
        if (subModal.editing) {
          await subjectService.update(subModal.editing.id, data)
          toast.success('Subject updated')
        } else {
          await subjectService.create({ ...data, organization_id: orgId, class_id: subModal.classId!, display_order: subjects.filter(s => s.class_id === subModal.classId).length, created_by: user!.id })
          toast.success('Subject created')
        }
        setSubModal({ open: false })
        loadAll()
      } catch (e: unknown) { toast.error(e instanceof Error ? e.message : 'Failed') } finally { setSaving(false) }
    }
    return (
      <Modal open={subModal.open} onClose={() => setSubModal({ open: false })} title={subModal.editing ? 'Edit Subject' : 'Add Subject'}>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <Input label="Subject Name" placeholder="e.g. Mathematics" required error={errors.name?.message} {...register('name')} />
          <Input label="Code (Optional)" placeholder="e.g. MATH-10" {...register('code')} />
          <Textarea label="Description" {...register('description')} />
          <Select label="Status" options={statusOptions} {...register('status')} />
          <div className="flex gap-3 justify-end pt-2">
            <Button type="button" variant="outline" onClick={() => setSubModal({ open: false })}>Cancel</Button>
            <Button type="submit" loading={saving}>{subModal.editing ? 'Update' : 'Create'} Subject</Button>
          </div>
        </form>
      </Modal>
    )
  }

  const ChapterModal = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ChapterForm>({
      resolver: zodResolver(chapterSchema),
      defaultValues: chapModal.editing ? {
        title: chapModal.editing.title,
        chapter_number: chapModal.editing.chapter_number || '',
        short_description: chapModal.editing.short_description || '',
        description: chapModal.editing.description || '',
        estimated_duration: chapModal.editing.estimated_duration,
        status: chapModal.editing.status,
      } : { status: 'draft' },
    })
    const [saving, setSaving] = useState(false)
    const onSubmit = async (data: ChapterForm) => {
      setSaving(true)
      try {
        if (chapModal.editing) {
          await chapterService.update(chapModal.editing.id, data)
          toast.success('Chapter updated')
        } else {
          await chapterService.create({ ...data, organization_id: orgId, subject_id: chapModal.subjectId!, display_order: chapters.filter(c => c.subject_id === chapModal.subjectId).length, created_by: user!.id })
          toast.success('Chapter created')
        }
        setChapModal({ open: false })
        loadAll()
      } catch (e: unknown) { toast.error(e instanceof Error ? e.message : 'Failed') } finally { setSaving(false) }
    }
    return (
      <Modal open={chapModal.open} onClose={() => setChapModal({ open: false })} title={chapModal.editing ? 'Edit Chapter' : 'Add Chapter'}>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <Input label="Chapter Title" placeholder="e.g. Real Numbers" required error={errors.title?.message} {...register('title')} />
          <Input label="Chapter Number (Optional)" placeholder="e.g. 1 or 1.1" {...register('chapter_number')} />
          <Input label="Short Description" placeholder="Brief summary..." {...register('short_description')} />
          <Textarea label="Full Description" {...register('description')} />
          <Input label="Estimated Duration (minutes)" type="number" {...register('estimated_duration')} />
          <Select label="Status" options={statusOptions} {...register('status')} />
          <div className="flex gap-3 justify-end pt-2">
            <Button type="button" variant="outline" onClick={() => setChapModal({ open: false })}>Cancel</Button>
            <Button type="submit" loading={saving}>{chapModal.editing ? 'Update' : 'Create'} Chapter</Button>
          </div>
        </form>
      </Modal>
    )
  }

  if (loading) return <AppLayout><LoadingState message="Loading academic structure..." /></AppLayout>

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 fade-in">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Academic Structure</h1>
            <p className="text-slate-500 mt-1">Manage your complete learning hierarchy</p>
          </div>
          <Button icon={<Plus size={16} />} onClick={() => setCatModal({ open: true })}>
            Add Category
          </Button>
        </div>

        {categories.length === 0 ? (
          <EmptyState
            title="No Categories Yet"
            description="Create your first category to begin building your academic structure."
            icon={<FolderOpen size={48} />}
            action={{ label: '+ Create Category', onClick: () => setCatModal({ open: true }) }}
          />
        ) : (
          <div className="space-y-3">
            {categories.map(cat => (
              <Card key={cat.id} className="overflow-hidden">
                {/* Category header */}
                <div className="flex items-center gap-3 p-4 cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => toggle(cat.id)}>
                  <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FolderOpen size={16} className="text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-900">{cat.name}</span>
                      {statusBadge(cat.status)}
                    </div>
                    {cat.description && <p className="text-xs text-slate-500 mt-0.5 truncate">{cat.description}</p>}
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={e => { e.stopPropagation(); setCatModal({ open: true, editing: cat }) }}
                      title="Edit Category"
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={e => { e.stopPropagation(); setClassModal({ open: true, categoryId: cat.id }) }}
                      title="Add Class to this Category"
                      className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition"
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        setDeleteConfirm({
                          open: true,
                          type: 'category',
                          id: cat.id,
                          title: cat.name,
                        })
                      }}
                      title="Delete Category"
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 size={14} />
                    </button>
                    {expanded[cat.id] ? <ChevronDown size={16} className="text-slate-400" /> : <ChevronRight size={16} className="text-slate-400" />}
                  </div>
                </div>

                {/* Classes */}
                {expanded[cat.id] && (
                  <div className="border-t border-slate-100">
                    {classes.filter(c => c.category_id === cat.id).map(cls => (
                      <div key={cls.id}>
                        <div className="flex items-center gap-3 pl-10 pr-4 py-3 cursor-pointer hover:bg-slate-50/80 transition-colors" onClick={() => toggle(cls.id)}>
                          <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Layers size={13} className="text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-slate-800">{cls.name}</span>
                              {cls.code && <span className="text-xs text-slate-400">({cls.code})</span>}
                              {statusBadge(cls.status)}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={e => { e.stopPropagation(); setClassModal({ open: true, categoryId: cat.id, editing: cls }) }}
                              title="Edit Class"
                              className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition"
                            >
                              <Edit size={13} />
                            </button>
                            <button
                              onClick={e => { e.stopPropagation(); setSubModal({ open: true, classId: cls.id }) }}
                              title="Add Subject to this Class"
                              className="p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded transition"
                            >
                              <Plus size={13} />
                            </button>
                            <button
                              onClick={e => {
                                e.stopPropagation()
                                setDeleteConfirm({
                                  open: true,
                                  type: 'class',
                                  id: cls.id,
                                  title: cls.name,
                                  subtitle: cls.code ? `Class Code: ${cls.code}` : undefined,
                                })
                              }}
                              title="Delete Class"
                              className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                            >
                              <Trash2 size={13} />
                            </button>
                            {expanded[cls.id] ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />}
                          </div>
                        </div>

                        {/* Subjects */}
                        {expanded[cls.id] && (
                          <div>
                            {subjects.filter(s => s.class_id === cls.id).map(sub => (
                              <div key={sub.id}>
                                <div className="flex items-center gap-3 pl-20 pr-4 py-2.5 cursor-pointer hover:bg-slate-50/60 transition-colors" onClick={() => toggle(sub.id)}>
                                  <div className="w-6 h-6 bg-green-50 rounded-md flex items-center justify-center flex-shrink-0">
                                    <BookOpen size={12} className="text-green-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm text-slate-700">{sub.name}</span>
                                      {sub.code && <span className="text-xs text-slate-400">({sub.code})</span>}
                                      {statusBadge(sub.status)}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <button
                                      onClick={e => { e.stopPropagation(); setSubModal({ open: true, classId: cls.id, editing: sub }) }}
                                      title="Edit Subject"
                                      className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition"
                                    >
                                      <Edit size={12} />
                                    </button>
                                    <button
                                      onClick={e => { e.stopPropagation(); setChapModal({ open: true, subjectId: sub.id }) }}
                                      title="Add Chapter to this Subject"
                                      className="p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded transition"
                                    >
                                      <Plus size={12} />
                                    </button>
                                    <button
                                      onClick={e => {
                                        e.stopPropagation()
                                        setDeleteConfirm({
                                          open: true,
                                          type: 'subject',
                                          id: sub.id,
                                          title: sub.name,
                                          subtitle: sub.code ? `Subject Code: ${sub.code}` : undefined,
                                        })
                                      }}
                                      title="Delete Subject"
                                      className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                    {expanded[sub.id] ? <ChevronDown size={13} className="text-slate-400" /> : <ChevronRight size={13} className="text-slate-400" />}
                                  </div>
                                </div>

                                {/* Chapters */}
                                {expanded[sub.id] && (
                                  <div className="bg-slate-50/50">
                                    {chapters.filter(ch => ch.subject_id === sub.id).map(chap => (
                                      <div key={chap.id} className="flex items-center gap-3 pl-28 pr-4 py-2.5 border-t border-slate-100/80 hover:bg-white transition-colors">
                                        <div className="w-5 h-5 bg-amber-50 rounded flex items-center justify-center flex-shrink-0">
                                          <FileText size={11} className="text-amber-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-2">
                                            {chap.chapter_number && <span className="text-xs text-slate-400 font-mono">Ch.{chap.chapter_number}</span>}
                                            <span className="text-sm text-slate-700">{chap.title}</span>
                                            {statusBadge(chap.status)}
                                          </div>
                                          {chap.estimated_duration && <span className="text-xs text-slate-400">{chap.estimated_duration} min</span>}
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <button
                                            onClick={() => setChapModal({ open: true, subjectId: sub.id, editing: chap })}
                                            title="Edit Chapter"
                                            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition"
                                          >
                                            <Edit size={12} />
                                          </button>
                                          <Link to={`/admin/chapters/${chap.id}/content`} title="Manage Chapter Content">
                                            <button className="p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded transition">
                                              <FileText size={12} />
                                            </button>
                                          </Link>
                                          <button
                                            onClick={e => {
                                              e.stopPropagation()
                                              setDeleteConfirm({
                                                open: true,
                                                type: 'chapter',
                                                id: chap.id,
                                                title: chap.title,
                                                subtitle: chap.chapter_number ? `Chapter ${chap.chapter_number}` : undefined,
                                              })
                                            }}
                                            title="Delete Chapter"
                                            className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                                          >
                                            <Trash2 size={12} />
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                    {chapters.filter(ch => ch.subject_id === sub.id).length === 0 && (
                                      <div className="pl-28 pr-4 py-3 text-xs text-slate-400 italic border-t border-slate-100">
                                        No chapters yet —{' '}
                                        <button onClick={() => setChapModal({ open: true, subjectId: sub.id })} className="text-blue-500 hover:underline">Add one</button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                            {subjects.filter(s => s.class_id === cls.id).length === 0 && (
                              <div className="pl-20 pr-4 py-3 text-xs text-slate-400 italic border-t border-slate-100">
                                No subjects yet —{' '}
                                <button onClick={() => setSubModal({ open: true, classId: cls.id })} className="text-blue-500 hover:underline">Add one</button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                    {classes.filter(c => c.category_id === cat.id).length === 0 && (
                      <div className="pl-10 pr-4 py-3 text-xs text-slate-400 italic border-t border-slate-100">
                        No classes yet —{' '}
                        <button onClick={() => setClassModal({ open: true, categoryId: cat.id })} className="text-blue-500 hover:underline">Add one</button>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      <CategoryModal />
      <ClassModal />
      <SubjectModal />
      <ChapterModal />

      {/* Delete Confirmation Modal */}
      {deleteConfirm.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => !deleting && setDeleteConfirm({ open: false, type: 'class', id: '', title: '' })}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Delete {deleteConfirm.type.charAt(0).toUpperCase() + deleteConfirm.type.slice(1)}?
                </h3>
                <p className="text-xs text-slate-500">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-red-50/70 border border-red-200 rounded-xl mb-5">
              <p className="text-sm font-semibold text-red-900">
                "{deleteConfirm.title}"
              </p>
              {deleteConfirm.subtitle && (
                <p className="text-xs text-red-700 mt-1 font-mono">
                  {deleteConfirm.subtitle}
                </p>
              )}
              <p className="text-xs text-red-600/90 mt-2 font-medium leading-relaxed">
                {deleteConfirm.type === 'category' && 'All classes, subjects, chapters, and lessons under this category will be permanently removed from the database.'}
                {deleteConfirm.type === 'class' && 'All subjects, chapters, lessons, and student enrollments for this class will be permanently removed from the database.'}
                {deleteConfirm.type === 'subject' && 'All chapters, lessons, quizzes, and learning materials under this subject will be permanently removed from the database.'}
                {deleteConfirm.type === 'chapter' && 'All sections, lessons, videos, workbooks, and quizzes in this chapter will be permanently removed from the database.'}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <Button
                variant="outline"
                onClick={() => setDeleteConfirm({ open: false, type: 'class', id: '', title: '' })}
                disabled={deleting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                loading={deleting}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold shadow-sm flex items-center gap-1.5"
              >
                <Trash2 size={15} />
                Delete Permanently
              </Button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}

