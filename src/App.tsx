import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute, PublicRoute } from './components/layout/ProtectedRoute'

// Auth pages
import LoginPage from './pages/auth/LoginPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import ResetPasswordPage from './pages/auth/ResetPasswordPage'
import ChangePasswordPage from './pages/auth/ChangePasswordPage'

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AcademicStructurePage from './pages/admin/AcademicStructurePage'
import ContentBuilderPage from './pages/admin/ContentBuilderPage'
import AdminStudentsPage from './pages/admin/AdminStudentsPage'
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage'
import AdminSettingsPage from './pages/admin/AdminSettingsPage'

// Content Manager pages
import ContentManagerDashboard from './pages/content-manager/ContentManagerDashboard'
import ContentManagerAnalyticsPage from './pages/content-manager/ContentManagerAnalyticsPage'

// Student pages
import StudentDashboard from './pages/student/StudentDashboard'
import StudentLearningPage from './pages/student/StudentLearningPage'
import ChapterLearningPage from './pages/student/ChapterLearningPage'
import StudentProgressPage from './pages/student/StudentProgressPage'
import StudentAssignmentsPage from './pages/student/StudentAssignmentsPage'
import StudentQuizzesPage from './pages/student/StudentQuizzesPage'
import StudentProfilePage from './pages/student/StudentProfilePage'
import GaioBookPage from './pages/student/GaioBookPage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { fontFamily: 'Inter, system-ui, sans-serif', fontSize: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' },
            success: { iconTheme: { primary: '#22c55e', secondary: '#fff' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
          }}
        />
        <Routes>
          {/* Public & Auth routes */}
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/change-password" element={<ProtectedRoute><ChangePasswordPage /></ProtectedRoute>} />

          {/* Admin routes */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/academic" element={<ProtectedRoute allowedRoles={['admin']}><AcademicStructurePage /></ProtectedRoute>} />
          <Route path="/admin/chapters/:chapterId/content" element={<ProtectedRoute allowedRoles={['admin']}><ContentBuilderPage /></ProtectedRoute>} />
          <Route path="/admin/students" element={<ProtectedRoute allowedRoles={['admin']}><AdminStudentsPage /></ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={['admin']}><AdminAnalyticsPage /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminSettingsPage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminSettingsPage /></ProtectedRoute>} />
          <Route path="/content-manager/settings" element={<Navigate to="/content-manager" replace />} />
          <Route path="/admin/content" element={<ProtectedRoute allowedRoles={['admin', 'academic_content_manager']}><ContentManagerDashboard /></ProtectedRoute>} />

          {/* Content Manager routes */}
          <Route path="/content-manager" element={<ProtectedRoute allowedRoles={['admin', 'academic_content_manager']}><ContentManagerDashboard /></ProtectedRoute>} />
          <Route path="/content-manager/academic" element={<ProtectedRoute allowedRoles={['admin', 'academic_content_manager']}><AcademicStructurePage /></ProtectedRoute>} />
          <Route path="/content-manager/chapters/:chapterId/content" element={<ProtectedRoute allowedRoles={['admin', 'academic_content_manager']}><ContentBuilderPage /></ProtectedRoute>} />
          <Route path="/content-manager/analytics" element={<ProtectedRoute allowedRoles={['admin', 'academic_content_manager']}><ContentManagerAnalyticsPage /></ProtectedRoute>} />

          {/* Student routes */}
          <Route path="/student" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/learning" element={<ProtectedRoute allowedRoles={['student']}><StudentLearningPage /></ProtectedRoute>} />
          <Route path="/student/learning/:chapterId" element={<ProtectedRoute allowedRoles={['student']}><ChapterLearningPage /></ProtectedRoute>} />
          <Route path="/student/progress" element={<ProtectedRoute allowedRoles={['student']}><StudentProgressPage /></ProtectedRoute>} />
          <Route path="/student/assignments" element={<ProtectedRoute allowedRoles={['student']}><StudentAssignmentsPage /></ProtectedRoute>} />
          <Route path="/student/quizzes" element={<ProtectedRoute allowedRoles={['student']}><StudentQuizzesPage /></ProtectedRoute>} />
          <Route path="/student/profile" element={<ProtectedRoute allowedRoles={['student']}><StudentProfilePage /></ProtectedRoute>} />
          <Route path="/student/book" element={<ProtectedRoute allowedRoles={['student']}><GaioBookPage /></ProtectedRoute>} />
          <Route path="/book" element={<GaioBookPage />} />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
