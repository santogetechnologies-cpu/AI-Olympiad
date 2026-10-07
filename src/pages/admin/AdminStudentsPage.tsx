import { useEffect, useState, useRef } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { AppLayout } from '../../components/layout/AppLayout'
import { Card, LoadingState, Badge, Button, Input, Select } from '../../components/ui'
import {
  Users, UserPlus, Search, Download, Upload, FileText,
  CheckCircle2, AlertCircle, Lock, GraduationCap, X, Sparkles,
  Trash2, UserX
} from 'lucide-react'
import { userService } from '../../services/analyticsService'
import { enrollmentService } from '../../services/progressService'
import { classService } from '../../services/classService'
import { subjectService } from '../../services/subjectService'
import { supabase } from '../../lib/supabase'
import { curriculumCatalogService } from '../../services/curriculumCatalogService'
import type { Class, Subject } from '../../types'
import toast from 'react-hot-toast'

interface CSVStudentRow {
  full_name: string
  email: string
  phone: string
  student_id_number: string
  class_name: string
  class_id?: string
  temporary_password: string
  status?: 'pending' | 'success' | 'error'
  error_message?: string
}

export default function AdminStudentsPage() {
  const { user } = useAuth()
  const [students, setStudents] = useState<any[]>([])
  const [classes, setClasses] = useState<Class[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  
  // Modals
  const [studentDetailsModal, setStudentDetailsModal] = useState<{ open: boolean; student: any | null }>({ open: false, student: null })
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<{ open: boolean; student: any | null }>({ open: false, student: null })
  const [deletingStudent, setDeletingStudent] = useState(false)
  const [bulkModalOpen, setBulkModalOpen] = useState(false)
  const [singleModalOpen, setSingleModalOpen] = useState(false)
  
  // Enrollment state
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [enrolling, setEnrolling] = useState(false)

  // Single creation state
  const [singleData, setSingleData] = useState({
    full_name: '',
    email: '',
    phone: '',
    student_id_number: '',
    temporary_password: '',
    class_id: ''
  })
  const [creatingSingle, setCreatingSingle] = useState(false)

  // CSV Bulk Upload state
  const [csvRows, setCsvRows] = useState<CSVStudentRow[]>([])
  const [bulkSelectedClass, setBulkSelectedClass] = useState('')
  const [importing, setImporting] = useState(false)
  const [importProgress, setImportProgress] = useState({ current: 0, total: 0, successes: 0, failures: 0 })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const orgId = user!.organization_id

  const load = async () => {
    setLoading(true)
    try {
      const [users, cls, subs, enrsRes] = await Promise.all([
        userService.getAll(orgId),
        classService.getAll(orgId),
        subjectService.getAll(orgId),
        supabase
          .from('enrollments')
          .select('student_id, class_id, status, enrolled_at, class:classes(id, name, code)')
          .eq('organization_id', orgId)
          .eq('status', 'active')
          .order('enrolled_at', { ascending: false })
      ])

      // Merge curriculum catalog classes if not already present
      const allLevelsData = curriculumCatalogService.getAllLevelsData()
      const existingClassNames = new Set(cls.map(c => c.name.toLowerCase().replace(/[\s-_]/g, '')))
      const mergedClasses: Class[] = [...cls]

      allLevelsData.forEach(lvl => {
        const cleanName = lvl.name.toLowerCase().replace(/[\s-_]/g, '')
        if (!existingClassNames.has(cleanName)) {
          mergedClasses.push({
            id: `cat-cls-${lvl.gradeKey}`,
            organization_id: orgId,
            category_id: `cat-${lvl.gradeKey}`,
            name: lvl.name,
            code: lvl.code,
            status: 'published',
            display_order: mergedClasses.length + 1,
            created_by: 'system',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          existingClassNames.add(cleanName)
        }
      })

      const enrollmentMap = new Map<string, any>()
      if (enrsRes.data) {
        enrsRes.data.forEach((enr: any) => {
          if (enr.student_id && !enrollmentMap.has(enr.student_id)) {
            let clsObj = enr.class
            if (!clsObj && enr.class_id) {
              clsObj = mergedClasses.find(c => c.id === enr.class_id || c.name.toLowerCase().includes(enr.class_id.toLowerCase()))
            }
            if (clsObj) {
              enrollmentMap.set(enr.student_id, clsObj)
            }
          }
        })
      }

      const studentUsers = users
        .filter((u: any) => u.user_roles?.some((r: any) => r.role?.name === 'student'))
        .map((u: any) => {
          let enrolled = enrollmentMap.get(u.id) || null
          try {
            const stored = localStorage.getItem(`nanjil_enrollment_${u.id}`)
            if (stored) {
              const parsed = JSON.parse(stored)
              const rec = Array.isArray(parsed) ? parsed[0] : parsed
              if (rec?.class) {
                enrolled = rec.class
              }
            }
            if (!enrolled) {
              const storedClasses = localStorage.getItem(`enrolled_classes_${u.id}`)
              if (storedClasses) {
                const parsed = JSON.parse(storedClasses)
                const latestKey = Array.isArray(parsed) ? parsed[parsed.length - 1] : parsed
                if (latestKey) {
                  const found = mergedClasses.find(c => c.id.includes(latestKey) || c.name.toLowerCase().includes(latestKey.toLowerCase()))
                  if (found) enrolled = found
                }
              }
            }
          } catch {}
          return {
            ...u,
            enrolled_class: enrolled
          }
        })

      setStudents(studentUsers)
      setClasses(mergedClasses)
      setSubjects(subs)
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  // Sample CSV generator & downloader
  const downloadSampleCSV = () => {
    const classExamples = classes.slice(0, 3).map(c => c.name).join(', ') || 'CLASS 3, CLASS 4, CLASS 5'
    const c1 = classes[0]?.name || 'CLASS 3'
    const c2 = classes[1]?.name || 'CLASS 4'
    const c3 = classes[2]?.name || 'CLASS 5'
    const headers = 'full_name,email,phone,student_id_number,class_name,temporary_password\n'
    const sampleRows = [
      `Aarav Sharma,aarav.sharma@example.com,9876543210,STD-2026-001,${c1},TempPass@123`,
      `Diya Patel,diya.patel@example.com,9876543211,STD-2026-002,${c2},TempPass@123`,
      `Rohan Kumar,rohan.kumar@example.com,9876543212,STD-2026-003,${c3},TempPass@123`,
      `Ananya Reddy,ananya.reddy@example.com,9876543213,STD-2026-004,${c1},TempPass@123`
    ].join('\n')

    const blob = new Blob([headers + sampleRows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'sample_students_import_template.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('Sample CSV downloaded! Available classes include: ' + classExamples)
  }

  // Parse CSV File
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result as string
      if (!text) return

      const lines = text.split(/\r\n|\n/).filter(line => line.trim() !== '')
      if (lines.length < 2) {
        toast.error('CSV file must have a header row and at least one student row.')
        return
      }

      const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/"/g, ''))
      const rows: CSVStudentRow[] = []

      for (let i = 1; i < lines.length; i++) {
        // Simple CSV splitter handling quoted values
        const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''))
        if (values.length >= 2) {
          const row: any = {}
          headers.forEach((header, index) => {
            row[header] = values[index] || ''
          })

          const rawClassName = row.class_name || row.class || row.standard || row.grade || ''
          let matchedClass = classes.find(c => 
            (rawClassName && (
              c.name.toLowerCase() === rawClassName.toLowerCase() ||
              (c.code && c.code.toLowerCase() === rawClassName.toLowerCase())
            ))
          )

          // Fallback to bulkSelectedClass if not matched from CSV
          if (!matchedClass && bulkSelectedClass) {
            matchedClass = classes.find(c => c.id === bulkSelectedClass)
          }

          rows.push({
            full_name: row.full_name || row.name || '',
            email: row.email || '',
            phone: row.phone || row.mobile || '',
            student_id_number: row.student_id_number || row.student_id || row.roll_no || '',
            class_name: matchedClass?.name || rawClassName || '',
            class_id: matchedClass?.id || '',
            temporary_password: row.temporary_password || row.password || 'TempPass@123',
            status: 'pending'
          })
        }
      }

      setCsvRows(rows)
      toast.success(`Loaded ${rows.length} students from CSV. Ready for import.`)
    }
    reader.readAsText(file)
  }

  // Handle setting default class in CSV import
  const handleDefaultClassChange = (classId: string) => {
    setBulkSelectedClass(classId)
    const targetClass = classes.find(c => c.id === classId)
    if (targetClass) {
      setCsvRows(prev => prev.map(row => {
        if (!row.class_id) {
          return { ...row, class_id: targetClass.id, class_name: targetClass.name }
        }
        return row
      }))
    }
  }

  // Apply default class to all rows in CSV import
  const applyClassToAllRows = () => {
    const targetClass = classes.find(c => c.id === bulkSelectedClass)
    if (!targetClass) {
      toast.error('Please select a class from the dropdown first')
      return
    }
    setCsvRows(prev => prev.map(row => ({
      ...row,
      class_id: targetClass.id,
      class_name: targetClass.name
    })))
    toast.success(`Assigned all students to ${targetClass.name}`)
  }

  // Update class for individual row in preview
  const handleRowClassChange = (index: number, classId: string) => {
    const targetClass = classes.find(c => c.id === classId)
    setCsvRows(prev => {
      const next = [...prev]
      next[index] = {
        ...next[index],
        class_id: classId,
        class_name: targetClass?.name || ''
      }
      return next
    })
  }

  // Execute Bulk Import
  const handleBulkImport = async () => {
    if (csvRows.length === 0) return
    setImporting(true)
    setImportProgress({ current: 0, total: csvRows.length, successes: 0, failures: 0 })

    const updatedRows = [...csvRows]
    let successCount = 0
    let failureCount = 0

    for (let i = 0; i < updatedRows.length; i++) {
      const student = updatedRows[i]
      
      // Determine class ID
      let matchedClassId: string | null = student.class_id || null
      if (!matchedClassId && student.class_name) {
        const found = classes.find(c => 
          c.name.toLowerCase() === student.class_name.toLowerCase() ||
          (c.code && c.code.toLowerCase() === student.class_name.toLowerCase())
        )
        if (found) matchedClassId = found.id
      }
      if (!matchedClassId && bulkSelectedClass) {
        matchedClassId = bulkSelectedClass
      }

      try {
        const { data, error } = await supabase.rpc('admin_bulk_create_student', {
          p_email: student.email,
          p_password: student.temporary_password || 'TempPass@123',
          p_full_name: student.full_name,
          p_phone: student.phone || null,
          p_student_id_number: student.student_id_number || null,
          p_class_id: matchedClassId,
          p_organization_id: orgId
        })

        if (error || (data && data.success === false)) {
          throw new Error(error?.message || data?.error || 'Creation failed')
        }

        // Also ensure active enrollment is recorded/updated
        const studentUserId = data?.user_id
        if (matchedClassId && studentUserId) {
          await enrollmentService.assignStudentClass({
            studentId: studentUserId,
            organizationId: orgId,
            classId: matchedClassId,
          })
        }

        if (studentUserId) {
          const { data: unwantedRoles } = await supabase.from('roles').select('id').in('name', ['admin', 'academic_content_manager'])
          if (unwantedRoles && unwantedRoles.length > 0) {
            const roleIds = unwantedRoles.map(r => r.id)
            await supabase.from('user_roles').delete().eq('user_id', studentUserId).in('role_id', roleIds)
          }
        }

        updatedRows[i].status = 'success'
        successCount++
      } catch (err: any) {
        updatedRows[i].status = 'error'
        updatedRows[i].error_message = err.message || 'Error creating account'
        failureCount++
      }

      setImportProgress({
        current: i + 1,
        total: updatedRows.length,
        successes: successCount,
        failures: failureCount
      })
      setCsvRows([...updatedRows])
    }

    setImporting(false)
    if (successCount > 0) {
      toast.success(`Successfully imported and enrolled ${successCount} students!`)
      await load()
    }
    if (failureCount > 0) {
      toast.error(`${failureCount} students could not be imported. Check the error list.`)
    }
  }

  // Handle single student creation
  const handleCreateSingle = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!singleData.email || !singleData.full_name) {
      toast.error('Name and Email are required')
      return
    }

    setCreatingSingle(true)
    try {
      const { data, error } = await supabase.rpc('admin_bulk_create_student', {
        p_email: singleData.email,
        p_password: singleData.temporary_password || 'TempPass@123',
        p_full_name: singleData.full_name,
        p_phone: singleData.phone || null,
        p_student_id_number: singleData.student_id_number || null,
        p_class_id: singleData.class_id || null,
        p_organization_id: orgId
      })

      if (error || (data && data.success === false)) {
        throw new Error(error?.message || data?.error || 'Failed to create student')
      }

      if (singleData.class_id && data?.user_id) {
        await enrollmentService.assignStudentClass({
          studentId: data.user_id,
          organizationId: orgId,
          classId: singleData.class_id,
        })
      }

      if (data?.user_id) {
        // Remove any stray admin or content manager roles assigned by default triggers
        const { data: unwantedRoles } = await supabase.from('roles').select('id').in('name', ['admin', 'academic_content_manager'])
        if (unwantedRoles && unwantedRoles.length > 0) {
          const roleIds = unwantedRoles.map(r => r.id)
          await supabase.from('user_roles').delete().eq('user_id', data.user_id).in('role_id', roleIds)
        }
      }

      toast.success('Student account created and activated!')
      setSingleModalOpen(false)
      setSingleData({ full_name: '', email: '', phone: '', student_id_number: '', temporary_password: '', class_id: '' })
      await load()
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Creation failed')
    } finally {
      setCreatingSingle(false)
    }
  }

  const handleSaveStudentClass = async () => {
    if (!studentDetailsModal.student || !selectedClass) {
      toast.error('Please select a class')
      return
    }
    setEnrolling(true)
    try {
      const assigned = await enrollmentService.assignStudentClass({
        studentId: studentDetailsModal.student.id,
        organizationId: orgId,
        classId: selectedClass,
        subjectId: selectedSubject || undefined,
      })

      toast.success(`Active class changed to ${assigned.class?.name || 'selected class'}!`)
      setStudentDetailsModal({ open: false, student: null })
      await load()
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Failed to update student class')
    } finally {
      setEnrolling(false)
    }
  }

  const handleDeleteStudent = async () => {
    if (!deleteConfirmModal.student) return
    if (user?.role !== 'admin') {
      toast.error('Unauthorized: Only Administrators can permanently remove students.')
      return
    }
    setDeletingStudent(true)
    try {
      const student = deleteConfirmModal.student
      await userService.deleteStudent(student.id, orgId, user?.role)
      toast.success(`Student "${student.full_name || student.email}" has been permanently removed.`)
      setStudents(prev => prev.filter(s => s.id !== student.id))
      setDeleteConfirmModal({ open: false, student: null })
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Failed to remove student account')
    } finally {
      setDeletingStudent(false)
    }
  }

  const filtered = students.filter(s =>
    !search ||
    s.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase()) ||
    s.student_id_number?.toLowerCase().includes(search.toLowerCase()) ||
    s.enrolled_class?.name?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <AppLayout><LoadingState message="Loading students..." /></AppLayout>

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 fade-in">
        {/* Header with Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Student Directory</h1>
            <p className="text-slate-500 mt-1">
              Manage enrollments, active accounts, and bulk CSV onboardings ({students.length} total students)
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              variant="outline"
              onClick={downloadSampleCSV}
              className="flex items-center gap-1.5 text-xs font-semibold"
            >
              <Download size={15} />
              Sample CSV
            </Button>
            <Button
              variant="secondary"
              onClick={() => { setCsvRows([]); setBulkSelectedClass(''); setBulkModalOpen(true) }}
              className="flex items-center gap-1.5 text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200"
            >
              <Upload size={15} />
              Bulk CSV Import
            </Button>
            <Button
              onClick={() => setSingleModalOpen(true)}
              className="flex items-center gap-1.5 text-xs font-semibold shadow-sm"
            >
              <UserPlus size={15} />
              Add Student
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-5 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, student ID, or class..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-3 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        {/* Students Table */}
        {filtered.length > 0 ? (
          <Card className="overflow-hidden shadow-sm border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide">Student</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide">Student ID</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide">Email & Phone</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide">Account Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide">Password State</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide">Class</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((s: any) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm shadow-sm">
                          {s.full_name?.charAt(0)?.toUpperCase() || 'S'}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900 block">{s.full_name || 'Unnamed Student'}</span>
                          <span className="text-xs text-slate-400">ID: {s.id.slice(0, 8)}...</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                        {s.student_id_number || 'N/A'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-slate-800 font-medium">{s.email}</div>
                      {s.phone && <div className="text-xs text-slate-500">{s.phone}</div>}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={s.status === 'active' ? 'success' : 'danger'}>
                        {s.status || 'active'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      {s.must_change_password ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          <Lock size={12} /> Temp Password
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle2 size={12} /> Password Set
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {s.enrolled_class ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs">
                          <GraduationCap size={13} className="text-indigo-600" />
                          {s.enrolled_class.name}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-slate-400 bg-slate-100 border border-slate-200">
                          Unassigned
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedClass(s.enrolled_class?.id || '')
                            setSelectedSubject('')
                            setStudentDetailsModal({ open: true, student: s })
                          }}
                          className="text-xs font-semibold hover:border-indigo-400 hover:text-indigo-600 flex items-center gap-1.5"
                        >
                          <GraduationCap size={13} className="text-indigo-600" />
                          <span>{s.enrolled_class ? 'Manage Class' : 'Assign Class'}</span>
                        </Button>

                        {user?.role === 'admin' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDeleteConfirmModal({ open: true, student: s })}
                            className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200 hover:border-rose-300 flex items-center gap-1.5 cursor-pointer"
                            title="Permanently remove student account"
                          >
                            <Trash2 size={13} />
                            <span>Remove</span>
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        ) : (
          <Card className="p-12 text-center border-slate-200">
            <Users size={48} className="text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 font-medium">{search ? 'No students match your search' : 'No students registered yet'}</p>
            <p className="text-xs text-slate-400 mt-1">Use Bulk CSV Import or Add Student button above to onboard learners.</p>
          </Card>
        )}
      </div>

      {/* Bulk CSV Upload Modal */}
      {bulkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => !importing && setBulkModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-3xl max-h-[90vh] flex flex-col fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center">
                  <Upload size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Bulk Student Import (CSV)</h3>
                  <p className="text-xs text-slate-500">Upload CSV with student details, assign classes, and create activated accounts.</p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={downloadSampleCSV} className="flex items-center gap-1 text-xs">
                <Download size={14} /> Template
              </Button>
            </div>

            {/* Class Assignment Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <GraduationCap size={15} className="text-indigo-600" />
                  Default Class Assignment
                </label>
                <select
                  value={bulkSelectedClass}
                  onChange={(e) => handleDefaultClassChange(e.target.value)}
                  disabled={importing}
                  className="w-full h-9 px-3 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-800"
                >
                  <option value="">-- Choose Class (Fallback / Quick Assign) --</option>
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>{c.name} {c.code ? `(${c.code})` : ''}</option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  Assigns this class to imported students without a class in CSV.
                </p>
              </div>
              <div className="flex flex-col justify-end">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={applyClassToAllRows}
                  disabled={!bulkSelectedClass || csvRows.length === 0 || importing}
                  className="h-9 text-xs font-medium border-slate-300 hover:bg-indigo-50 text-indigo-700 hover:border-indigo-300"
                >
                  Apply Selected Class to All Loaded Rows
                </Button>
              </div>
            </div>

            {/* Upload Box */}
            <div className="mb-4">
              <input
                type="file"
                ref={fileInputRef}
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-indigo-400 bg-slate-50 hover:bg-indigo-50/30 rounded-xl p-5 text-center cursor-pointer transition"
              >
                <FileText size={28} className="text-slate-400 mx-auto mb-1.5" />
                <p className="text-sm font-semibold text-slate-700">Click to choose or drop your .CSV file here</p>
                <p className="text-xs text-slate-400 mt-0.5">Columns: full_name, email, phone, student_id_number, class_name, temporary_password</p>
              </div>
            </div>

            {/* Progress Bar if importing */}
            {importing && (
              <div className="mb-4 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                <div className="flex justify-between text-xs font-semibold text-indigo-900 mb-1.5">
                  <span>Importing: {importProgress.current} of {importProgress.total}</span>
                  <span>{Math.round((importProgress.current / importProgress.total) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-indigo-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 transition-all duration-300"
                    style={{ width: `${(importProgress.current / importProgress.total) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* CSV Preview Table */}
            {csvRows.length > 0 && (
              <div className="flex-1 overflow-y-auto border border-slate-200 rounded-xl max-h-64 mb-4">
                <table className="w-full text-xs">
                  <thead className="bg-slate-100 sticky top-0 border-b border-slate-200 font-semibold text-slate-700 z-10">
                    <tr>
                      <th className="p-2.5 text-left">#</th>
                      <th className="p-2.5 text-left">Student Name</th>
                      <th className="p-2.5 text-left">Email</th>
                      <th className="p-2.5 text-left">Student ID</th>
                      <th className="p-2.5 text-left min-w-[160px]">Class</th>
                      <th className="p-2.5 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {csvRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition">
                        <td className="p-2.5 text-slate-400 font-mono">{idx + 1}</td>
                        <td className="p-2.5 font-medium text-slate-800">{row.full_name}</td>
                        <td className="p-2.5 text-slate-600">{row.email}</td>
                        <td className="p-2.5 text-slate-600 font-mono">{row.student_id_number || '-'}</td>
                        <td className="p-2.5">
                          <select
                            value={row.class_id || ''}
                            onChange={(e) => handleRowClassChange(idx, e.target.value)}
                            disabled={importing}
                            className={`w-full py-1 px-2 text-xs font-semibold rounded-md border ${
                              row.class_id ? 'border-indigo-300 bg-indigo-50/60 text-indigo-900' : 'border-amber-300 bg-amber-50 text-amber-900'
                            } focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                          >
                            <option value="">-- Select Class --</option>
                            {classes.map(c => (
                              <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                          </select>
                        </td>
                        <td className="p-2.5">
                          {row.status === 'success' && (
                            <span className="text-emerald-600 font-bold flex items-center gap-1">
                              <CheckCircle2 size={13} /> Active & Enrolled
                            </span>
                          )}
                          {row.status === 'error' && (
                            <span className="text-red-600 font-bold flex items-center gap-1" title={row.error_message}>
                              <AlertCircle size={13} /> Failed
                            </span>
                          )}
                          {row.status === 'pending' && (
                            <span className="text-slate-400">Ready</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-xs text-slate-500 font-medium">
                {csvRows.length > 0 ? `${csvRows.length} rows loaded` : 'No file selected'}
              </span>
              <div className="flex gap-2.5">
                <Button variant="outline" onClick={() => setBulkModalOpen(false)} disabled={importing}>
                  Close
                </Button>
                <Button
                  onClick={handleBulkImport}
                  disabled={csvRows.length === 0 || importing}
                  loading={importing}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md font-semibold"
                >
                  <Upload size={15} />
                  Import & Activate All
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Single Add Student Modal */}
      {singleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => !creatingSingle && setSingleModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md fade-in">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Add Single Student</h3>
            <form onSubmit={handleCreateSingle} className="space-y-3.5">
              <Input
                label="Full Name *"
                placeholder="Student's full name"
                value={singleData.full_name}
                onChange={e => setSingleData({ ...singleData, full_name: e.target.value })}
                required
              />
              <Input
                label="Email Address *"
                type="email"
                placeholder="student@example.com"
                value={singleData.email}
                onChange={e => setSingleData({ ...singleData, email: e.target.value })}
                required
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Student ID / Roll No"
                  placeholder="STD-001"
                  value={singleData.student_id_number}
                  onChange={e => setSingleData({ ...singleData, student_id_number: e.target.value })}
                />
                <Input
                  label="Phone Number"
                  placeholder="+91..."
                  value={singleData.phone}
                  onChange={e => setSingleData({ ...singleData, phone: e.target.value })}
                />
              </div>
              <Select
                label="Assign Class"
                options={[{ value: '', label: 'Select class...' }, ...classes.map(c => ({ value: c.id, label: c.name }))]}
                value={singleData.class_id}
                onChange={e => setSingleData({ ...singleData, class_id: e.target.value })}
              />
              <Input
                label="Temporary Password"
                type="text"
                placeholder="Default: TempPass@123"
                value={singleData.temporary_password}
                onChange={e => setSingleData({ ...singleData, temporary_password: e.target.value })}
              />
              <p className="text-xs text-slate-500 italic">
                * Student will be forced to change this temporary password upon first login.
              </p>
              <div className="flex gap-2.5 justify-end pt-3">
                <Button variant="outline" type="button" onClick={() => setSingleModalOpen(false)} disabled={creatingSingle}>
                  Cancel
                </Button>
                <Button type="submit" loading={creatingSingle}>
                  Create & Activate Student
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Details & Class Assignment Modal */}
      {studentDetailsModal.open && studentDetailsModal.student && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => !enrolling && setStudentDetailsModal({ open: false, student: null })}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-7 w-full max-w-lg border border-slate-100 fade-in space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-500/20">
                  {studentDetailsModal.student.full_name?.charAt(0)?.toUpperCase() || 'S'}
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 leading-tight">
                    {studentDetailsModal.student.full_name || 'Student Details'}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                      ID: {studentDetailsModal.student.student_id_number || studentDetailsModal.student.id.slice(0, 8)}
                    </span>
                    <Badge variant={studentDetailsModal.student.status === 'active' ? 'success' : 'danger'}>
                      {studentDetailsModal.student.status || 'active'}
                    </Badge>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setStudentDetailsModal({ open: false, student: null })}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Student Info Quick Strip */}
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 text-xs">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Email Address</span>
                <span className="font-semibold text-slate-800 break-all">{studentDetailsModal.student.email}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Phone Number</span>
                <span className="font-semibold text-slate-800">{studentDetailsModal.student.phone || 'Not Provided'}</span>
              </div>
            </div>

            {/* Current Active Class Card */}
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                  <GraduationCap size={14} className="text-indigo-600" /> Current Active Academic Class
                </span>
                {studentDetailsModal.student.enrolled_class ? (
                  <span className="text-xs font-black text-indigo-900 bg-white px-2.5 py-0.5 rounded-full border border-indigo-200 shadow-2xs">
                    {studentDetailsModal.student.enrolled_class.name}
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-amber-700 bg-amber-100/60 px-2 py-0.5 rounded-full">
                    No Class Assigned
                  </span>
                )}
              </div>
              <p className="text-xs text-indigo-900/80 leading-relaxed">
                Assigning a new class immediately switches the student's dashboard, assigned curriculum chapters, lessons, and progress to the selected class everywhere.
              </p>
            </div>

            {/* Change Active Class Selection */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-500" />
                  Select New Active Class
                </label>
                <select
                  value={selectedClass}
                  onChange={e => setSelectedClass(e.target.value)}
                  className="w-full h-11 px-3.5 text-sm font-bold border-2 border-indigo-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 shadow-xs"
                >
                  <option value="">-- Choose Class (e.g. Class 3, Class 10) --</option>
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.code ? `(${c.code})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              {subjects.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Subject Curriculum (Optional)
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={e => setSelectedSubject(e.target.value)}
                    className="w-full h-10 px-3 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-medium"
                  >
                    <option value="">-- Auto-Assign Standard Curriculum --</option>
                    {subjects.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                type="button"
                onClick={() => setStudentDetailsModal({ open: false, student: null })}
                disabled={enrolling}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSaveStudentClass}
                loading={enrolling}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-600/20"
              >
                <GraduationCap size={16} />
                Save & Update Active Class
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Admin-Only Remove Student Confirmation Modal */}
      {deleteConfirmModal.open && deleteConfirmModal.student && user?.role === 'admin' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => !deletingStudent && setDeleteConfirmModal({ open: false, student: null })}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-7 w-full max-w-md flex flex-col space-y-4 animate-in fade-in zoom-in-95 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center shrink-0 border border-rose-200">
                <Trash2 size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Permanently Remove Student</h3>
                <p className="text-xs text-slate-500">Administrator Authorization Required</p>
              </div>
            </div>

            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-xs text-rose-950 space-y-2">
              <p className="font-bold text-rose-900 text-sm">
                Are you sure you want to permanently remove this student account?
              </p>
              <div className="bg-white/80 p-2.5 rounded-xl border border-rose-100 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Student Name:</span>
                  <strong className="text-slate-900">{deleteConfirmModal.student.full_name || 'Unnamed'}</strong>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Email:</span>
                  <span className="font-mono text-slate-700">{deleteConfirmModal.student.email}</span>
                </div>
                {deleteConfirmModal.student.student_id_number && (
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Student ID:</span>
                    <span className="font-mono text-slate-700">{deleteConfirmModal.student.student_id_number}</span>
                  </div>
                )}
                {deleteConfirmModal.student.enrolled_class && (
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Current Class:</span>
                    <span className="font-bold text-indigo-700">{deleteConfirmModal.student.enrolled_class.name}</span>
                  </div>
                )}
              </div>
              <ul className="list-disc list-inside text-[11px] text-rose-800 space-y-1 pt-1">
                <li>Account will be permanently closed and deleted.</li>
                <li>All active enrollments and learning progress will be removed.</li>
                <li>The student will no longer be able to log in to the portal.</li>
              </ul>
            </div>

            <div className="flex gap-2.5 justify-end pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                type="button"
                onClick={() => setDeleteConfirmModal({ open: false, student: null })}
                disabled={deletingStudent}
                className="text-xs font-semibold"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleDeleteStudent}
                loading={deletingStudent}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 border-0"
              >
                <Trash2 size={14} />
                Permanently Remove Student
              </Button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}

