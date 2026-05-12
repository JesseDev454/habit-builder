import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import MaterialIcon from "../components/common/MaterialIcon";
import { StitchBottomNav, StitchFooter, StitchSidebar } from "../components/stitch/StitchNav";
import { habitCategories } from "../data/habitCategories";
import useHabits from "../hooks/useHabits";

const avatarSrc =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAws1WUkG-HvtpFqLZODaa_C5RbDJsumtQlsngw-BMdRAA0TRQYRYL6oqsYKTIeGSvQLwRxNPQbIgRozdzWbHCkZ8yHzJ7OWgpUS_DFzmhXZ-xnfdAxqNj7UNgV8m4qPFCVqaRoc7H0i_3TphGMBV8jiWN7qVFtLOM9djwSjWYJhf8-bCzsrdz5koNxQbmAy1tPaLOcibV04_s2ee3MibaFwIvdq32aHmiawuchZgtnWqWx8l5A9TyLWHFOcZBH7mh42saXHvKg4Haq";

const cardStyles = {
  study: { glow: "bg-primary-fixed/30", iconWrap: "bg-secondary-fixed text-on-secondary-fixed-variant", progress: 85 },
  coding: { glow: "bg-tertiary-fixed/30", iconWrap: "bg-tertiary-container text-on-tertiary-container", progress: 60 },
  reading: { glow: "bg-primary-container/20", iconWrap: "bg-primary-fixed-dim text-on-primary-fixed", progress: 90 },
  fitness: { glow: "bg-error-container/30", iconWrap: "bg-error-container text-on-error-container", progress: 75 },
  water: { glow: "bg-secondary-fixed/40", iconWrap: "bg-secondary-fixed-dim text-on-secondary-fixed", progress: 100 },
  wellness: { glow: "bg-surface-container-high", iconWrap: "bg-surface-variant text-on-surface", progress: 50 },
  productivity: { glow: "bg-primary/10", iconWrap: "bg-primary-container text-on-primary-container", progress: 80 },
  "spiritual-growth": { glow: "bg-tertiary-fixed-dim/30", iconWrap: "bg-tertiary-fixed text-on-tertiary-fixed-variant", progress: 70 },
  sleep: { glow: "bg-primary-fixed-dim/20", iconWrap: "bg-primary-fixed text-on-primary-fixed-variant", progress: 65 },
};

const DailyHabits = () => {
  const navigate = useNavigate();
  const { habits } = useHabits({ autoFetch: true });

  const categoryCards = useMemo(
    () =>
      habitCategories.map((category) => {
        const matchingHabits = habits.filter((habit) => habit.category === category.name);
        const habitCount = matchingHabits.length || category.activeHabits;
        const bestStreak = matchingHabits.reduce((best, habit) => Math.max(best, habit.currentStreak || 0), 0) || category.bestStreak;
        const completionPercent = matchingHabits.length
          ? Math.round((matchingHabits.filter((habit) => habit.completedToday).length / matchingHabits.length) * 100)
          : category.weeklyCompletion;

        return {
          ...category,
          habitCount,
          bestStreak,
          completionPercent,
          styles: cardStyles[category.id],
        };
      }),
    [habits]
  );

  return (
    <div className="min-h-screen bg-background text-on-background">
      <div className="flex min-h-screen flex-col md:flex-row">
        <StitchSidebar activeKey="habits" avatarSrc={avatarSrc} brandVariant="square" />

        <main className="relative flex min-h-screen w-full flex-1 flex-col pb-24 md:ml-[280px] md:pb-0">
          <header className="sticky top-0 z-40 mx-auto flex h-16 w-full max-w-container_max_width items-center justify-between bg-surface/90 px-margin_mobile shadow-sm backdrop-blur-md md:px-margin_desktop">
            <div className="md:hidden">
              <span className="text-headline-lg-mobile font-black text-primary">HabitQuest</span>
            </div>
            <div className="hidden flex-1 md:block" />
            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <MaterialIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" name="search" />
                <input className="w-48 rounded-xl border border-transparent bg-surface-container-highest py-2 pl-10 pr-4 text-body-base transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 lg:w-64" placeholder="Search quests..." type="text" />
              </div>
              <button className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-highest hover:text-primary" type="button">
                <MaterialIcon name="notifications" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-highest hover:text-primary" type="button">
                <MaterialIcon name="history_edu" />
              </button>
              <div className="ml-2 h-10 w-10 overflow-hidden rounded-full border-2 border-surface bg-surface-variant">
                <img alt="Hero Avatar" className="h-full w-full object-cover" src={avatarSrc} />
              </div>
            </div>
          </header>

          <div className="mx-auto flex-1 w-full max-w-container_max_width px-margin_mobile py-8 md:px-margin_desktop">
            <div className="mb-10 text-center md:text-left">
              <h2 className="mb-2 text-headline-lg text-on-background">Daily Habits</h2>
              <p className="text-body-base text-on-surface-variant">Choose a habit category to view progress.</p>
            </div>

            <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
              {categoryCards.map((category) => (
                <button
                  className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-transparent bg-surface-container-lowest p-6 text-left shadow-[0px_4px_20px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-primary hover:shadow-lg"
                  key={category.id}
                  onClick={() => navigate(`/daily-habits/${category.id}`)}
                  type="button"
                >
                  <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full ${category.styles.glow} blur-2xl transition-colors`} />
                  <div className="mb-4 flex items-start justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-sm ${category.styles.iconWrap}`}>
                      <MaterialIcon className="text-[28px]" name={category.icon} />
                    </div>
                    <span className="flex items-center gap-1 rounded-full bg-surface-container-highest px-3 py-1 text-badge-xs text-on-surface-variant">
                      <MaterialIcon className="text-[14px]" name="local_fire_department" />
                      {category.bestStreak} days
                    </span>
                  </div>
                  <h3 className="mb-1 text-title-md text-on-background">{category.shortName}</h3>
                  <p className="mb-6 flex-1 text-sm text-on-surface-variant">{category.description}</p>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-label-sm">
                      <span className="text-on-surface-variant">{category.habitCount} habits</span>
                      <span className="font-bold text-primary">{category.completionPercent}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
                      <div className="h-full rounded-full bg-primary transition-all duration-1000 ease-out" style={{ width: `${category.completionPercent}%` }} />
                    </div>
                    <div className="mt-4 flex justify-end border-t border-surface-variant/50 pt-4">
                      <span className="flex items-center gap-1 text-label-sm text-primary group-hover:underline">
                        Open Quest
                        <MaterialIcon className="text-[16px]" name="arrow_forward" />
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <StitchFooter />
        </main>
      </div>

      <StitchBottomNav activeKey="habits" />
    </div>
  );
};

export default DailyHabits;
