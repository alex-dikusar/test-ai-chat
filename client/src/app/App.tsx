import { Navigate, Route, Routes } from 'react-router-dom'
import { Chat } from '@/app/Chat'
import { ProtectedRoute } from '@/app/ui/ProtectedRoute'
import { PublicOnlyRoute } from '@/app/ui/PublicOnlyRoute'
import { LoginPage, RegisterPage, useAuth } from '@/widgets/auth'

function HomeRedirect() {
  const { isAuthenticated, isInitialized } = useAuth()
  if (!isInitialized) return null
  return <Navigate to={isAuthenticated ? '/chat' : '/login'} replace />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicOnlyRoute>
            <RegisterPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
