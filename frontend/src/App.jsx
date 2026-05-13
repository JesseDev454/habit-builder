import { Route, Routes } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import AdminRoute from "./components/layout/AdminRoute";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import HabitTemplates from "./pages/HabitTemplates";
import Dashboard from "./pages/Dashboard";
import CreateHabit from "./pages/CreateHabit";
import DailyHabits from "./pages/DailyHabits";
import CategoryDashboard from "./pages/CategoryDashboard";
import EditHabit from "./pages/EditHabit";
import HabitDetail from "./pages/HabitDetail";
import Analytics from "./pages/Analytics";
import Achievements from "./pages/Achievements";
import Challenges from "./pages/Challenges";
import EpicQuests from "./pages/EpicQuests";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import DemoState from "./pages/DemoState";

const App = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/demo/:state" element={<DemoState />} />
    <Route
      path="/onboarding"
      element={
        <ProtectedRoute>
          <Onboarding />
        </ProtectedRoute>
      }
    />
    <Route
      path="/habit-templates"
      element={
        <ProtectedRoute>
          <HabitTemplates />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/daily-habits"
      element={
        <ProtectedRoute>
          <DailyHabits />
        </ProtectedRoute>
      }
    />
    <Route
      path="/daily-habits/:category"
      element={
        <ProtectedRoute>
          <CategoryDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/create-habit"
      element={
        <ProtectedRoute>
          <CreateHabit />
        </ProtectedRoute>
      }
    />
    <Route
      path="/habits/new"
      element={
        <ProtectedRoute>
          <CreateHabit />
        </ProtectedRoute>
      }
    />
    <Route
      path="/analytics"
      element={
        <ProtectedRoute>
          <Analytics />
        </ProtectedRoute>
      }
    />
    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />
    <Route
      path="/epic-quests"
      element={
        <ProtectedRoute>
          <EpicQuests />
        </ProtectedRoute>
      }
    />

    <Route
      element={
        <ProtectedRoute>
          <AppShell />
        </ProtectedRoute>
      }
    >
      <Route path="/habits/:id/edit" element={<EditHabit />} />
      <Route path="/habits/:id" element={<HabitDetail />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/challenges" element={<Challenges />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;
