import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { AppLayout } from '../../components/layout/AppLayout'
import { Card, Button, Input, Textarea, Badge } from '../../components/ui'
import { Building2, Globe, Shield, UserPlus, Users, Mail, Phone } from 'lucide-react'
import { userService } from '../../services/analyticsService'
import { supabase } from '../../lib/supabase'
import toast from 'react-hot-toast'

export default function AdminSettingsPage() {
  const { user } = useAuth()
  const userRole = (user?.role || '') as string
  const isContentManager = userRole === 'academic_content_manager' || userRole === 'content_manager'

  const [contentManagers, setContentManagers] = useState<any[]>([])
  const [loadingManagers, setLoadingManagers] = useState(true)
  const [managerModalOpen, setManagerModalOpen] = useState(false)
  const [creating, setCreating] = useState(false)
  const [managerData, setManagerData] = useState({
    full_name: '',
    email: '',
    phone: '',
    temporary_password: ''
  })

  const orgId = user?.organization_id || ''

  const loadManagers = async () => {
    if (!orgId) return
    setLoadingManagers(true)
    try {
      const users = await userService.getAll(orgId)
      const managers = users.filter((u: any) =>
        u.user_roles?.some((r: any) => r.role?.name === 'academic_content_manager')
      )
      setContentManagers(managers)
    } catch {
      // ignore
    } finally {
      setLoadingManagers(false)
    }
  }

  useEffect(() => {
    if (user?.role === 'admin') {
      loadManagers()
    }
  }, [user?.role, orgId])

  // Strict route protection: Only admins can view this page
  if (user && userRole !== 'admin') {
    return <Navigate to={isContentManager ? '/content-manager' : '/student'} replace />
  }

  const handleCreateManager = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!managerData.email || !managerData.full_name) {
      toast.error('Full Name and Email are required')
      return
    }

    setCreating(true)
    try {
      const { data, error } = await supabase.rpc('admin_create_content_manager', {
        p_email: managerData.email,
        p_password: managerData.temporary_password || 'ManagerPass@123',
        p_full_name: managerData.full_name,
        p_phone: managerData.phone || null,
        p_organization_id: orgId
      })

      if (error || (data && data.success === false)) {
        throw new Error(error?.message || data?.error || 'Failed to create Content Manager')
      }

      if (data?.user_id) {
        const { data: unwantedRoles } = await supabase.from('roles').select('id').in('name', ['admin', 'student'])
        if (unwantedRoles && unwantedRoles.length > 0) {
          const roleIds = unwantedRoles.map(r => r.id)
          await supabase.from('user_roles').delete().eq('user_id', data.user_id).in('role_id', roleIds)
        }
      }

      toast.success('Content Manager account created successfully!')
      setManagerModalOpen(false)
      setManagerData({ full_name: '', email: '', phone: '', temporary_password: '' })
      await loadManagers()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Creation failed')
    } finally {
      setCreating(false)
    }
  }

  const isAdmin = user?.role === 'admin'

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-4xl fade-in space-y-6">
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-slate-900">Admin Settings</h1>
          <p className="text-slate-500 mt-1">
            Manage organization details, security policies, and Academic Content Managers.
          </p>
        </div>

        {/* Academic Content Managers Section - Admin Only */}
        {isAdmin && (
          <Card className="p-6 border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-700">
                  <Users size={20} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Academic Content Managers</h2>
                  <p className="text-xs text-slate-500">
                    Content Managers can edit courses, chapters, curriculum text, and upload assets without accessing sensitive settings.
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setManagerModalOpen(true)}
                className="flex items-center gap-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
              >
                <UserPlus size={15} />
                Add Content Manager
              </Button>
            </div>

            {/* List of Content Managers */}
            <div className="mt-4">
              {loadingManagers ? (
                <p className="text-xs text-slate-400 py-4 text-center">Loading managers...</p>
              ) : contentManagers.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {contentManagers.map((m: any) => (
                    <div key={m.id} className="py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                          {m.full_name?.charAt(0)?.toUpperCase() || 'M'}
                        </div>
                        <div>
                          <span className="font-semibold text-sm text-slate-900 block">{m.full_name}</span>
                          <span className="text-xs text-slate-500 flex items-center gap-2">
                            <span className="flex items-center gap-1"><Mail size={12} /> {m.email}</span>
                            {m.phone && <span className="flex items-center gap-1"><Phone size={12} /> {m.phone}</span>}
                          </span>
                        </div>
                      </div>
                      <Badge variant="success">Content Manager</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <Users size={32} className="text-slate-300 mx-auto mb-2" />
                  <p className="text-xs text-slate-500">No Content Managers created yet.</p>
                  <p className="text-xs text-slate-400 mt-0.5">Click "Add Content Manager" above to create one securely.</p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Organization Information */}
        <Card className="p-6 border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
              <Building2 size={18} />
            </div>
            <h2 className="text-base font-semibold text-slate-900">Organization Information</h2>
          </div>
          <div className="space-y-4">
            <Input label="Organization Name" defaultValue="Nanjil Academy" disabled />
            <Input label="Domain Slug" defaultValue="nanjil-academy" disabled />
            <Textarea label="Description" defaultValue="A premier learning institution offering comprehensive AI curriculum." rows={2} disabled />
          </div>
        </Card>

        {/* Security & Access Controls */}
        <Card className="p-6 border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
              <Shield size={18} />
            </div>
            <h2 className="text-base font-semibold text-slate-900">Security & Access Controls</h2>
          </div>
          <div className="space-y-3 text-sm">
            {[
              { label: 'Role-Based Access Control (Admin vs Content Manager vs Student)', status: 'Active', ok: true },
              { label: 'Forced Student Password Reset on First Login', status: 'Enforced', ok: true },
              { label: 'Row Level Security (RLS) & Multi-tenant Isolation', status: 'Enabled', ok: true },
              { label: 'Secure PostgreSQL Authentication Function Handlers', status: 'Configured', ok: true },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <span className="text-slate-600 text-xs font-medium">{item.label}</span>
                <span className={`text-xs font-bold ${item.ok ? 'text-green-600' : 'text-red-500'}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Account Info */}
        <Card className="p-6 border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
              <Globe size={18} />
            </div>
            <h2 className="text-base font-semibold text-slate-900">
              Current Administrator Session
            </h2>
          </div>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex items-center justify-between">
              <span>Admin Name:</span>
              <strong>{user?.profile?.full_name}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Email Address:</span>
              <strong>{user?.email}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Role:</span>
              <Badge variant="info">
                Administrator
              </Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Create Content Manager Modal - Admin Only */}
      {isAdmin && managerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => !creating && setManagerModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md fade-in">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Add Academic Content Manager</h3>
            <p className="text-xs text-slate-500 mb-4">
              Content Managers can create and update lessons, worksheets, activities, quizzes, and upload images.
            </p>
            <form onSubmit={handleCreateManager} className="space-y-3.5">
              <Input
                label="Full Name *"
                placeholder="Manager's Full Name"
                value={managerData.full_name}
                onChange={e => setManagerData({ ...managerData, full_name: e.target.value })}
                required
              />
              <Input
                label="Email Address *"
                type="email"
                placeholder="manager@nanjil.edu"
                value={managerData.email}
                onChange={e => setManagerData({ ...managerData, email: e.target.value })}
                required
              />
              <Input
                label="Phone Number (optional)"
                placeholder="+91..."
                value={managerData.phone}
                onChange={e => setManagerData({ ...managerData, phone: e.target.value })}
              />
              <Input
                label="Initial Password"
                type="text"
                placeholder="Default: ManagerPass@123"
                value={managerData.temporary_password}
                onChange={e => setManagerData({ ...managerData, temporary_password: e.target.value })}
              />
              <div className="flex gap-2.5 justify-end pt-3">
                <Button variant="outline" type="button" onClick={() => setManagerModalOpen(false)} disabled={creating}>
                  Cancel
                </Button>
                <Button type="submit" loading={creating} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
                  Create Content Manager
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
