import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import MaterialIcon from "../components/common/MaterialIcon";
import StitchCompletionOverlay from "../components/stitch/StitchCompletionOverlay";
import { StitchBottomNav, StitchFooter, StitchSidebar } from "../components/stitch/StitchNav";
import { getAnalyticsSummary, getWeeklyAnalytics } from "../api/analyticsApi";
import { mockHabits } from "../data/mockHabits";
import { mockStats } from "../data/mockStats";
import useAuth from "../hooks/useAuth";
import useHabits from "../hooks/useHabits";
import { FALLBACK_USER, formatWeeklyCompletionBars, getDifficultyXp, getHabitIcon, getLevelProgress } from "../utils/stitch";

const mobileAvatar =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCrxGlLbyt5tGxzM2rSp1rAzpSJG8G447Pu5Kuz9LvmkuXr5TwhbGwJWmPrm-bM23whE8cTDqHSj48i7og3dn7DU2wYCzGMwsfY95NcRN1MRbc7_wAEJsxjNG1gkAYl6d6n0KRavW_Z4QObEkmawAtpibYqE3YV3GZgA0OTKAgCtlzKuZLkOBx5Vodqsn5XPpNMgNvr-GlQbFE0nM4WFhqVh-OgcyMZ_jF7eVLpEGaN_f8kl4pJzrn3kbAQaV83wnXEqcFBy7pwDpJ1";
const desktopAvatar =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCv4ugk_G95eEwaEV4_8BP66NZr0cuvImbDtpF1OBcItmX3O3UkQjNh6SUgjHUpFBxnpf1w9KWJ32oDMSnCni393Jf9Ys6BPk5BfZSjB2TAoszINNHpa_9R_dPv7yUo8k9Q1-Cd4GFlkmVOgUmeOEr8swDlEdVNwwHcaWKY_vgI6ctGnZvrGGLkrSn7NC0SGEt_yhTW2jyAB5qVRscTJGe364ZjY2SEdBk9eJsKYxZXzXe_iOXA_hStcT3_js93oQ78BLp2fe_0zJ2m";

const statDecorClass = {
  "Total XP": "text-primary/20",
  "Current Level": "text-secondary/20",
  "Best Streak": "text-tertiary/20",
  "Today's Progress": "text-primary-fixed-dim/20",
};

