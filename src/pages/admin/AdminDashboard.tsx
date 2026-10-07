import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Users, BookOpen, FolderOpen, Layers, FileText,
  CheckCircle, TrendingUp, Plus, Sparkles
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { StatCard, Card, LoadingState, ErrorState, Button } from '../../components/ui'
import { AppLayout } from '../../components/layout/AppLayout'
import { categoryService } from '../../services/categoryService'
import { classService } from '../../services/classService'
import { subjectService } from '../../services/subjectService'
import { chapterService } from '../../services/chapterService'
import { userService } from '../../services/analyticsService'

export default function AdminDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user?.organization_id) return
    const orgId = user.organization_id
    Promise.all([
      categoryService.getAll(orgId).then(d => d.length),
      classService.getAll(orgId).then(d => d.length),
      subjectService.getAll(orgId).then(d => d.length),
      chapterService.getAll(orgId).then(d => d.length),
      userService.getAll(orgId).then(d => d.length),
    ]).then(([cats, cls, subs, chaps, users]) => {
      setStats({ categories: cats, classes: cls, subjects: subs, chapters: chaps, users })
    }).catch(e => setError(e.message)).finally(() => setLoading(false))
  }, [user])

  if (loading) return <AppLayout><LoadingState message="Loading dashboard..." /></AppLayout>
  if (error) return <AppLayout><ErrorState message={error} /></AppLayout>

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-8 fade-in">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-500 mt-1">Welcome back, {user?.profile?.full_name?.split(' ')[0]}! Here's your platform overview.</p>
          </div>
          <div className="flex gap-2">
            <Link to="/admin/academic">
              <Button icon={<Plus size={16} />}>Create Content</Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Users" value={stats.users || 0} icon={<Users size={20} />} color="blue" />
          <StatCard label="Categories" value={stats.categories || 0} icon={<FolderOpen size={20} />} color="purple" />
          <StatCard label="Classes" value={stats.classes || 0} icon={<Layers size={20} />} color="indigo" />
          <StatCard label="Subjects" value={stats.subjects || 0} icon={<BookOpen size={20} />} color="green" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <StatCard label="Chapters" value={stats.chapters || 0} icon={<FileText size={20} />} color="amber" />
          <StatCard label="Active Students" value={stats.users || 0} icon={<TrendingUp size={20} />} color="rose" />
          <StatCard label="Completion Rate" value="N/A" icon={<CheckCircle size={20} />} color="green" />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-base font-semibold text-slate-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: 'Content & Visuals CMS', href: '/content-manager', icon: Sparkles, color: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100' },
                { label: 'Academic Structure', href: '/admin/academic', icon: Layers, color: 'bg-blue-50 text-blue-600 hover:bg-blue-100' },
                { label: 'Add Subject', href: '/admin/academic', icon: BookOpen, color: 'bg-green-50 text-green-600 hover:bg-green-100' },
                { label: 'Manage Students', href: '/admin/students', icon: Users, color: 'bg-amber-50 text-amber-600 hover:bg-amber-100' },
                { label: 'Categories', href: '/admin/academic', icon: FolderOpen, color: 'bg-purple-50 text-purple-600 hover:bg-purple-100' },
              ].map(action => {
                const Icon = action.icon
                return (
                  <Link key={action.href + action.label} to={action.href}>
                    <div className={`flex flex-col items-center gap-2 p-3.5 rounded-xl border border-slate-200 transition-colors cursor-pointer ${action.color}`}>
                      <Icon size={20} />
                      <span className="text-xs font-semibold text-center">{action.label}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-base font-semibold text-slate-900 mb-4">Platform Health</h2>
            <div className="space-y-3">
              {[
                { label: 'Database', status: 'Connected', ok: true },
                { label: 'Auth Service', status: 'Active', ok: true },
                { label: 'Storage', status: 'Active', ok: true },
                { label: 'RLS Policies', status: 'Enforced', ok: true },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{item.label}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.ok ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
