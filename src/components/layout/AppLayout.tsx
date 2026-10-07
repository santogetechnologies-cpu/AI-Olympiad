import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, BookOpen, FolderOpen, Users, BarChart3,
  Settings, LogOut, ChevronLeft, ChevronRight, Bell, GraduationCap,
  FileText, HelpCircle, Home, User, Flame, Zap, X, Menu
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { gamification, type StudentStats } from '../../utils/gamification'
import toast from 'react-hot-toast'

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
  badge?: number
}

function AdminNav(): NavItem[] {
  return [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Academic Structure', href: '/admin/academic', icon: BookOpen },
    { label: 'Content Manager', href: '/content-manager', icon: FolderOpen },
    { label: 'Students', href: '/admin/students', icon: Users },
    { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ]
}

function ContentManagerNav(): NavItem[] {
  return [
    { label: 'Content Studio', href: '/content-manager', icon: LayoutDashboard },
    { label: 'Academic Structure', href: '/content-manager/academic', icon: BookOpen },
    { label: 'Analytics', href: '/content-manager/analytics', icon: BarChart3 },
  ]
}

function StudentNav(): NavItem[] {
  return [
    { label: 'Dashboard', href: '/student', icon: Home },
    { label: 'My Learning', href: '/student/learning', icon: BookOpen },
    { label: 'Assignments', href: '/student/assignments', icon: FileText },
    { label: 'Quizzes', href: '/student/quizzes', icon: HelpCircle },
    { label: 'Progress', href: '/student/progress', icon: BarChart3 },
    { label: 'Profile', href: '/student/profile', icon: User },
  ]
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [stats, setStats] = useState<StudentStats>(() => gamification.getStats(user?.id))

  const userRole = (user?.role || '') as string
  const isAdmin = userRole === 'admin'
  const isContentManager = userRole === 'academic_content_manager' || userRole === 'content_manager'
  const isStudent = !isAdmin && !isContentManager

  const navItems = isAdmin
    ? AdminNav()
    : isContentManager
    ? ContentManagerNav()
    : StudentNav()

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch {
      toast.error('Failed to sign out')
    }
  }

  const roleLabel = isAdmin
    ? 'Administrator'
    : isContentManager
    ? 'Content Manager'
    : 'Student'

  const roleColor = isAdmin
    ? 'bg-purple-100 text-purple-700'
    : isContentManager
    ? 'bg-blue-100 text-blue-700'
    : 'bg-green-100 text-green-700'

  useEffect(() => {
    if (user?.id && isStudent) {
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
  }, [user?.id, user?.organization_id, isStudent])

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile overlay with backdrop-blur */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-[60] lg:hidden transition-opacity duration-300 pointer-events-auto"
          onClick={(e) => {
            e.stopPropagation()
            setMobileOpen(false)
          }}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Drawer (Top Z-Index on Mobile) */}
      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-[70] flex flex-col
          bg-slate-900 text-white transition-all duration-300 ease-in-out
          ${collapsed ? 'w-16' : 'w-72 max-w-[85vw] lg:w-60'}
          ${mobileOpen ? 'translate-x-0 shadow-2xl pointer-events-auto' : '-translate-x-full lg:translate-x-0 pointer-events-none lg:pointer-events-auto'}
        `}
      >
        {/* Logo Header */}
        <div className={`flex items-center justify-between px-4 h-16 border-b border-slate-700/50 flex-shrink-0 ${collapsed ? 'justify-center' : ''}`}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <GraduationCap size={18} className="text-white" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-sm font-bold text-white truncate">Nanjil LMS</p>
                <p className="text-xs text-slate-400 truncate">{user?.profile?.full_name || 'Academy'}</p>
              </div>
            )}
          </div>
          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setMobileOpen(false)
            }}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 active:bg-slate-700 touch-manipulation cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1.5 scrollbar-thin">
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = location.pathname === item.href ||
              (item.href !== '/admin' && item.href !== '/student' && item.href !== '/content-manager' && location.pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-3 lg:py-2.5 rounded-xl text-sm font-medium transition-all group relative ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white active:bg-slate-750'
                } ${collapsed ? 'justify-center' : ''}`}
              >
                <Icon size={19} className="flex-shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 border border-slate-700">
                    {item.label}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User profile & sign out */}
        <div className={`p-3 border-t border-slate-700/50 flex-shrink-0 bg-slate-900/50 ${collapsed ? 'items-center' : ''}`}>
          {!collapsed && (
            <div className="flex items-center gap-2.5 mb-2.5 px-1.5 py-1">
              <div className="w-8 h-8 bg-blue-600/30 text-blue-300 border border-blue-500/40 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">
                {user?.profile?.avatar_url ? (
                  <img src={user.profile.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span>
                    {user?.profile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-white truncate">{user?.profile?.full_name || 'User'}</p>
                <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-bold mt-0.5 ${roleColor}`}>{roleLabel}</span>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={handleSignOut}
            className={`flex items-center gap-2.5 w-full px-3.5 py-2.5 text-slate-300 hover:text-rose-300 hover:bg-rose-950/40 rounded-xl text-sm font-medium transition-colors cursor-pointer active:scale-98 ${collapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={17} />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>

        {/* Desktop Collapse Toggle */}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-full items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </aside>

      {/* Main content viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-14 sm:h-16 bg-white border-b border-slate-200/90 flex items-center justify-between px-3 sm:px-6 flex-shrink-0 z-20">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Mobile Sidebar Toggle Button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setMobileOpen(prev => !prev)
              }}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 border border-slate-200/80 touch-manipulation cursor-pointer shrink-0 min-h-[38px] min-w-[38px] flex items-center justify-center relative z-30 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={20} />
            </button>
            <div className="lg:hidden flex items-center gap-1.5 min-w-0">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center shrink-0 shadow-2xs">
                <GraduationCap size={15} className="text-white" />
              </div>
              <span className="text-sm font-black text-slate-900 truncate">Nanjil LMS</span>
            </div>
          </div>

          {/* Right Header Badges */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {isStudent && (
              <div className="flex items-center gap-1 sm:gap-1.5">
                <div className="flex items-center gap-1 bg-orange-50 text-orange-700 border border-orange-200/90 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold shadow-2xs">
                  <Flame size={13} className="fill-orange-500 text-orange-500 shrink-0" />
                  <span>{stats.streak}</span>
                  <span className="hidden xs:inline text-[10px]">d</span>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200/90 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold shadow-2xs">
                  <Zap size={13} className="fill-amber-500 text-amber-500 shrink-0" />
                  <span>{stats.xp}</span>
                  <span className="hidden xs:inline text-[10px]">XP</span>
                </div>
                <div className="hidden sm:flex items-center gap-1 bg-purple-50 text-purple-700 border border-purple-200/90 px-2 py-0.5 rounded-full text-[11px] font-bold">
                  <span>Lvl {stats.level}</span>
                </div>
              </div>
            )}

            <button className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 touch-manipulation cursor-pointer shrink-0" aria-label="Notifications">
              <Bell size={18} />
            </button>

            <Link
              to={isStudent ? '/student/profile' : '/admin/settings'}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 flex items-center justify-center shrink-0 text-xs font-bold text-slate-700 touch-manipulation transition-colors"
            >
              {user?.profile?.avatar_url ? (
                <img src={user.profile.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                <span>{user?.profile?.full_name?.charAt(0)?.toUpperCase() || 'U'}</span>
              )}
            </Link>
          </div>
        </header>

        {/* Main Scrollable Content */}
        <main className={`flex-1 overflow-y-auto overflow-x-hidden ${isStudent ? 'pb-20 lg:pb-0' : ''}`}>
          {children}
        </main>

        {/* Student Mobile Bottom Navigation Bar (Thumb-Friendly on 320px–430px) */}
        {isStudent && (
          <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 lg:hidden flex items-center justify-around px-1 py-1.5 shadow-lg safe-area-bottom">
            {[
              { label: 'Home', href: '/student', icon: Home },
              { label: 'Learn', href: '/student/learning', icon: BookOpen },
              { label: 'Tasks', href: '/student/assignments', icon: FileText },
              { label: 'Quizzes', href: '/student/quizzes', icon: HelpCircle },
              { label: 'Progress', href: '/student/progress', icon: BarChart3 },
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = location.pathname === tab.href ||
                (tab.href !== '/student' && location.pathname.startsWith(tab.href))
              return (
                <Link
                  key={tab.href}
                  to={tab.href}
                  className={`flex flex-col items-center justify-center flex-1 min-h-[44px] py-1 px-1 rounded-xl transition-all duration-150 touch-manipulation active:scale-95 ${
                    isActive
                      ? 'text-blue-600 font-bold bg-blue-50/80'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Icon size={19} className={isActive ? 'stroke-[2.5]' : 'stroke-2'} />
                  <span className="text-[10px] mt-0.5 leading-none tracking-tight">{tab.label}</span>
                </Link>
              )
            })}
          </nav>
        )}
      </div>
    </div>
  )
}