const statIconClass = {
  "Total XP": "text-primary",
  "Current Level": "text-secondary",
  "Best Streak": "text-tertiary",
  "Today's Progress": "text-primary-fixed-dim",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { habits, loading, markHabitComplete, completedToday, totalToday } = useHabits({ today: true });
  const [summary, setSummary] = useState(null);
  const [weekly, setWeekly] = useState([]);
  const [overlayRewards, setOverlayRewards] = useState(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const [summaryData, weeklyData] = await Promise.all([getAnalyticsSummary(), getWeeklyAnalytics()]);
        setSummary(summaryData.summary);
        setWeekly(weeklyData.weekly || []);
      } catch {
        setSummary(null);
        setWeekly([]);
      }
    };

    loadAnalytics();
  }, []);

  const safeUser = user || FALLBACK_USER;
  const displayHabits = habits.length ? habits : mockHabits.map((habit) => ({
    _id: String(habit.id),
    name: habit.name,
    category: habit.apiCategory,
    difficulty: habit.difficulty,
    currentStreak: habit.streak,
    completedToday: habit.completedToday,
    description: habit.description,
  }));
  const topHabits = displayHabits.slice(0, 3);
  const levelProgress = getLevelProgress(safeUser.totalXP || mockStats.user.totalXP);
  const weeklyBars = formatWeeklyCompletionBars(weekly);
  const displayCompletedToday = totalToday ? completedToday : Number(mockStats.user.todaysProgress.split("/")[0]);
  const displayTotalToday = totalToday || Number(mockStats.user.todaysProgress.split("/")[1]);
  const todayPercent = displayTotalToday ? Math.round((displayCompletedToday / displayTotalToday) * 100) : mockStats.user.todaysPercent;
  const bestStreak = summary?.longestStreak ?? Math.max(...displayHabits.map((habit) => habit.currentStreak || 0), mockStats.user.bestStreak);

  const greetingName = safeUser.name || FALLBACK_USER.name;

  const recentBadges = mockStats.recentBadges;

  const desktopStats = useMemo(
    () => [
      { label: "Total XP", value: safeUser.totalXP || mockStats.user.totalXP, icon: "workspace_premium" },
      { label: "Current Level", value: safeUser.level || levelProgress.level, icon: "shield" },
      { label: "Best Streak", value: `${bestStreak} days`, icon: "local_fire_department" },
      { label: "Today's Progress", value: `${displayCompletedToday}/${displayTotalToday}`, icon: "donut_large" },
    ],
    [bestStreak, displayCompletedToday, displayTotalToday, levelProgress.level, safeUser.level, safeUser.totalXP]
  );

  const handleComplete = async (habitId) => {
    if (!habits.length) return;

    try {
      const data = await markHabitComplete(habitId);
      if (data?.user) updateUser(data.user);
      setOverlayRewards(data?.rewards || { xpEarned: getDifficultyXp(data?.habit?.difficulty) });
    } catch (error) {
      toast.error(error.message || "Could not complete habit.");
    }
  };

  const goToHabit = (habitId) => {
    if (!habitId || habitId.startsWith("fallback-")) return;
    navigate(`/habits/${habitId}`);
  };

  return (
    <div className="min-h-screen bg-background text-on-background">
      <div className="md:hidden">
        <header className="sticky top-0 z-40 bg-surface/90 shadow-sm backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-container_max_width items-center justify-between px-margin_mobile">
            <h1 className="text-headline-lg-mobile font-black text-primary">HabitQuest</h1>
            <div className="flex items-center gap-4">
              <MaterialIcon className="cursor-pointer text-on-surface-variant transition-colors hover:text-primary" name="notifications" />
              <MaterialIcon className="cursor-pointer text-on-surface-variant transition-colors hover:text-primary" name="history_edu" />
              <img alt="Hero Avatar" className="h-8 w-8 rounded-full border-2 border-primary-container object-cover" src={mobileAvatar} />
            </div>
          </div>
        </header>

        <main className="flex flex-col gap-6 p-margin_mobile pb-28">
          <section className="flex flex-col gap-2">
            <h2 className="text-headline-lg text-on-background">Welcome back, {greetingName}!</h2>
            <p className="text-body-base text-on-surface-variant">Ready to complete your daily quests?</p>
          </section>

          <section className="flex flex-col gap-4">
            <div className="relative flex flex-col gap-4 overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-6 shadow-[0px_4px_20px_rgba(15,23,42,0.05)]">
              <MaterialIcon className="pointer-events-none absolute -bottom-4 -right-4 text-[120px] text-primary-fixed/20" fill name="workspace_premium" />
              <div className="z-10 flex items-start justify-between">
                <div>
                  <span className="mb-1 block text-label-sm uppercase tracking-widest text-on-surface-variant">Current Level</span>
                  <h3 className="text-display-xl text-primary">Lvl {safeUser.level || levelProgress.level}</h3>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-tertiary-fixed px-3 py-1 text-badge-xs text-tertiary">
                  <MaterialIcon className="text-[14px]" fill name="local_fire_department" />
                  {summary?.bestCurrentStreak || bestStreak} Day Streak
                </div>
              </div>
              <div className="z-10 mt-2">
                <div className="mb-2 flex justify-between text-label-sm text-on-surface-variant">
                  <span>XP Progress</span>
                  <span>
                    {levelProgress.progressValue} / {levelProgress.progressMax} XP
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-surface-container-high">
                  <div className="h-full rounded-full bg-primary-container" style={{ width: `${Math.max(levelProgress.progressPercent, 12)}%` }} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-[0px_4px_20px_rgba(15,23,42,0.05)]">
                <span className="block w-full text-center text-label-sm text-on-surface-variant">Daily Quests</span>
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-surface-container-high">
                  <div className="absolute inset-0 rotate-45 rounded-full border-4 border-primary border-r-transparent border-t-transparent" />
                  <div className="flex flex-col items-center">
                    <span className="text-title-md font-bold text-primary">{displayCompletedToday}/{displayTotalToday}</span>
                  </div>
                </div>
                <span className="rounded-full bg-primary-fixed/50 px-2 py-1 text-badge-xs text-primary">{todayPercent}% Done</span>
              </div>

              <div className="flex flex-col justify-between gap-2 rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-[0px_4px_20px_rgba(15,23,42,0.05)]">
                <span className="text-label-sm text-on-surface-variant">Total Gold</span>
                <div className="flex items-center gap-2">
                  <MaterialIcon className="text-[28px] text-tertiary-container" fill name="monetization_on" />
                  <span className="text-[32px] font-bold text-on-background">{safeUser.coins || 420}</span>
                </div>
                <button className="mt-auto w-full rounded-lg bg-surface-container-highest py-2 text-label-sm text-primary transition-transform active:scale-95" type="button">
                  Shop
                </button>
              </div>
            </div>
          </section>

          <section className="mt-2 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-title-md text-on-background">Active Quests</h3>
              <button className="text-label-sm text-primary" onClick={() => navigate("/daily-habits")} type="button">
                See All
              </button>
            </div>

            {topHabits.map((habit) => {
              const done = Boolean(habit.completedToday);
              return (
                <div
                  className={`flex items-center gap-4 rounded-xl border p-4 shadow-[0px_4px_20px_rgba(15,23,42,0.05)] ${done ? "border-outline-variant/30 bg-surface-container-lowest opacity-70" : "bg-surface-container-lowest"} transition-transform active:scale-[0.98]`}
                  key={habit._id}
                  onClick={() => goToHabit(habit._id)}
                  role="button"
                  tabIndex={0}
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${done ? "bg-secondary-fixed text-secondary" : "bg-primary-fixed text-primary"}`}>
                    <MaterialIcon name={getHabitIcon(habit.category)} />
                  </div>
                  <div className="flex-grow">
                    <h4 className={`text-[16px] ${done ? "line-through text-on-surface-variant" : "text-on-background"}`}>{habit.name}</h4>
                    <p className="text-[14px] text-on-surface-variant">{habit.description || habit.category}</p>
                  </div>
                  <button
                    className={
                      done
                        ? "h-12 w-12 shrink-0 rounded-full bg-primary text-on-primary shadow-md"
                        : "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary-container bg-surface text-primary-container transition-colors active:bg-primary-container active:text-on-primary-container"
                    }
                    onClick={(event) => {
                      event.stopPropagation();
                      if (!done) handleComplete(habit._id);
                    }}
                    type="button"
                  >
                    {done ? <MaterialIcon className="text-[24px]" fill name="check" /> : <div className="h-4 w-4 rounded-full border border-primary/50" />}
                  </button>
                </div>
              );
            })}
          </section>
        </main>

        <StitchBottomNav activeKey="home" />
      </div>

      <div className="hidden md:block">
        <div className="flex min-h-screen flex-col md:flex-row">
          <StitchSidebar activeKey="dashboard" avatarSrc={desktopAvatar} brandVariant="circle" />

          <div className="flex min-h-screen min-w-0 flex-1 flex-col pb-24 md:ml-[280px] md:pb-0">
            <header className="sticky top-0 z-40 bg-surface/90 shadow-sm backdrop-blur-md">
              <div className="mx-auto flex h-16 max-w-container_max_width items-center justify-between px-margin_mobile md:px-margin_desktop">
                <div className="hidden max-w-[28rem] flex-1 items-center md:flex">
                  <div className="relative w-full">
                    <MaterialIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant" name="search" />
                    <input className="w-full rounded-full border border-surface-container-high bg-surface-container-lowest py-2 pl-10 pr-4 text-label-sm shadow-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="Search quests, habits..." type="text" />
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-4">
                  <button className="relative cursor-pointer rounded-full p-2 text-on-surface-variant transition-colors duration-150 hover:bg-surface-container-highest hover:text-primary" type="button">
                    <MaterialIcon name="notifications" />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-error" />
                  </button>
                  <button className="hidden cursor-pointer rounded-full p-2 text-on-surface-variant transition-colors duration-150 hover:bg-surface-container-highest hover:text-primary sm:block" type="button">
                    <MaterialIcon name="history_edu" />
                  </button>
                  <div className="overflow-hidden rounded-full border border-outline-variant sm:hidden">
                    <img alt="Hero Avatar" className="h-8 w-8 object-cover" src={desktopAvatar} />
                  </div>
                </div>
              </div>
            </header>

            <main className="mx-auto flex w-full max-w-container_max_width flex-1 flex-col overflow-y-auto p-margin_mobile md:p-margin_desktop">
              <section className="mb-8">
                <h2 className="mb-2 text-display-xl text-on-background">Welcome back, {greetingName}.</h2>
                <p className="text-title-md text-on-surface-variant">Ready to keep your streak alive today?</p>
              </section>

              <section className="mb-gutter grid grid-cols-2 gap-4 md:gap-gutter lg:grid-cols-4">
                {desktopStats.map((stat) => (
                  <div className="group relative overflow-hidden rounded-xl bg-surface-container-lowest p-5 shadow-[0px_4px_20px_rgba(15,23,42,0.05)] transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg" key={stat.label}>
                    <MaterialIcon className={`pointer-events-none absolute -bottom-4 -right-4 text-[80px] ${statDecorClass[stat.label]} transition-transform duration-300 group-hover:scale-110`} fill name={stat.icon} />
                    <div className="mb-3 flex items-center gap-2 text-on-surface-variant">
                      <MaterialIcon className={`text-sm ${statIconClass[stat.label]}`} fill name={stat.icon === "shield" ? "trending_up" : stat.icon === "workspace_premium" ? "stars" : stat.icon === "donut_large" ? "checklist" : stat.icon} />
                      <h3 className="text-label-sm uppercase tracking-wider">{stat.label}</h3>
                    </div>
                    <div className="text-headline-lg text-on-background">{stat.value}</div>
                    {stat.label === "Today's Progress" ? (
                      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-container">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${todayPercent}%` }} />
                      </div>
                    ) : null}
                  </div>
                ))}
              </section>

              <div className="mb-gutter grid grid-cols-1 gap-gutter lg:grid-cols-12">
                <div className="space-y-4 lg:col-span-8">
                  <div className="mb-4 flex items-end justify-between">
                    <h3 className="text-title-md font-bold text-on-background">Today&apos;s Quests</h3>
                    <button className="text-label-sm text-primary hover:underline" onClick={() => navigate("/daily-habits")} type="button">
                      View All
                    </button>
                  </div>

                  {topHabits.map((habit) => {
                    const done = Boolean(habit.completedToday);
                    const xp = getDifficultyXp(habit.difficulty);
                    return (
                      <div
                        className={`flex items-center justify-between rounded-xl border border-transparent bg-surface-container-lowest p-4 shadow-[0px_4px_20px_rgba(15,23,42,0.05)] transition-all ${done ? "opacity-80" : "hover:scale-[1.01] hover:border-primary/20 hover:shadow-md"}`}
                        key={habit._id}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${done ? "bg-surface-container text-primary" : habit.category === "Water Intake" ? "bg-secondary-container/30 text-secondary" : "bg-surface-variant text-on-surface-variant"}`}>
                            <MaterialIcon fill name={getHabitIcon(habit.category)} />
                          </div>
                          <div>
                            <h4 className={`text-title-md ${done ? "line-through opacity-70" : ""}`}>{habit.name}</h4>
                            <div className="mt-1 flex items-center gap-3">
                              <span className={`rounded-full px-2 py-0.5 text-badge-xs ${done ? "bg-tertiary-fixed text-on-tertiary-fixed opacity-70" : "bg-tertiary-fixed text-on-tertiary-fixed"}`}>+{xp} XP</span>
                              {habit.currentStreak ? (
                                <span className={`flex items-center gap-1 text-label-sm text-on-surface-variant ${done ? "opacity-70" : ""}`}>
                                  <MaterialIcon className="text-[14px] text-tertiary" name="local_fire_department" />
                                  {habit.currentStreak} Day Streak
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <button
                          className={
                            done
                              ? "flex h-8 w-8 items-center justify-center rounded-full bg-primary text-on-primary shadow-sm"
                              : "flex h-8 w-8 items-center justify-center rounded-full border-2 border-outline-variant transition-colors hover:border-primary hover:bg-primary-container/20"
                          }
                          onClick={() => !done && handleComplete(habit._id)}
                          type="button"
                        >
                          <MaterialIcon className={`text-[18px] ${done ? "" : "text-transparent group-hover:text-primary/50"}`} name="check" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-gutter lg:col-span-4">
                  <div className="rounded-xl bg-surface-container-lowest p-5 shadow-[0px_4px_20px_rgba(15,23,42,0.05)]">
                    <h3 className="mb-4 text-title-md font-bold text-on-background">Weekly Effort</h3>
                    <div className="flex h-32 items-end justify-between gap-2 border-b border-surface-variant pb-2">
                      {weeklyBars.map((entry, index) => (
                        <div className="group flex w-full flex-col items-center gap-2" key={`${entry.day}-${index}`}>
                          <div className="flex h-full w-full flex-col justify-end overflow-hidden rounded-t-sm bg-surface-container">
                            <div className={`w-full ${index === 3 ? "bg-primary shadow-[0_0_8px_rgba(83,65,205,0.4)]" : "bg-primary/40 group-hover:bg-primary"} transition-colors`} style={{ height: `${entry.heightPercent}%` }} />
                          </div>
                          <span className={`text-[10px] ${index === 3 ? "font-bold text-primary" : "text-on-surface-variant"}`}>{entry.day.slice(0, 1)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl bg-surface-container-lowest p-5 shadow-[0px_4px_20px_rgba(15,23,42,0.05)]">
                    <h3 className="mb-4 text-title-md font-bold text-on-background">Recent Glory</h3>
                    <div className="space-y-4">
                      {recentBadges.slice(0, 2).map((badge) => (
                        <div className="flex items-center gap-3" key={badge.id}>
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tertiary/10 text-tertiary">
                            <MaterialIcon className="text-lg" fill name={badge.icon} />
                          </div>
                          <div>
                            <h4 className="text-label-sm text-on-background">{badge.title}</h4>
                            <p className="text-[12px] text-on-surface-variant">{badge.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </main>

            <StitchFooter />
          </div>
        </div>
      </div>

      <StitchCompletionOverlay onClose={() => setOverlayRewards(null)} open={Boolean(overlayRewards)} rewards={overlayRewards} />
    </div>
  );
};

export default Dashboard;
