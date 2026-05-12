import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ProtectedRoute from "./ProtectedRoute";

const AdminRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return <ProtectedRoute>{children}</ProtectedRoute>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
