import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const ProtectedRoute = () => {
  const { user, loading } = useContext(UserContext)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-black/60">
        Checking authentication...
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute

