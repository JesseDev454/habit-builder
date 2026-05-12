import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MaterialIcon from "../components/common/MaterialIcon";
import LoadingSkeleton from "../components/common/LoadingSkeleton";
import EmptyState from "../components/common/EmptyState";
import { getAdminStats } from "../api/adminApi";

const statCards = [
  ["totalUsers", "Total Users", "group", "text-info-blue"],
  ["totalHabits", "Total Habits", "repeat", "text-primary"],
  ["activeHabits", "Active Habits", "task_alt", "text-success-green"],
  ["archivedHabits", "Archived Habits", "archive", "text-text-muted"],
  ["totalCompletions", "Completions", "check_circle", "text-success-green"],
  ["totalBadges", "Badges", "military_tech", "text-badge-pink"],
  ["totalBadgesUnlocked", "Unlocked", "workspace_premium", "text-xp-gold"],
  ["activeChallenges", "Challenges", "local_fire_department", "text-streak-orange"],
  ["joinedChallenges", "Joined", "groups", "text-info-blue"],
  ["completedChallenges", "Completed", "emoji_events", "text-xp-gold"],
  ["totalNotifications", "Notifications", "notifications", "text-primary"],
];

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const statsData = await getAdminStats();
        setData(statsData);
      } catch (err) {
        setError(err.message || "Could not load admin stats.");
        toast.error(err.message || "Could not load admin stats.");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) return <LoadingSkeleton count={6} />;

  if (error) return <EmptyState title="Admin stats unavailable" message="Check that your account has admin access." />;

  const stats = data?.stats || {};

  return (
    <div className="space-y-lg">
      <div>
        <h1 className="font-page-heading text-page-heading font-bold text-text-primary">Admin Lite</h1>
        <p className="mt-1 text-text-secondary">A quick health snapshot of HabitQuest MVP activity.</p>
      </div>

      <div className="grid grid-cols-1 gap-md md:grid-cols-2 lg:grid-cols-4">
        {statCards.map(([key, label, icon, color]) => (
          <AdminStat key={key} label={label} value={(stats[key] || 0).toLocaleString()} icon={icon} color={color} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-md lg:grid-cols-2 lg:gap-lg">
        <ActivityTable
          columns={["User", "Email", "Role", "XP"]}
          rows={(data?.recentUsers || []).map((user) => [user.name, user.email, user.role, user.totalXP || 0])}
          title="Recent Users"
        />
        <ActivityTable
          columns={["User", "Habit", "Category", "Completed"]}
          rows={(data?.recentCompletions || []).map((log) => [
            log.user?.name || "Unknown",
            log.habit?.name || "Deleted habit",
            log.habit?.category || "-",
            new Date(log.completedAt).toLocaleDateString(),
          ])}
          title="Recent Completions"
        />
      </div>
    </div>
  );
};

const AdminStat = ({ label, value, icon, color }) => (
  <div className="hover-lift rounded-xl border border-border-neutral bg-card-surface p-md shadow-[0_4px_12px_rgba(15,23,42,0.05)]">
    <div className="mb-sm flex items-start justify-between">
      <p className="font-medium text-text-secondary">{label}</p>
      <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-current/10 ${color}`}><MaterialIcon name={icon} className="text-[18px]" /></div>
    </div>
    <p className="font-page-heading text-page-heading-mobile font-bold">{value}</p>
  </div>
);

const ActivityTable = ({ title, columns, rows }) => (
  <section className="overflow-hidden rounded-xl border border-border-neutral bg-card-surface shadow-[0_4px_12px_rgba(15,23,42,0.05)]">
    <div className="border-b border-border-neutral bg-surface-container-lowest p-md lg:p-lg">
      <h2 className="text-card-heading font-semibold">{title}</h2>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-border-neutral bg-app-bg text-label-sm font-medium text-text-secondary">
            {columns.map((column) => <th className="p-md" key={column}>{column}</th>)}
          </tr>
        </thead>
        <tbody className="text-body-md text-text-primary">
          {rows.length === 0 ? (
            <tr><td className="p-md text-text-secondary" colSpan={columns.length}>No recent activity yet.</td></tr>
          ) : rows.map((row, index) => (
            <tr key={index} className="border-b border-border-neutral transition-colors hover:bg-surface-container-low">
              {row.map((cell, cellIndex) => <td className="p-md" key={cellIndex}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default AdminDashboard;
