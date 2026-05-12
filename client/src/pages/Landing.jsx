import { useNavigate } from "react-router-dom";
import MaterialIcon from "../components/common/MaterialIcon";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-on-background">
      <div className="md:hidden">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-center bg-surface-container-low px-margin_mobile text-headline-lg-mobile font-black text-primary shadow-sm backdrop-blur-md">
          HabitQuest
        </header>

        <main className="mx-auto flex w-full max-w-[28rem] flex-1 flex-col gap-8 px-margin_mobile py-8">
          <section className="flex flex-col items-center gap-6 text-center">
            <h1 className="text-display-xl leading-tight text-primary">
              Build better habits. <br />
              <span className="text-tertiary-container">Earn XP.</span>
            </h1>
            <p className="w-full px-4 whitespace-normal text-body-base text-on-surface-variant">
              Turn your daily routine into an epic quest. Level up your life, defeat bad habits, and unlock your true potential.
            </p>
            <div className="mt-4 flex w-full flex-col gap-4">
              <button
                className="w-full rounded-xl bg-primary py-4 text-title-md text-on-primary shadow-[0px_4px_20px_rgba(83,65,205,0.3)] transition-transform hover:scale-[1.02] active:scale-95"
                onClick={() => navigate("/register")}
                type="button"
              >
                Start Your Quest
              </button>
              <button
                className="w-full rounded-xl bg-surface-container-high py-4 text-title-md text-primary transition-colors hover:bg-surface-container-highest active:scale-95"
                onClick={() => navigate("/login")}
                type="button"
              >
                Learn More
              </button>
            </div>
          </section>

          <section className="relative mt-4 overflow-hidden rounded-[32px] border border-surface-container-high bg-surface-container-lowest p-6 shadow-[0px_8px_30px_rgba(15,23,42,0.08)]">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-fixed opacity-50 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-tertiary-fixed opacity-50 blur-3xl" />
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center gap-4 rounded-2xl bg-surface-container p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-container text-on-primary-container shadow-inner">
                  <MaterialIcon className="text-2xl" fill name="person" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-title-md text-on-surface">Level 12 Hero</h3>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
                    <div className="h-full w-3/4 rounded-full bg-primary" />
                  </div>
                </div>
                <div className="shrink-0 whitespace-nowrap rounded-full bg-tertiary-container px-2 py-1 text-badge-xs text-on-tertiary-container shadow-sm">
                  +50 XP
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between rounded-xl border border-surface-variant bg-surface p-4 shadow-sm">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-container/20 text-secondary">
                      <MaterialIcon className="text-xl" name="water_drop" />
                    </div>
                    <span className="min-w-0 whitespace-normal text-title-md text-on-surface line-through opacity-70">Drink Water</span>
                  </div>
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
                    <MaterialIcon className="text-sm" fill name="check" />
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-surface-variant bg-surface p-4 shadow-sm">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tertiary-container/20 text-tertiary">
                      <MaterialIcon className="text-xl" name="book" />
                    </div>
                    <span className="min-w-0 whitespace-normal text-title-md text-on-surface">Read 20 Pages</span>
                  </div>
                  <div className="h-6 w-6 shrink-0 rounded-full border-2 border-primary" />
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 mt-8 flex flex-col gap-6">
            <h2 className="text-center text-headline-lg-mobile text-on-surface">Why HabitQuest?</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start gap-4 rounded-2xl bg-surface-container-low p-5 shadow-sm">
                <div className="mt-1 rounded-lg bg-primary-container p-2 text-on-primary-container">
                  <MaterialIcon name="track_changes" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-title-md text-on-surface">Track Anything</h4>
                  <p className="text-sm text-on-surface-variant">Custom habits, flexible schedules.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl bg-surface-container-low p-5 shadow-sm">
                <div className="mt-1 rounded-lg bg-secondary-container p-2 text-on-secondary-container">
                  <MaterialIcon name="workspace_premium" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-title-md text-on-surface">Unlock Rewards</h4>
                  <p className="text-sm text-on-surface-variant">Earn badges and level up your avatar.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl bg-surface-container-low p-5 shadow-sm">
                <div className="mt-1 rounded-lg bg-tertiary-container p-2 text-on-tertiary-container">
                  <MaterialIcon name="monitoring" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-title-md text-on-surface">Visual Analytics</h4>
                  <p className="text-sm text-on-surface-variant">See your progress with beautiful charts.</p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-auto bg-surface-container-highest px-margin_mobile py-8">
          <div className="text-center text-sm text-on-surface-variant">&copy; 2024 HabitQuest. Complete Your Legend.</div>
        </footer>
      </div>

      <div className="hidden min-h-screen flex-col md:flex">
        <header className="sticky top-0 z-40 bg-surface-container-low shadow-sm backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-container_max_width items-center justify-between px-margin_desktop">
            <div className="text-headline-lg-mobile font-black text-primary">HabitQuest</div>
            <div className="flex items-center gap-4">
              <button
                className="hidden cursor-pointer text-label-sm text-on-surface-variant transition-colors hover:text-primary md:block"
                onClick={() => navigate("/login")}
                type="button"
              >
                Login
              </button>
              <button
                className="rounded-lg bg-primary px-4 py-2 text-label-sm text-on-primary shadow-[0px_4px_20px_rgba(15,23,42,0.05)] transition-transform hover:scale-[1.02]"
                onClick={() => navigate("/register")}
                type="button"
              >
                Start Your Quest
              </button>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          <section className="overflow-hidden bg-background px-margin_desktop pb-32 pt-20">
            <div className="mx-auto grid max-w-container_max_width items-center gap-12 md:grid-cols-2">
              <div className="z-10 space-y-8">
                <h1 className="text-display-xl leading-tight text-on-surface">
                  Build better habits. <br />
                  <span className="text-primary">Earn XP.</span> <br />
                  Keep your streak alive.
                </h1>
                <p className="w-full max-w-[32rem] whitespace-normal text-body-base text-on-surface-variant">
                  HabitQuest turns daily routines into simple quests with XP, streaks, and progress tracking. Level up your life, one habit at a time.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    className="rounded-xl bg-primary px-8 py-4 text-title-md text-on-primary shadow-[0px_4px_20px_rgba(15,23,42,0.15)] transition-all hover:scale-[1.02] active:scale-95"
                    onClick={() => navigate("/register")}
                    type="button"
                  >
                    Start Your Quest
                  </button>
                  <button
                    className="rounded-xl border border-outline-variant bg-surface-container px-8 py-4 text-title-md text-on-surface transition-colors hover:bg-surface-container-high"
                    onClick={() => navigate("/login")}
                    type="button"
                  >
                    Login
                  </button>
                </div>
              </div>

              <div className="relative z-10 mx-auto w-full max-w-[28rem] md:ml-auto">
                <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary-fixed-dim opacity-70 blur-2xl" />
                <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-secondary-fixed-dim opacity-70 blur-2xl" />
                <div className="glass-panel relative rounded-2xl p-6 shadow-[0px_8px_30px_rgba(15,23,42,0.1)]">
                  <div className="mb-8 flex items-start justify-between">
                    <div className="min-w-0">
                      <h3 className="text-title-md text-on-surface">Daily Progress</h3>
                      <p className="mt-1 text-label-sm text-on-surface-variant">Level 12 Hero</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-tertiary-fixed px-3 py-1 text-badge-xs text-on-tertiary-fixed">
                      <MaterialIcon className="text-[14px]" name="local_fire_department" />
                      6 Day Streak
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-end gap-2">
                      <span className="text-display-xl leading-none text-primary">420</span>
                      <span className="mb-1 whitespace-nowrap text-label-sm text-primary">XP Earned Today</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-label-sm">
                        <span className="text-on-surface-variant">Level 12 Progress</span>
                        <span className="font-bold text-primary">84%</span>
                      </div>
                      <div className="h-3 w-full overflow-hidden rounded-full bg-surface-container-highest">
                        <div className="relative h-full w-[84%] overflow-hidden rounded-full bg-primary">
                          <div className="absolute inset-0 animate-pulse bg-white/20" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 border-t border-outline-variant/30 pt-4">
                      <div className="flex items-center justify-between rounded-xl bg-surface p-3 shadow-sm">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary-fixed text-on-secondary-container">
                            <MaterialIcon className="text-[18px]" name="water_drop" />
                          </div>
                          <span className="min-w-0 whitespace-normal text-body-base text-on-surface">Drink Water</span>
                        </div>
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary shadow-sm">
                          <MaterialIcon className="text-[16px]" name="check" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between rounded-xl border border-outline-variant/50 bg-surface p-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-on-surface-variant">
                            <MaterialIcon className="text-[18px]" name="menu_book" />
                          </div>
                          <span className="min-w-0 whitespace-normal text-body-base text-on-surface-variant">Read 10 Pages</span>
                        </div>
                        <div className="h-6 w-6 shrink-0 rounded-full border-2 border-primary/30" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-surface px-margin_desktop py-24">
            <div className="mx-auto max-w-container_max_width">
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-headline-lg text-on-surface">Everything you need to level up</h2>
                <p className="mx-auto max-w-2xl text-body-base text-on-surface-variant">Simple tools wrapped in a rewarding experience.</p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
                <div className="group relative overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-low p-8 shadow-[0px_4px_20px_rgba(15,23,42,0.05)] transition-all hover:scale-[1.01] hover:shadow-lg md:col-span-8">
                  <div className="absolute -bottom-20 -right-20 opacity-5 text-primary transition-transform duration-500 group-hover:scale-110">
                    <MaterialIcon className="text-[300px]" name="checklist_rtl" />
                  </div>
                  <div className="relative z-10 w-full md:w-2/3">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container text-on-primary-container">
                      <MaterialIcon name="checklist" />
                    </div>
                    <h3 className="mb-3 text-title-md text-on-surface">Track Daily Habits</h3>
                    <p className="text-body-base text-on-surface-variant">Add your routines, set frequencies, and mark them complete with satisfying, tactile interactions.</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-tertiary-fixed bg-tertiary-fixed/30 p-8 shadow-[0px_4px_20px_rgba(15,23,42,0.05)] transition-all hover:scale-[1.01] hover:shadow-lg md:col-span-4">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-tertiary-container text-on-tertiary-container">
                    <MaterialIcon name="local_fire_department" />
                  </div>
                  <h3 className="mb-3 text-title-md text-on-surface">Build Streaks</h3>
                  <p className="text-body-base text-on-surface-variant">Don&apos;t break the chain. Watch your fire burn brighter with every consecutive day.</p>
                </div>

                <div className="rounded-2xl border border-primary-fixed bg-primary-fixed/30 p-8 shadow-[0px_4px_20px_rgba(15,23,42,0.05)] transition-all hover:scale-[1.01] hover:shadow-lg md:col-span-5">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-on-primary">
                    <MaterialIcon fill name="stars" />
                  </div>
                  <h3 className="mb-3 text-title-md text-on-surface">Earn XP</h3>
                  <p className="text-body-base text-on-surface-variant">Every completed habit grants XP. Level up your profile and unlock new ranks.</p>
                </div>

                <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-low p-8 shadow-[0px_4px_20px_rgba(15,23,42,0.05)] transition-all hover:scale-[1.01] hover:shadow-lg md:col-span-7">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-fixed text-on-secondary-container">
                    <MaterialIcon name="leaderboard" />
                  </div>
                  <h3 className="mb-3 text-title-md text-on-surface">View Progress</h3>
                  <p className="text-body-base text-on-surface-variant">Beautiful analytics show your consistency over time. Identify patterns and optimize your quests.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="border-t border-outline-variant/20 bg-surface-container-lowest px-margin_desktop py-24">
            <div className="mx-auto max-w-container_max_width">
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-headline-lg text-on-surface">The Hero&apos;s Journey</h2>
                <p className="text-body-base text-on-surface-variant">Four simple steps to a better you.</p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                {[
                  ["edit_square", "1. Create", "Define your daily quests."],
                  ["check_circle", "2. Complete", "Tick them off daily."],
                  ["workspace_premium", "3. Earn", "Gain XP and level up."],
                  ["monitoring", "4. Track", "Watch your stats grow."],
                ].map(([icon, title, body], index) => (
                  <div className="group relative text-center" key={title}>
                    <div className="relative z-10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant shadow-sm transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
                      <MaterialIcon className="text-[32px]" name={icon} />
                    </div>
                    {index < 3 ? <div className="absolute left-1/2 top-10 hidden h-[2px] w-full -z-0 bg-outline-variant/30 md:block" /> : null}
                    <h4 className="mb-2 text-title-md text-on-surface">{title}</h4>
                    <p className="text-body-base text-on-surface-variant">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden bg-primary-container px-margin_desktop py-24">
            <div className="pointer-events-none absolute right-0 top-0 h-[800px] w-[800px] translate-x-1/3 -translate-y-1/2 rounded-full bg-primary opacity-20 blur-[100px]" />
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-display-xl text-on-primary-container">Ready to start your first quest?</h2>
              <p className="mb-10 text-lg text-on-primary-container/80">Join thousands of others turning their daily routines into an epic adventure.</p>
              <button
                className="w-full rounded-xl bg-primary px-10 py-5 text-title-md text-on-primary shadow-lg transition-all hover:scale-[1.03] active:scale-95 md:w-auto"
                onClick={() => navigate("/register")}
                type="button"
              >
                Start Your Quest Now
              </button>
            </div>
          </section>
        </main>

        <footer className="mt-auto bg-surface-container-highest">
          <div className="mx-auto flex max-w-container_max_width items-center justify-center px-margin_desktop py-8">
            <div className="text-center text-sm text-on-surface-variant">&copy; 2024 HabitQuest. Complete Your Legend.</div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
