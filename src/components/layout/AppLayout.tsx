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
    { label: 'Home', href: '/student', icon: Home },
    { label: 'Learn', href: '/student/learning', icon: BookOpen },
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
      {/* Mobile overlay with backdrop-blur (Only for non-students if opened) */}
      {!isStudent && mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-[60] lg:hidden transition-opacity duration-300 pointer-events-auto"
          onClick={(e) => {
            e.stopPropagation()
            setMobileOpen(false)
          }}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Drawer: Completely removed on mobile for students, desktop-only */}
      <aside
        className={`
          ${isStudent ? 'hidden lg:flex' : 'fixed lg:relative inset-y-0 left-0 z-[70] flex'} flex-col
          bg-slate-900 text-white transition-all duration-300 ease-in-out
          ${collapsed ? 'w-16' : 'w-72 max-w-[85vw] lg:w-60'}
          ${!isStudent && mobileOpen ? 'translate-x-0 shadow-2xl pointer-events-auto' : (!isStudent ? '-translate-x-full lg:translate-x-0 pointer-events-none lg:pointer-events-auto' : '')}
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
            {/* Mobile Sidebar Toggle Button - Only shown for non-students (admin) */}
            {!isStudent && (
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
            )}
            <Link to={isStudent ? "/student" : "/admin"} className="flex items-center gap-2 min-w-0 group">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                <GraduationCap size={17} className="text-white" />
              </div>
              <div className="min-w-0">
                <span className="text-sm font-black text-slate-900 leading-tight truncate block">Nanjil LMS</span>
                <span className="text-[10px] text-blue-600 font-bold leading-tight truncate block">AI Olympiad</span>
              </div>
            </Link>
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

        {/* Main Content Viewport */}
        {(() => {
          const isLearningRoute = isStudent && location.pathname.startsWith('/student/learning')
          return (
            <main
              className={`flex-1 ${
                isLearningRoute
                  ? 'overflow-hidden pb-[3.75rem] lg:pb-0 flex flex-col min-h-0'
                  : `overflow-y-auto overflow-x-hidden ${isStudent ? 'pb-24 lg:pb-0' : ''}`
              }`}
            >
              {children}
            </main>
          )
        })()}

        {/* Student Mobile Bottom Navigation Bar (4 Items: Home, Learn, Progress, Profile) */}
        {isStudent && (
          <nav
            aria-label="Mobile Bottom Navigation"
            className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 lg:hidden flex items-center justify-around px-2 py-1.5 shadow-[0_-4px_24px_rgba(15,23,42,0.06)] pb-[calc(0.4rem+env(safe-area-inset-bottom,0px))]"
          >
            {[
              {
                label: 'Home',
                href: '/student',
                icon: Home,
                isActive: location.pathname === '/student',
              },
              {
                label: 'Learn',
                href: '/student/learning',
                icon: BookOpen,
                isActive:
                  location.pathname.startsWith('/student/learning') ||
                  location.pathname.startsWith('/student/book') ||
                  location.pathname.startsWith('/book'),
              },
              {
                label: 'Progress',
                href: '/student/progress',
                icon: BarChart3,
                isActive: location.pathname.startsWith('/student/progress'),
              },
              {
                label: 'Profile',
                href: '/student/profile',
                icon: User,
                isActive: location.pathname.startsWith('/student/profile'),
              },
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = tab.isActive
              return (
                <Link
                  key={tab.href}
                  to={tab.href}
                  className={`flex flex-col items-center justify-center flex-1 min-h-[50px] py-1 px-1 rounded-2xl transition-all duration-200 touch-manipulation active:scale-95 group relative ${
                    isActive
                      ? 'text-blue-600 font-bold bg-blue-50/80 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50/60'
                  }`}
                >
                  <div
                    className={`flex items-center justify-center p-1 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-500 group-hover:text-slate-800'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'stroke-[2.5]' : 'stroke-2'} />
                  </div>
                  <span
                    className={`text-[11px] mt-0.5 leading-none tracking-tight font-semibold ${
                      isActive ? 'text-blue-600 font-bold' : 'text-slate-500'
                    }`}
                  >
                    {tab.label}
                  </span>
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-blue-600 mt-0.5" />
                  )}
                </Link>
              )
            })}
          </nav>
        )}
      </div>
    </div>
  )
}
