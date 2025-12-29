import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ProtectedRoute = () => {
  const { user, loading } = useUser();

  // Wait until auth state is resolved
  if (loading) {
    return <div>Loading...</div>;
  }

  // Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in → allow access
  return <Outlet />;
};

export default ProtectedRoute;
