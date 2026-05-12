import { Navigate, useLocation } from "react-router-dom";
import MaterialIcon from "../common/MaterialIcon";
import useAuth from "../../hooks/useAuth";

const AuthLoading = () => (
  <main className="flex min-h-screen items-center justify-center bg-app-bg p-md text-text-primary">
    <div className="rounded-[24px] border border-border-neutral bg-card-surface p-xl text-center shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface-container-low text-primary">
        <MaterialIcon name="hourglass_top" className="animate-spin text-[36px]" />
      </div>
      <h1 className="mt-md font-page-heading text-section-heading font-bold">Loading your quest</h1>
      <p className="mt-xs text-body-md text-text-secondary">Checking your HabitQuest session...</p>
    </div>
  </main>
);

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <AuthLoading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
