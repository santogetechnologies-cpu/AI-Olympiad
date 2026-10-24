import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, BookOpen, FolderOpen, Users, BarChart3,
  Settings, LogOut, ChevronLeft, ChevronRight, Bell, GraduationCap,
  FileText, HelpCircle, Home, User, Flame, Zap, X, Menu, Search
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { gamification, type StudentStats } from '../../utils/gamification'
import { progressService, type StudentDashboardData } from '../../services/progressService'
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

  // Search state for student top header
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [dashboardData, setDashboardData] = useState<StudentDashboardData | null>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)

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
    : 'bg-emerald-50 text-emerald-600 border border-emerald-200/60'

  useEffect(() => {
    if (user?.id && isStudent) {
      gamification.syncWithDatabase(user.id, user.organization_id)
        .then(s => setStats(s))
        .catch(() => {})

      progressService.getStudentDetailedDashboard(user.id, user.organization_id)
        .then(d => setDashboardData(d))
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

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  // Filtered chapters for header search
  const filteredChapters = searchQuery.trim() && dashboardData?.assignedChapters
    ? dashboardData.assignedChapters.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.short_description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(c.chapter_number).toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  const studentInitial = user?.profile?.full_name?.charAt(0)?.toUpperCase() || 'A'
  const studentFirstName = user?.profile?.full_name?.split(' ')[0] || 'Andrew'

  return (
    <div className={`flex h-screen ${isStudent ? 'bg-[#f4f7fc]' : 'bg-slate-50'} overflow-hidden`}>
      {/* Mobile overlay for non-students */}
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

      {/* Mobile overlay for student if opened */}
      {isStudent && mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-[60] lg:hidden transition-opacity duration-300 pointer-events-auto"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ─── SIDEBAR ─── */}
      <aside
        className={`
          ${isStudent ? 'fixed lg:relative inset-y-0 left-0 z-[70] flex' : 'fixed lg:relative inset-y-0 left-0 z-[70] flex'} flex-col
          ${isStudent ? 'bg-white text-slate-800 border-r border-slate-200/80 shadow-[2px_0_12px_rgba(0,0,0,0.02)]' : 'bg-slate-900 text-white'}
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-16' : (isStudent ? 'w-64' : 'w-72 max-w-[85vw] lg:w-60')}
          ${mobileOpen ? 'translate-x-0 shadow-2xl pointer-events-auto' : '-translate-x-full lg:translate-x-0 pointer-events-none lg:pointer-events-auto'}
        `}
      >
        {/* Logo Header */}
        <div className={`flex items-center justify-between px-5 h-20 ${isStudent ? 'border-b border-slate-100' : 'border-b border-slate-700/50'} flex-shrink-0 ${collapsed ? 'justify-center' : ''}`}>
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${isStudent ? 'bg-amber-50/80 border border-amber-200/80' : 'bg-slate-800/90 border border-amber-400/40'} p-0.5 shadow-2xs`}>
              <img src="/mama-ada-logo.png" alt="MAMA ADA LMS" className="w-full h-full object-contain" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className={`text-[13px] font-black tracking-wide truncate ${isStudent ? 'text-slate-900' : 'text-white'}`}>
                  MAMA ADA LMS
                </p>
                <p className={`text-[9.5px] font-bold uppercase tracking-wider truncate ${isStudent ? 'text-amber-500' : 'text-amber-400'}`}>
                  Global AI Olympiad
                </p>
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
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-5 px-3.5 space-y-1.5 scrollbar-thin">
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = location.pathname === item.href ||
              (item.href !== '/admin' && item.href !== '/student' && item.href !== '/content-manager' && location.pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all group relative ${
                  isStudent
                    ? (isActive
                        ? 'bg-[#eef3ff] text-[#2563eb] shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100')
                    : (isActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white active:bg-slate-750')
                } ${collapsed ? 'justify-center' : ''}`}
              >
                <Icon size={19} className={`flex-shrink-0 ${isActive && isStudent ? 'text-[#2563eb] stroke-[2.5]' : ''}`} />
                {!collapsed && <span className="truncate">{item.label}</span>}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 border border-slate-700 shadow-md">
                    {item.label}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User profile & sign out */}
        <div className={`p-4 ${isStudent ? 'border-t border-slate-100 bg-white' : 'border-t border-slate-700/50 bg-slate-900/50'} flex-shrink-0 ${collapsed ? 'items-center' : ''}`}>
          {!collapsed && (
            <div className={`flex items-center gap-3 p-2.5 rounded-2xl ${isStudent ? 'bg-slate-50/80 border border-slate-100' : ''}`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-2xs ${
                isStudent
                  ? 'bg-[#2563eb] text-white'
                  : 'bg-blue-600/30 text-blue-300 border border-blue-500/40'
              }`}>
                {user?.profile?.avatar_url ? (
                  <img src={user.profile.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span>{studentInitial}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className={`text-xs font-bold truncate leading-tight ${isStudent ? 'text-slate-900' : 'text-white'}`}>
                  {user?.profile?.full_name ? user.profile.full_name : 'Andrew'}
                </p>
                <span className={`inline-block text-[10px] px-2 py-0.2 rounded-full font-bold mt-1 ${roleColor}`}>
                  {roleLabel}
                </span>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={handleSignOut}
            className={`flex items-center gap-2.5 w-full px-3 py-2.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-semibold transition-colors cursor-pointer active:scale-98 mt-2 ${collapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={16} />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>

        {/* Desktop Collapse Toggle for Non-Students */}
        {!isStudent && (
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-full items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
          </button>
        )}
      </aside>

      {/* ─── MAIN CONTENT VIEWPORT ─── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className={`h-16 sm:h-20 ${isStudent ? 'bg-transparent px-4 sm:px-8' : 'bg-white border-b border-slate-200/90 px-3 sm:px-6'} flex items-center justify-between flex-shrink-0 z-20`}>
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {/* Mobile Sidebar Toggle Button for Students */}
            {isStudent && (
              <button
                type="button"
                onClick={() => setMobileOpen(prev => !prev)}
                className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200/80 cursor-pointer shrink-0 min-h-[38px] min-w-[38px] flex items-center justify-center shadow-2xs"
                aria-label="Toggle navigation menu"
              >
                <Menu size={19} />
              </button>
            )}

            {/* Mobile Sidebar Toggle Button for Admin */}
            {!isStudent && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setMobileOpen(prev => !prev)
                }}
                className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 border border-slate-200/80 cursor-pointer shrink-0 min-h-[38px] min-w-[38px] flex items-center justify-center relative z-30 transition-colors"
                aria-label="Toggle navigation menu"
              >
                <Menu size={20} />
              </button>
            )}

            {/* Mobile Brand Logo */}
            <Link to={isStudent ? "/student" : "/admin"} className="flex lg:hidden items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 p-0.5 bg-amber-50 border border-amber-200 shadow-2xs">
                <img src="/mama-ada-logo.png" alt="MAMA ADA LMS" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs font-black text-slate-900 truncate">MAMA ADA LMS</span>
            </Link>

            {/* Student Search Bar (Desktop & Tablet) */}
            {isStudent && (
              <div ref={searchContainerRef} className="hidden sm:block relative w-72 sm:w-80 md:w-96 max-w-md">
                <div className="relative">
                  <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setSearchOpen(true)
                    }}
                    onFocus={() => setSearchOpen(true)}
                    placeholder="Search lessons, chapters, or topics..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-slate-200/90 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Instant Search Dropdown */}
                {searchOpen && searchQuery.trim() && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50 p-2 max-h-72 overflow-y-auto">
                    {filteredChapters.length > 0 ? (
                      <div className="space-y-1">
                        <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Matching Chapters ({filteredChapters.length})
                        </p>
                        {filteredChapters.map((ch) => (
                          <Link
                            key={ch.id}
                            to={`/student/learning/${ch.id}`}
                            onClick={() => {
                              setSearchOpen(false)
                              setSearchQuery('')
                            }}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-blue-50/70 text-slate-700 hover:text-blue-700 transition-colors"
                          >
                            <BookOpen size={15} className="text-blue-600 flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-xs font-bold truncate">Chapter {ch.chapter_number}: {ch.title}</p>
                              {ch.short_description && (
                                <p className="text-[11px] text-slate-500 truncate">{ch.short_description}</p>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center">
                        <p className="text-xs text-slate-500">No matching chapters or topics found</p>
                        <Link
                          to="/student/learning"
                          onClick={() => setSearchOpen(false)}
                          className="inline-block mt-2 text-xs font-semibold text-blue-600 hover:underline"
                        >
                          Browse all curriculum chapters →
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Header Badges */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {isStudent && (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="flex items-center gap-1 bg-white border border-slate-200/80 px-2.5 py-1 rounded-full text-xs font-bold text-slate-700 shadow-2xs">
                  <Flame size={14} className="fill-rose-500 text-rose-500 shrink-0" />
                  <span>{stats.streak}</span>
                  <span className="text-[10px] text-slate-400 font-medium">d</span>
                </div>
                <div className="flex items-center gap-1 bg-white border border-slate-200/80 px-2.5 py-1 rounded-full text-xs font-bold text-slate-700 shadow-2xs">
                  <Zap size={14} className="fill-amber-500 text-amber-500 shrink-0" />
                  <span>{stats.xp}</span>
                  <span className="text-[10px] text-slate-400 font-medium">XP</span>
                </div>
              </div>
            )}

            {/* Notification Bell with Red Badge Dot */}
            <button
              className="relative w-9 h-9 rounded-full bg-white hover:bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600 hover:text-slate-900 shadow-2xs transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell size={16} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>

            {/* User Avatar Circle */}
            <Link
              to={isStudent ? '/student/profile' : '/admin/settings'}
              className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-xs font-bold shadow-2xs transition-all ${
                isStudent
                  ? 'bg-[#dbeafe] text-[#1d4ed8] border border-blue-200 hover:ring-2 hover:ring-blue-300/40'
                  : 'bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700'
              }`}
            >
              {user?.profile?.avatar_url ? (
                <img src={user.profile.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                <span>{studentInitial}</span>
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
                  : `overflow-y-auto overflow-x-hidden ${isStudent ? 'pb-24 lg:pb-8' : ''}`
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
                      ? 'text-[#2563eb] font-bold bg-blue-50/80 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50/60'
                  }`}
                >
                  <div
                    className={`flex items-center justify-center p-1 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-[#2563eb] text-white shadow-xs'
                        : 'text-slate-500 group-hover:text-slate-800'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'stroke-[2.5]' : 'stroke-2'} />
                  </div>
                  <span
                    className={`text-[11px] mt-0.5 leading-none tracking-tight font-semibold ${
                      isActive ? 'text-[#2563eb] font-bold' : 'text-slate-500'
                    }`}
                  >
                    {tab.label}
                  </span>
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-[#2563eb] mt-0.5" />
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
