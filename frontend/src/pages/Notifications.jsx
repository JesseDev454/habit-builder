import { useEffect, useState } from "react";
import { Bell, CheckCircle2, Flame, Medal, TrendingUp, Trophy } from "lucide-react";
import toast from "react-hot-toast";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import LoadingSkeleton from "../components/common/LoadingSkeleton";
import { getNotifications, markAllNotificationsRead, markNotificationRead } from "../api/notificationApi";

const iconMap = {
  badge: Medal,
  streak: Flame,
  level: TrendingUp,
  habit: CheckCircle2,
  challenge: Trophy,
  system: Bell,
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const data = await getNotifications();
      setNotifications(data.notifications || []);
    } catch (error) {
      toast.error(error.message || "Could not load notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleRead = async (id) => {
    try {
      const data = await markNotificationRead(id);
      setNotifications((current) => current.map((item) => (item._id === id ? data.notification : item)));
    } catch (error) {
      toast.error(error.message || "Could not update notification.");
    }
  };

  const handleReadAll = async () => {
    try {
      await markAllNotificationsRead();
      setNotifications((current) => current.map((item) => ({ ...item, isRead: true })));
      toast.success("Notifications marked as read");
    } catch (error) {
      toast.error(error.message || "Could not update notifications.");
    }
  };

  if (loading) return <LoadingSkeleton count={5} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-extrabold">Notifications</h1>
          <p className="mt-2 text-[var(--color-secondary)]">Stay up to date with badge unlocks, level ups, and challenge progress.</p>
        </div>
        {notifications.some((item) => !item.isRead) ? <Button onClick={handleReadAll} variant="secondary">Mark all read</Button> : null}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          message="When you unlock badges, level up, or join challenges, updates will appear here."
          title="No notifications yet"
        />
      ) : (
        <Card className="divide-y divide-[var(--color-border)] p-0">
          {notifications.map((notification) => {
            const Icon = iconMap[notification.type] || Bell;
            return (
              <div key={notification._id} className={`flex gap-4 p-5 ${notification.isRead ? "bg-white" : "bg-primary/5"}`}>
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${notification.isRead ? "bg-slate-100 text-[var(--color-muted)]" : "bg-[#eeeafe] text-[var(--color-primary)]"}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-lg font-bold">{notification.title}</h3>
                    {!notification.isRead && <Badge tone="purple">New</Badge>}
                  </div>
                  <p className="mt-1 text-sm text-[var(--color-secondary)]">{notification.message}</p>
                  <p className="mt-2 text-xs font-bold text-[var(--color-muted)]">{new Date(notification.createdAt).toLocaleString()}</p>
                </div>
                {!notification.isRead ? (
                  <button className="self-start text-xs font-bold text-primary hover:underline" onClick={() => handleRead(notification._id)} type="button">
                    Mark read
                  </button>
                ) : null}
              </div>
            );
          })}
        </Card>
      )}
    </div>
  );
};

export default Notifications;
