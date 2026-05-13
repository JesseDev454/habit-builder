import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MaterialIcon from "../components/common/MaterialIcon";
import StitchTopBar from "../components/stitch/StitchTopBar";
import { StitchBottomNav, StitchSidebar } from "../components/stitch/StitchNav";
import { getDashboardAnalytics } from "../api/analyticsApi";
import { getMyBadges } from "../api/badgeApi";
import useAppAvatar from "../hooks/useAppAvatar";
import useAuth from "../hooks/useAuth";
import { getBadgeIconName, getBadgeTone } from "../utils/stitch";

const statDecorClasses = {
  "Total XP": "text-primary/5 group-hover:text-primary/10",
  "Best Streak": "text-secondary/5 group-hover:text-secondary/10",
  "Total Habits": "text-tertiary/5 group-hover:text-tertiary/10",
  Completions: "text-primary-fixed-dim/20 group-hover:text-primary-fixed-dim/30",
};

const Profile = () => {
  const navigate = useNavigate();
  const avatarSrc = useAppAvatar();
  const { user, logout, updateUser } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [badges, setBadges] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getDashboardAnalytics(), getMyBadges()])
      .then(([dashboardData, badgeData]) => {
        setDashboard(dashboardData);
        setBadges(badgeData.badges || []);
        updateUser(dashboardData.user);
        setError("");
      })
      .catch((loadError) => {
        setDashboard(null);
        setBadges([]);
        setError(loadError.message || "Could not load profile data.");
      });
  }, [updateUser]);

  const safeUser = dashboard?.user || user;
  const levelProgress = dashboard?.levelProgress;
  const stats = dashboard?.stats;
  const recentBadges = badges.slice(0, 3);
  const progressMax = Math.max(
    (levelProgress?.nextLevelXp || 0) - (levelProgress?.currentLevelXp || 0),
    1
  );

  const statCards = useMemo(
    () => [
      { label: "Total XP", value: safeUser?.totalXP ?? 0, icon: "military_tech", tone: "text-primary" },
      { label: "Best Streak", value: `${stats?.bestStreak ?? 0}`, helper: "days", icon: "local_fire_department", tone: "text-secondary" },
      { label: "Total Habits", value: `${stats?.totalHabits ?? 0}`, icon: "task_alt", tone: "text-tertiary" },
      { label: "Completions", value: `${stats?.totalCompletions ?? 0}`, icon: "done_all", tone: "text-on-surface" },
    ],
    [safeUser?.totalXP, stats?.bestStreak, stats?.totalCompletions, stats?.totalHabits]
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background text-on-background">
      <div className="flex min-h-screen flex-col md:flex-row">
        <StitchSidebar activeKey="profile" brandVariant="text" />

        <div className="flex min-h-screen flex-1 flex-col md:ml-[280px]">
          <StitchTopBar />

          <main className="mx-auto mb-20 w-full max-w-container_max_width flex-1 p-margin_mobile md:mb-0 md:p-margin_desktop">
            {error ? (
              <div className="mb-6 rounded-xl border border-error-container bg-surface-container-lowest p-4 text-body-base text-error">
                {error}
              </div>
            ) : null}

            <section className="group relative mb-8 flex flex-col items-center gap-8 overflow-hidden rounded-xl bg-surface-container-lowest p-8 shadow-[0px_4px_20px_rgba(15,23,42,0.05)] transition-all duration-300 hover:shadow-[0px_8px_30px_rgba(15,23,42,0.1)] md:flex-row">
              <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary/5 blur-2xl" />
              <div className="relative">
                <img alt={`${safeUser?.name || "Hero"}'s Avatar`} className="relative z-10 h-32 w-32 rounded-full border-4 border-surface-container-lowest object-cover shadow-md" src={avatarSrc} />
                <div className="absolute -bottom-2 -right-2 z-20 flex items-center gap-1 rounded-full border-2 border-surface-container-lowest bg-tertiary-fixed px-3 py-1 text-badge-xs text-on-tertiary-fixed shadow-sm">
                  <MaterialIcon className="text-[14px]" fill name="star" />
                  Lvl {safeUser?.level ?? 1}
                </div>
              </div>
              <div className="z-10 flex-1 text-center md:text-left">
                <h2 className="mb-1 text-headline-lg text-on-surface">{safeUser?.name || "Hero"}</h2>
                <p className="mb-4 text-body-base text-on-surface-variant">{safeUser?.email || ""}</p>
                <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
                  <div className="relative h-2 rounded-full bg-primary" style={{ width: `${Math.max(levelProgress?.progressPercent ?? 0, 0)}%` }}>
                    <div className="absolute inset-0 w-full animate-pulse bg-white/20" />
                  </div>
                </div>
                <p className="text-right text-label-sm text-outline">
                  {levelProgress?.xpIntoLevel ?? 0} / {progressMax} XP to Level {(safeUser?.level ?? 1) + 1}
                </p>
              </div>
              <button className="z-10 hidden items-center gap-2 rounded-xl border border-outline-variant px-6 py-3 text-label-sm text-error transition-colors hover:border-error-container hover:bg-error-container md:flex" onClick={handleLogout} type="button">
                <MaterialIcon name="logout" />
                Logout
              </button>
            </section>

            <section className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-gutter">
              {statCards.map((card) => (
                <div className="group relative overflow-hidden rounded-xl bg-surface-container-lowest p-6 shadow-[0px_4px_20px_rgba(15,23,42,0.05)] transition-transform hover:scale-[1.02]" key={card.label}>
                  <MaterialIcon className={`absolute -bottom-4 -right-4 text-[80px] transition-colors ${statDecorClasses[card.label]}`} name={card.icon} />
                  <p className="relative z-10 mb-2 text-label-sm text-on-surface-variant">{card.label}</p>
                  <p className={`relative z-10 text-display-xl ${card.tone}`}>
                    {card.value}
                    {card.helper ? <span className="ml-1 text-xl text-outline">{card.helper}</span> : null}
                  </p>
                </div>
              ))}
            </section>

            <section className="rounded-xl bg-surface-container-lowest p-8 shadow-[0px_4px_20px_rgba(15,23,42,0.05)]">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-title-md text-on-surface">Recent Badges</h3>
                <button className="flex items-center gap-1 text-label-sm text-primary transition-colors hover:text-primary-container" onClick={() => navigate("/achievements")} type="button">
                  View All
                  <MaterialIcon className="text-[18px]" name="chevron_right" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {recentBadges.length === 0 ? (
                  <div className="md:col-span-3 text-body-base text-on-surface-variant">Complete habits to start unlocking badges.</div>
                ) : (
                  recentBadges.map((badge) => {
                    const tone = getBadgeTone(badge.name);
                    return (
                      <div className="flex cursor-pointer flex-col items-center rounded-xl border border-transparent bg-surface-container p-4 text-center transition-colors hover:border-outline-variant/50 hover:bg-surface-container-high" key={badge._id}>
                        <div className={`mb-3 flex h-16 w-16 items-center justify-center rounded-full shadow-inner ${tone.bgClass}`}>
                          <MaterialIcon className={`text-[32px] ${tone.textClass}`} name={getBadgeIconName(badge.name)} />
                        </div>
                        <h4 className="mb-1 text-label-sm text-on-surface">{badge.name}</h4>
                        <p className="text-[13px] text-on-surface-variant">{badge.description}</p>
                      </div>
                    );
                  })
                )}
              </div>
            </section>

            <div className="mt-8 md:hidden">
              <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest px-6 py-4 text-label-sm text-error shadow-sm transition-colors hover:border-error-container hover:bg-error-container" onClick={handleLogout} type="button">
                <MaterialIcon name="logout" />
                Logout
              </button>
            </div>
          </main>
        </div>
      </div>

      <StitchBottomNav activeKey="profile" />
    </div>
  );
};

export default Profile;
