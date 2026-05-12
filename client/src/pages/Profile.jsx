import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MaterialIcon from "../components/common/MaterialIcon";
import { StitchBottomNav, StitchSidebar } from "../components/stitch/StitchNav";
import { getAnalyticsSummary } from "../api/analyticsApi";
import { mockStats } from "../data/mockStats";
import { FALLBACK_USER, getLevelProgress } from "../utils/stitch";
import useAuth from "../hooks/useAuth";
import useHabits from "../hooks/useHabits";

const mobileAvatar =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC9vVRzY1z1fLl0VYIxvhhE1UTJY4hU6XlpXkyNVDRj9rZULdPluIOpqR_T6hpFeeXQEXJ7Lq_vU9kXHu4anGFwBphGtyJnbuLt45-a4tjyksr5esqtupKZO7BaYkVXHOpRYzbkSkrEfBlGN1aCoPkwVkT7yqOl-BsaVKuhkfkszatr6GdpRsqw_5vKhMFjvHyfefk8QZieRG-Ybgv7E8WIQGRGdTJH6clsf9lqO3LI8di2R0_GnXzuWlH0abZuP0YIEGLcXaQ82mMI";
const heroAvatar =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCVws6qsFdwlHWywrl1o9SDEYkx2BF8Y0EXU4WUGN6VJXtRo1bvOkxVpLWxJBWuG7cDrnuXsQO4Ynt-WAZ9FwsyAz5EPShgJCRSvhxREeiWlbF_SChWusdk019JIzAV_nTGeydzfuKgDxEWhzqYdb_26CnIrB0DrsalKr6uNyhi4CiZe3b08wwgbhRjXKpKYex47NKoSCXNeQgI2sliNecUsUHHejYWoEG6gcctOEN4_upBJHt9z0if8sWuXFnKsPv7utpLTzT1e7lx";

const badgeToneClasses = {
  "secondary-fixed": "bg-secondary-fixed",
  "tertiary-fixed": "bg-tertiary-fixed",
  "primary-fixed": "bg-primary-fixed",
};

const badgeTextClasses = {
  "on-secondary-fixed": "text-on-secondary-fixed",
  "on-tertiary-fixed": "text-on-tertiary-fixed",
  "on-primary-fixed": "text-on-primary-fixed",
};

const statDecorClasses = {
  "Total XP": "text-primary/5 group-hover:text-primary/10",
  "Best Streak": "text-secondary/5 group-hover:text-secondary/10",
  "Total Habits": "text-tertiary/5 group-hover:text-tertiary/10",
  Completions: "text-primary-fixed-dim/20 group-hover:text-primary-fixed-dim/30",
};

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { habits } = useHabits({ autoFetch: true });
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    getAnalyticsSummary()
      .then((data) => setSummary(data.summary))
      .catch(() => setSummary(null));
  }, []);

  const safeUser = user || FALLBACK_USER;
  const levelProgress = getLevelProgress(safeUser.totalXP || mockStats.user.totalXP);
  const totalHabits = summary?.totalHabits ?? habits.length ?? 8;
  const totalCompletions = summary?.totalCompletions ?? 142;
  const bestStreak = summary?.longestStreak ?? Math.max(...habits.map((habit) => habit.longestStreak || 0), mockStats.user.longestStreak);

  const statCards = useMemo(
    () => [
      { label: "Total XP", value: safeUser.totalXP || 3450, icon: "military_tech", tone: "text-primary" },
      { label: "Best Streak", value: `${bestStreak}`, helper: "days", icon: "local_fire_department", tone: "text-secondary" },
      { label: "Total Habits", value: `${totalHabits}`, icon: "task_alt", tone: "text-tertiary" },
      { label: "Completions", value: `${totalCompletions}`, icon: "done_all", tone: "text-on-surface" },
    ],
    [bestStreak, safeUser.totalXP, totalCompletions, totalHabits]
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background text-on-background">
      <div className="flex min-h-screen flex-col md:flex-row">
        <StitchSidebar activeKey="profile" brandVariant="text" />

        <header className="sticky top-0 z-40 mx-auto flex h-16 w-full max-w-container_max_width items-center justify-between bg-surface/90 px-margin_mobile shadow-sm backdrop-blur-md md:hidden">
          <h1 className="text-headline-lg-mobile font-black text-primary">HabitQuest</h1>
          <div className="flex gap-4">
            <MaterialIcon className="cursor-pointer text-on-surface-variant transition-colors hover:text-primary" name="notifications" />
            <MaterialIcon className="cursor-pointer text-on-surface-variant transition-colors hover:text-primary" name="history_edu" />
            <img alt="Hero Avatar" className="h-8 w-8 rounded-full border-2 border-primary object-cover" src={mobileAvatar} />
          </div>
        </header>

        <main className="mx-auto mb-20 w-full max-w-container_max_width flex-1 p-margin_mobile md:ml-[280px] md:mb-0 md:p-margin_desktop">
          <section className="group relative mb-8 flex flex-col items-center gap-8 overflow-hidden rounded-xl bg-surface-container-lowest p-8 shadow-[0px_4px_20px_rgba(15,23,42,0.05)] transition-all duration-300 hover:shadow-[0px_8px_30px_rgba(15,23,42,0.1)] md:flex-row">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary/5 blur-2xl" />
            <div className="relative">
              <img alt={`${safeUser.name || "Jesse"}'s Avatar`} className="relative z-10 h-32 w-32 rounded-full border-4 border-surface-container-lowest object-cover shadow-md" src={heroAvatar} />
              <div className="absolute -bottom-2 -right-2 z-20 flex items-center gap-1 rounded-full border-2 border-surface-container-lowest bg-tertiary-fixed px-3 py-1 text-badge-xs text-on-tertiary-fixed shadow-sm">
                <MaterialIcon className="text-[14px]" fill name="star" />
                Lvl {safeUser.level || levelProgress.level}
              </div>
            </div>
            <div className="z-10 flex-1 text-center md:text-left">
              <h2 className="mb-1 text-headline-lg text-on-surface">{safeUser.name || "Jesse"}</h2>
              <p className="mb-4 text-body-base text-on-surface-variant">{safeUser.email || FALLBACK_USER.email}</p>
              <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
                <div className="relative h-2 rounded-full bg-primary" style={{ width: `${Math.max(levelProgress.progressPercent, 33)}%` }}>
                  <div className="absolute inset-0 w-full animate-pulse bg-white/20" />
                </div>
              </div>
              <p className="text-right text-label-sm text-outline">
                {levelProgress.progressValue} / {levelProgress.progressMax} XP to Level {(safeUser.level || levelProgress.level) + 1}
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
              {mockStats.recentBadges.map((badge) => (
                <div className="flex cursor-pointer flex-col items-center rounded-xl border border-transparent bg-surface-container p-4 text-center transition-colors hover:border-outline-variant/50 hover:bg-surface-container-high" key={badge.id}>
                  <div className={`mb-3 flex h-16 w-16 items-center justify-center rounded-full shadow-inner ${badgeToneClasses[badge.tone]}`}>
                    <MaterialIcon className={`text-[32px] ${badgeTextClasses[badge.textTone]}`} name={badge.icon} />
                  </div>
                  <h4 className="mb-1 text-label-sm text-on-surface">{badge.title}</h4>
                  <p className="text-[13px] text-on-surface-variant">{badge.description}</p>
                </div>
              ))}
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

      <StitchBottomNav activeKey="profile" />
    </div>
  );
};

export default Profile;
