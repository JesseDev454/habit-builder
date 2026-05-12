import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import MaterialIcon from "../components/common/MaterialIcon";
import { StitchBottomNav, StitchSidebar } from "../components/stitch/StitchNav";
import { getCategoryDetailAnalytics } from "../api/analyticsApi";
import { completeHabit } from "../api/habitApi";
import { findHabitCategory } from "../data/habitCategories";
import useAuth from "../hooks/useAuth";
import { getDifficultyXp } from "../utils/stitch";

const avatarSrc =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBet5eeLgJEKpb-DeXwhyVVixRL92c413C0S-XjZhjRcXS1E4hpfLKvHJ5HuVkjLxt0tXWTQrNO4qBtTa1GRrk8mwsepS2F_NG5_ltZKpZmmej3nWNxRP328WlPQ7gadiCTiehZQIBGFqIX0Jal02Q57WwEfSMNU3zjaOqDAsmunKUwtj8rUzv_vPVMqDAZJjNtv23Ml5TpObMLWr8MesyRvV_eM99sqY3XuyCttJQkq-cNCiZj_Dj_gj39JKVmKe42xdEHzLGxoU93";

const CategoryDashboard = () => {
  const { category: categorySlug } = useParams();
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [completingId, setCompletingId] = useState(null);

  const fallbackMeta = findHabitCategory(categorySlug);

  const loadCategory = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getCategoryDetailAnalytics(categorySlug);
      setCategoryData(data);
    } catch (loadError) {
      setError(loadError.message || "Could not load this category.");
      setCategoryData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategory();
  }, [categorySlug]);

  const categoryMeta = categoryData?.category || fallbackMeta;
  const categoryHabits = categoryData?.habits || [];
  const topHabit = useMemo(
    () =>
      [...categoryHabits].sort(
        (left, right) =>
          (right.currentStreak || 0) - (left.currentStreak || 0) ||
          Number(Boolean(right.completedToday)) - Number(Boolean(left.completedToday))
      )[0],
    [categoryHabits]
  );

  const handleComplete = async (habitId) => {
    try {
      setCompletingId(habitId);
      const data = await completeHabit(habitId);
      if (data?.user) updateUser(data.user);
      toast.success(data?.message || "Quest completed.");
      await loadCategory();
    } catch (completeError) {
      toast.error(completeError.message || "Could not complete habit.");
    } finally {
      setCompletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background">
      <div className="flex min-h-screen flex-col md:flex-row">
        <StitchSidebar activeKey="habits" avatarSrc={avatarSrc} brandVariant="circle" />

        <main className="flex-1 pb-24 md:ml-[280px] md:pb-8">
          <header className="sticky top-0 z-40 mx-auto flex h-16 max-w-container_max_width items-center justify-between bg-surface/90 px-margin_mobile shadow-sm backdrop-blur-md md:px-margin_desktop">
            <div className="md:hidden">
              <span className="text-headline-lg-mobile font-black text-primary">HabitQuest</span>
            </div>
            <div className="ml-auto flex flex-1 items-center justify-end gap-4 md:flex-none">
              <button className="cursor-pointer rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary" type="button">
                <MaterialIcon name="search" />
              </button>
              <button className="relative cursor-pointer rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary" type="button">
                <MaterialIcon name="notifications" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-error" />
              </button>
              <button className="cursor-pointer rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary" type="button">
                <MaterialIcon name="history_edu" />
              </button>
            </div>
          </header>

          <div className="mx-auto max-w-container_max_width px-margin_mobile pt-8 md:px-margin_desktop">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <button
                  className="mb-4 inline-flex items-center gap-1 text-label-sm text-on-surface-variant transition-colors hover:text-primary"
                  onClick={() => navigate("/daily-habits")}
                  type="button"
                >
                  <MaterialIcon className="text-[18px]" name="arrow_back" />
                  Daily Habits
                </button>
                <h2 className="mb-2 text-display-xl text-on-surface">
                  {categoryMeta?.shortName || "Category"} Habits
                </h2>
                <p className="text-body-base text-on-surface-variant">
                  {categoryMeta?.description || "Track your progress and complete your quests."}
                </p>
              </div>
              <button
                className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-label-sm text-on-primary shadow-[0_4px_14px_0_rgba(83,65,205,0.39)] transition-transform hover:scale-[1.02] active:scale-95"
                onClick={() => navigate(`/create-habit?category=${categoryMeta?.slug || categorySlug}`)}
                type="button"
              >
                <MaterialIcon name="add" />
                Create {categoryMeta?.shortName || "New"} Habit
              </button>
            </div>

            {error ? (
              <div className="mb-6 rounded-xl border border-error-container bg-surface-container-lowest p-4 text-body-base text-error">
                {error}
              </div>
            ) : null}

            <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                ["Active Habits", categoryData?.activeHabits ?? 0, "code", "text-primary"],
                ["Weekly Completion", `${categoryData?.weeklyCompletion ?? 0}%`, "trending_up", "text-secondary"],
                ["Best Streak", `${categoryData?.bestStreak ?? 0} days`, "local_fire_department", "text-tertiary"],
                ["XP Earned", `${categoryData?.xpEarned ?? 0} XP`, "star", "text-primary"],
              ].map(([label, value, icon, tone]) => (
                <div className="group relative overflow-hidden rounded-xl bg-surface-container-lowest p-6 shadow-[0px_4px_20px_rgba(15,23,42,0.05)] transition-shadow hover:shadow-md" key={label}>
                  <MaterialIcon className={`absolute -bottom-4 -right-4 rotate-[-15deg] text-[80px] text-surface-container transition-transform duration-500 group-hover:scale-110 ${tone}`} name={icon} />
                  <p className="relative z-10 mb-2 text-label-sm text-on-surface-variant">{label}</p>
                  <p className={`relative z-10 text-display-xl ${tone}`}>{value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
              <div className="space-y-4 lg:col-span-2">
                <h3 className="mb-4 text-title-md text-on-surface">
                  Your {categoryMeta?.shortName || "Category"} Habits
                </h3>

                {!loading && categoryHabits.length === 0 ? (
                  <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-5 text-body-base text-on-surface-variant shadow-[0px_4px_20px_rgba(15,23,42,0.05)]">
                    No habits in this category yet. Create one to start your streak.
                  </div>
                ) : null}

                {categoryHabits.map((habit) => {
                  const xp = getDifficultyXp(habit.difficulty);
                  return (
                    <div className={`group flex items-center justify-between rounded-xl border border-transparent bg-surface-container-lowest p-4 shadow-[0px_4px_20px_rgba(15,23,42,0.05)] transition-all hover:scale-[1.01] hover:border-surface-variant hover:shadow-md ${habit.completedToday ? "opacity-80" : ""}`} key={habit._id}>
                      <div className="flex min-w-0 items-center gap-4">
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-sm ${habit.completedToday ? "bg-secondary-container text-on-secondary-container" : "bg-primary-container text-on-primary-container"}`}>
                          <MaterialIcon name={categoryMeta?.icon || "task_alt"} />
                        </div>
                        <div className="min-w-0">
                          <h4 className={`truncate text-title-md ${habit.completedToday ? "line-through decoration-on-surface-variant/50" : ""}`}>{habit.name}</h4>
                          <div className="mt-1 flex flex-wrap items-center gap-2">
                            <span className="rounded-md bg-surface-container px-2 py-1 text-badge-xs text-on-surface-variant">
                              {habit.frequency === "daily" ? "Daily" : "Weekly"}
                            </span>
                            {habit.completedToday ? (
                              <span className="text-badge-xs text-secondary">+{xp} XP</span>
                            ) : (
                              <span className="flex items-center gap-1 text-badge-xs text-primary">
                                <MaterialIcon className="text-[14px]" name="local_fire_department" />
                                {habit.currentStreak || 0} Day Streak
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        className={
                          habit.completedToday
                            ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-on-secondary shadow-sm"
                            : "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary transition-colors hover:bg-primary-container"
                        }
                        onClick={() => !habit.completedToday && handleComplete(habit._id)}
                        type="button"
                      >
                        {habit.completedToday ? (
                          <MaterialIcon className="text-[20px]" fill name="check" />
                        ) : completingId === habit._id ? (
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        ) : null}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-6">
                <div className="relative overflow-hidden rounded-xl bg-primary p-6 text-on-primary shadow-lg">
                  <div className="pointer-events-none absolute -mr-10 -mt-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                  <div className="relative z-10 mb-4 flex items-center gap-3">
                    <MaterialIcon className="text-tertiary-fixed" name="tips_and_updates" />
                    <h4 className="text-title-md">Hero Insight</h4>
                  </div>
                  <p className="relative z-10 text-body-base text-on-primary-container">
                    {topHabit ? (
                      <>
                        Your strongest habit is <strong className="text-white">{topHabit.name}</strong>. Keep that streak moving.
                      </>
                    ) : (
                      "Your next quest starts with your first habit in this category."
                    )}
                  </p>
                  <button className="mt-4 flex items-center gap-1 text-label-sm text-tertiary-fixed transition-colors hover:text-white" onClick={() => navigate("/analytics")} type="button">
                    View detailed analytics
                    <MaterialIcon className="text-[16px]" name="arrow_forward" />
                  </button>
                </div>

                <div className="rounded-xl border border-surface-variant/50 bg-surface-container-lowest p-6 shadow-[0px_4px_20px_rgba(15,23,42,0.05)]">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-title-md text-on-surface">Consistency</h4>
                    <MaterialIcon className="text-on-surface-variant" name="calendar_month" />
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {["M", "T", "W", "T", "F", "S", "S"].map((day) => (
                      <div className="text-center text-badge-xs text-on-surface-variant" key={day}>
                        {day}
                      </div>
                    ))}
                    {(categoryData?.consistency || []).map((entry) => {
                      let tone = "bg-surface-container";
                      if (entry.count >= 3) tone = "bg-primary";
                      else if (entry.count === 2) tone = "bg-primary/60";
                      else if (entry.count === 1) tone = "bg-primary/20";

                      return <div className={`aspect-square rounded-md ${tone}`} key={entry.date} />;
                    })}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-on-surface-variant">
                    <span className="text-badge-xs">Less</span>
                    <div className="flex gap-1">
                      <div className="h-3 w-3 rounded-sm bg-surface-container" />
                      <div className="h-3 w-3 rounded-sm bg-primary/20" />
                      <div className="h-3 w-3 rounded-sm bg-primary/60" />
                      <div className="h-3 w-3 rounded-sm bg-primary" />
                    </div>
                    <span className="text-badge-xs">More</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <StitchBottomNav activeKey="habits" />
    </div>
  );
};

export default CategoryDashboard;
