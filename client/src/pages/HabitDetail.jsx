import { useEffect, useState } from "react";
import { CalendarCheck2, Code2, Flame, Trophy } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import ConfirmationModal from "../components/common/ConfirmationModal";
import EmptyState from "../components/common/EmptyState";
import LoadingSkeleton from "../components/common/LoadingSkeleton";
import StatCard from "../components/common/StatCard";
import Heatmap from "../components/analytics/Heatmap";
import WeeklyChart from "../components/analytics/WeeklyChart";
import { archiveHabit, getHabitById, getHabitLogs } from "../api/habitApi";
import { getHabitStats } from "../api/analyticsApi";

const xpByDifficulty = {
  easy: 10,
  medium: 20,
  hard: 30,
};

const formatTarget = (habit) => {
  if (habit.targetType === "count") return `${habit.targetValue} times`;
  return habit.targetValue > 1 ? `${habit.targetValue} completions` : "1 completion";
};

const HabitDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [habit, setHabit] = useState(null);
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [archiving, setArchiving] = useState(false);

  useEffect(() => {
    const loadHabit = async () => {
      try {
        setLoading(true);
        const [habitData, logData, statsData] = await Promise.all([getHabitById(id), getHabitLogs(id), getHabitStats(id)]);
        setHabit(habitData.habit);
        setLogs(logData.logs || []);
        setStats(statsData.stats);
      } catch (error) {
        toast.error(error.message || "Could not load habit.");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadHabit();
  }, [id, navigate]);

  const handleArchive = async () => {
    try {
      setArchiving(true);
      await archiveHabit(id);
      toast.success("Habit archived");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Could not archive habit.");
    } finally {
      setArchiving(false);
      setShowArchiveModal(false);
    }
  };

  if (loading) {
    return <LoadingSkeleton count={3} />;
  }

  if (!habit) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-[var(--color-primary)]">Habit detail</p>
          <h1 className="font-display text-4xl font-extrabold">{habit.name}</h1>
          <p className="mt-2 text-[var(--color-secondary)]">{habit.category} | {habit.difficulty} | Target: {formatTarget(habit)}</p>
          {habit.description ? <p className="mt-2 max-w-2xl text-sm text-[var(--color-secondary)]">{habit.description}</p> : null}
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to={`/habits/${habit._id}/edit`}><Button>Edit habit</Button></Link>
          <Button onClick={() => setShowArchiveModal(true)} variant="outline">Archive</Button>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        <StatCard icon={Code2} label="XP reward" value={`+${xpByDifficulty[habit.difficulty] || 10}`} helper="Per completion" accent="var(--color-xp)" />
        <StatCard icon={Flame} label="Current streak" value={stats?.currentStreak ?? habit.currentStreak ?? 0} helper="Days" accent="var(--color-streak)" />
        <StatCard icon={Trophy} label="Best streak" value={stats?.longestStreak ?? habit.longestStreak ?? 0} helper="Personal best" accent="var(--color-primary)" />
        <StatCard icon={CalendarCheck2} label="Completions" value={stats?.totalCompletions ?? habit.totalCompletions ?? logs.length} helper={`${stats?.completionsThisWeek ?? 0} this week`} accent="var(--color-success)" />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <Card>
          <h2 className="font-display text-xl font-extrabold">Completion trend</h2>
          <p className="mt-1 text-sm text-[var(--color-secondary)]">Chart visuals remain static until the analytics sprint.</p>
          <WeeklyChart />
        </Card>
        <Card>
          <div className="mb-4 flex items-center gap-2">
            <CalendarCheck2 className="h-5 w-5 text-[var(--color-success)]" />
            <h2 className="font-display text-xl font-extrabold">Consistency heatmap</h2>
          </div>
          <Heatmap />
        </Card>
      </div>

      <Card>
        <h2 className="font-display text-xl font-extrabold">Recent completion history</h2>
        {logs.length === 0 ? (
          <EmptyState action={null} message="Complete this habit to start building your progress history." title="No completions yet" />
        ) : (
          <div className="mt-4 divide-y divide-[var(--color-border)]">
            {logs.slice(0, 8).map((log) => (
              <div key={log._id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-semibold text-[var(--color-text)]">{new Date(log.completedAt).toLocaleDateString()}</p>
                  <p className="text-xs text-[var(--color-secondary)]">
                    {log.dateKey} | +{log.xpEarned || 0} XP | Streak: {log.streakAfterCompletion || 0}
                  </p>
                </div>
                <span className="rounded-full bg-success-green/10 px-3 py-1 text-xs font-bold text-success-green">Completed</span>
              </div>
            ))}
          </div>
        )}
      </Card>

      <ConfirmationModal
        confirmLabel="Archive Habit"
        isOpen={showArchiveModal}
        loading={archiving}
        message="This habit will be hidden from your active dashboard. Your completion history will stay saved."
        onCancel={() => setShowArchiveModal(false)}
        onConfirm={handleArchive}
        title="Archive habit?"
      />
    </div>
  );
};

export default HabitDetail;
