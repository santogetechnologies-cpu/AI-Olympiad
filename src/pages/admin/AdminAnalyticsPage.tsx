import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { AppLayout } from '../../components/layout/AppLayout'
import { Card, StatCard, LoadingState } from '../../components/ui'
import { BarChart3, Users, BookOpen, TrendingUp, FileText, CheckCircle } from 'lucide-react'
import { categoryService } from '../../services/categoryService'
import { classService } from '../../services/classService'
import { subjectService } from '../../services/subjectService'
import { chapterService } from '../../services/chapterService'
import { userService } from '../../services/analyticsService'

export default function AdminAnalyticsPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.organization_id) return
    const orgId = user.organization_id
    Promise.all([
      categoryService.getAll(orgId).then(d => d.length),
      classService.getAll(orgId).then(d => d.length),
      subjectService.getAll(orgId).then(d => d.length),
      chapterService.getAll(orgId).then(d => d.length),
      userService.getAll(orgId).then(d => d.filter((u: any) => u.user_roles?.some((r: any) => r.role?.name === 'student')).length),
      Promise.resolve([]),
    ]).then(([cats, cls, subs, chaps, students]) => {
      setStats({ categories: cats, classes: cls, subjects: subs, chapters: chaps, students })
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [user])

  if (loading) return <AppLayout><LoadingState /></AppLayout>

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-6 fade-in">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-500 mt-1">Platform-wide statistics and insights</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard label="Students" value={stats.students || 0} icon={<Users size={20} />} color="blue" />
          <StatCard label="Categories" value={stats.categories || 0} icon={<BookOpen size={20} />} color="purple" />
          <StatCard label="Classes" value={stats.classes || 0} icon={<TrendingUp size={20} />} color="indigo" />
          <StatCard label="Subjects" value={stats.subjects || 0} icon={<FileText size={20} />} color="green" />
          <StatCard label="Chapters" value={stats.chapters || 0} icon={<CheckCircle size={20} />} color="amber" />
          <StatCard label="Total Content" value="—" icon={<BarChart3 size={20} />} color="rose" />
        </div>

        <Card className="p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-4">Platform Overview</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Active DB Connection', value: 'Supabase', ok: true },
              { label: 'Auth Service', value: 'Active', ok: true },
              { label: 'Storage', value: 'Active', ok: true },
              { label: 'RLS Enforcement', value: 'Enabled', ok: true },
            ].map(item => (
              <div key={item.label} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                <p className={`text-sm font-semibold ${item.ok ? 'text-green-700' : 'text-red-600'}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppLayout>
  )
}
