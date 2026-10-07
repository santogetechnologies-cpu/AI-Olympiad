import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { LoadingState } from '../ui'
import type { RoleName } from '../../types'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: RoleName[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><LoadingState message="Loading your workspace..." /></div>
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Force password change on first login
  if (user.profile?.must_change_password && location.pathname !== '/change-password') {
    return <Navigate to="/change-password" replace />
  }

  if (allowedRoles) {
    const userRole = user.role as string
    const hasRole = allowedRoles.includes(user.role) || (userRole === 'content_manager' && allowedRoles.includes('academic_content_manager'))
    if (!hasRole) {
      // Redirect to appropriate dashboard
      const redirectPath = user.role === 'admin'
        ? '/admin'
        : (user.role === 'academic_content_manager' || userRole === 'content_manager')
        ? '/content-manager'
        : '/student'
      return <Navigate to={redirectPath} replace />
    }
  }

  return <>{children}</>
}

export function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><LoadingState /></div>
  }

  if (user) {
    const userRole = user.role as string
    const redirectPath = user.role === 'admin'
      ? '/admin'
      : (user.role === 'academic_content_manager' || userRole === 'content_manager')
      ? '/content-manager'
      : '/student'
    return <Navigate to={redirectPath} replace />
  }

  return <>{children}</>
}
