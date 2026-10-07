import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../contexts/AuthContext'
import { AppLayout } from '../../components/layout/AppLayout'
import { Card, Button, Input, Badge } from '../../components/ui'
import { Mail, Camera, Zap, Flame, Award, Sparkles, CheckCircle } from 'lucide-react'
import { userService } from '../../services/analyticsService'
import { storageService } from '../../services/storageService'
import { gamification, type StudentStats, BADGES } from '../../utils/gamification'
import toast from 'react-hot-toast'

export default function StudentProfilePage() {
  const { user, refreshUser } = useAuth()
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [stats, setStats] = useState<StudentStats>(() => gamification.getStats(user?.id))

  const { register, handleSubmit } = useForm({
    defaultValues: {
      full_name: user?.profile?.full_name || '',
      phone: user?.profile?.phone || '',
    }
  })

  useEffect(() => {
    if (user?.id) {
      gamification.syncWithDatabase(user.id, user.organization_id)
        .then(s => setStats(s))
        .catch(() => {})
    }

    const handleStatsUpdate = (e: any) => {
      const updated = e?.detail?.stats || (user?.id ? gamification.getStats(user.id) : null)
      if (updated) setStats(updated)
    }

    window.addEventListener('gamification_stats_updated', handleStatsUpdate)
    return () => {
      window.removeEventListener('gamification_stats_updated', handleStatsUpdate)
    }
  }, [user?.id, user?.organization_id])

  const onSubmit = async (data: any) => {
    if (!user) return
    setSaving(true)
    try {
      await userService.updateProfile(user.id, data)
      await refreshUser()
      toast.success('Profile updated!')
    } catch { 
      toast.error('Failed to update') 
    } finally { 
      setSaving(false) 
    }
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return
    setUploading(true)
    try {
      const url = await storageService.uploadAvatar(file, user.id)
      await userService.updateProfile(user.id, { avatar_url: url })
      await refreshUser()
      toast.success('Avatar updated!')
    } catch { 
      toast.error('Upload failed') 
    } finally { 
      setUploading(false) 
    }
  }

  return (
    <AppLayout>
      <div className="p-3.5 sm:p-6 lg:p-8 max-w-4xl space-y-5 sm:space-y-6 fade-in mx-auto">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">Student Profile & Academic Record</h1>
          <p className="text-slate-500 text-xs mt-0.5 sm:mt-1">Manage your personal credentials, view learning stats, and check Olympiad badges.</p>
        </div>

        {/* Gamification & Learning Achievements Ribbon */}
        <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-950 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white shadow-xl border border-blue-800/40 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 sm:space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-2.5">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold text-blue-200 border border-white/15">
                <Sparkles size={13} className="text-amber-300" />
                <span>Verified Academic Credentials</span>
              </div>
              <Badge variant="success" className="font-bold text-[10px] sm:text-xs">Active Track</Badge>
            </div>

            {/* Metric counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10">
                <span className="text-[10px] sm:text-[11px] font-semibold text-blue-200 block">Total Earned XP</span>
                <span className="text-xl sm:text-2xl font-black text-amber-300 mt-0.5 sm:mt-1 flex items-center gap-1">
                  <Zap size={18} className="fill-amber-300 text-amber-300" />
                  {stats.xp}
                </span>
                <span className="text-[9px] sm:text-[10px] text-blue-200 mt-0.5 block">Points Mastered</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10">
                <span className="text-[10px] sm:text-[11px] font-semibold text-blue-200 block">Daily Streak</span>
                <span className="text-xl sm:text-2xl font-black text-white mt-0.5 sm:mt-1 flex items-center gap-1">
                  <Flame size={18} className="fill-orange-400 text-orange-400" />
                  {stats.streak} Days
                </span>
                <span className="text-[9px] sm:text-[10px] text-emerald-300 mt-0.5 block">
                  {stats.streak >= 3 ? 'On Fire (3+ Days)' : 'Active Learning'}
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10">
                <span className="text-[10px] sm:text-[11px] font-semibold text-blue-200 block">Current Rank</span>
                <span className="text-xl sm:text-2xl font-black text-purple-300 mt-0.5 sm:mt-1 flex items-center gap-1">
                  <Award size={18} className="text-purple-300" />
                  Level {stats.level}
                </span>
                <span className="text-[9px] sm:text-[10px] text-blue-200 mt-0.5 block">Explorer Rank</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10">
                <span className="text-[10px] sm:text-[11px] font-semibold text-blue-200 block">Badges Unlocked</span>
                <span className="text-xl sm:text-2xl font-black text-white mt-0.5 sm:mt-1">
                  {stats.unlockedBadges.length} / {BADGES.length}
                </span>
                <span className="text-[9px] sm:text-[10px] text-emerald-300 mt-0.5 block">Mastery Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Badges Showcase Grid */}
        <Card className="p-4 sm:p-6 bg-white space-y-3.5 sm:space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2">
              <Award size={16} className="text-amber-500" />
              <span>Olympiad Achievement Badges</span>
            </h3>
            <span className="text-[11px] sm:text-xs text-slate-400">
              {stats.unlockedBadges.length} of {BADGES.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {BADGES.map(b => {
              const isUnlocked = stats.unlockedBadges.includes(b.id)
              return (
                <div
                  key={b.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-slate-50 to-blue-50/50 border-blue-200 shadow-xs'
                      : 'bg-slate-50/60 border-slate-200 opacity-60'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm bg-gradient-to-br ${b.color} text-white`}>
                    {b.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-bold text-xs text-slate-900 truncate">{b.title}</h4>
                      {isUnlocked && <CheckCircle size={13} className="text-emerald-500 flex-shrink-0" />}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">{b.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Personal Details Form */}
        <Card className="p-4 sm:p-6 bg-white">
          <h3 className="font-bold text-slate-900 text-sm mb-4">Personal Details & Account</h3>
          
          <div className="flex items-center gap-4 sm:gap-5 mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-slate-200">
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                {user?.profile?.avatar_url ? (
                  <img src={user.profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xl sm:text-2xl font-bold text-blue-600">
                    {user?.profile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              <label className={`absolute bottom-0 right-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors shadow-xs ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={handleAvatarUpload} />
                <Camera size={11} className="text-white" />
              </label>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm sm:text-base font-bold text-slate-900 truncate">{user?.profile?.full_name}</p>
              <p className="text-xs text-slate-500 truncate">{user?.profile?.email}</p>
              <span className="inline-flex items-center mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">Enrolled Student</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input label="Full Name" {...register('full_name')} />
            <div className="flex flex-col gap-1">
              <label className="text-xs sm:text-sm font-medium text-slate-700">Email Address</label>
              <div className="h-9 px-3 flex items-center gap-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-400 text-xs sm:text-sm">
                <Mail size={14} />
                <span className="truncate">{user?.profile?.email}</span>
              </div>
              <p className="text-[11px] text-slate-400">Email cannot be changed</p>
            </div>
            <Input label="Phone Number" placeholder="+1 234 567 8900" {...register('phone')} />
            <div className="pt-2">
              <Button type="submit" loading={saving} className="w-full sm:w-auto">Save Changes</Button>
            </div>
          </form>
        </Card>
      </div>
    </AppLayout>
  )
}
