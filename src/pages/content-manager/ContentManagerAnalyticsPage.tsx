import { AppLayout } from '../../components/layout/AppLayout'
import { Card, StatCard } from '../../components/ui'
import { BarChart3, BookOpen, FileText, TrendingUp } from 'lucide-react'

export default function ContentManagerAnalyticsPage() {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-6 fade-in">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Content Analytics</h1>
          <p className="text-slate-500 mt-1">Insights into your academic content</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard label="My Chapters" value="—" icon={<BookOpen size={20} />} color="blue" />
          <StatCard label="My Content Items" value="—" icon={<FileText size={20} />} color="purple" />
          <StatCard label="Published Content" value="—" icon={<TrendingUp size={20} />} color="green" />
        </div>
        <Card className="p-6 text-center">
          <BarChart3 size={48} className="text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">Detailed analytics coming soon. Create content to see metrics.</p>
        </Card>
      </div>
    </AppLayout>
  )
}
