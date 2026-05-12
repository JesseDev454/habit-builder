import MaterialIcon from "../components/common/MaterialIcon";
import { StitchBottomNav, StitchFooter, StitchSidebar } from "../components/stitch/StitchNav";

const avatarSrc =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBet5eeLgJEKpb-DeXwhyVVixRL92c413C0S-XjZhjRcXS1E4hpfLKvHJ5HuVkjLxt0tXWTQrNO4qBtTa1GRrk8mwsepS2F_NG5_ltZKpZmmej3nWNxRP328WlPQ7gadiCTiehZQIBGFqIX0Jal02Q57WwEfSMNU3zjaOqDAsmunKUwtj8rUzv_vPVMqDAZJjNtv23Ml5TpObMLWr8MesyRvV_eM99sqY3XuyCttJQkq-cNCiZj_Dj_gj39JKVmKe42xdEHzLGxoU93";

const quests = [
  {
    id: "coding-streak",
    title: "7-Day Coding Streak",
    description: "Ship one focused coding session every day for a full week.",
    icon: "terminal",
    iconWrapClass: "bg-primary-container text-on-primary-container",
    badgeClass: "bg-tertiary-fixed text-on-tertiary-fixed",
    difficulty: "Heroic",
    duration: "7 Days",
    reward: "+150 XP",
    progress: 57,
    progressLabel: "4 / 7 days complete",
    cta: "In Progress",
  },
  {
    id: "study-warrior",
    title: "Study Warrior",
    description: "Complete five focused study blocks and keep momentum high.",
    icon: "school",
    iconWrapClass: "bg-secondary-fixed text-on-secondary-fixed",
    badgeClass: "bg-primary-fixed text-on-primary-fixed",
    difficulty: "Focused",
    duration: "5 Sessions",
    reward: "+120 XP",
    progress: 40,
    progressLabel: "2 / 5 sessions complete",
    cta: "Start Quest",
  },
  {
    id: "fitness-starter",
    title: "Fitness Starter",
    description: "Knock out four workouts this week and build a stronger routine.",
    icon: "fitness_center",
    iconWrapClass: "bg-error-container text-on-error-container",
    badgeClass: "bg-tertiary-fixed text-on-tertiary-fixed",
    difficulty: "Challenging",
    duration: "1 Week",
    reward: "+130 XP",
    progress: 75,
    progressLabel: "3 / 4 workouts complete",
    cta: "In Progress",
  },
  {
    id: "reading-sprint",
    title: "Reading Sprint",
    description: "Read for twenty minutes across six days to complete the sprint.",
    icon: "menu_book",
    iconWrapClass: "bg-primary-fixed text-on-primary-fixed-variant",
    badgeClass: "bg-secondary-fixed text-on-secondary-fixed-variant",
    difficulty: "Steady",
    duration: "6 Days",
    reward: "+90 XP",
    progress: 100,
    progressLabel: "Quest completed",
    cta: "Completed",
  },
];

const EpicQuests = () => (
  <div className="min-h-screen bg-background text-on-background">
    <div className="flex min-h-screen flex-col md:flex-row">
      <StitchSidebar activeKey="quests" avatarSrc={avatarSrc} brandVariant="circle" />

      <main className="flex min-h-screen w-full flex-1 flex-col pb-24 md:ml-[280px] md:pb-0">
        <header className="sticky top-0 z-40 mx-auto flex h-16 w-full max-w-container_max_width items-center justify-between bg-surface/90 px-margin_mobile shadow-sm backdrop-blur-md md:px-margin_desktop">
          <div className="md:hidden">
            <span className="text-headline-lg-mobile font-black text-primary">HabitQuest</span>
          </div>
          <div className="hidden flex-1 md:block" />
          <div className="flex items-center gap-4">
            <button className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-highest hover:text-primary" type="button">
              <MaterialIcon name="notifications" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-highest hover:text-primary" type="button">
              <MaterialIcon name="history_edu" />
            </button>
            <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary">
              <img alt="Hero Avatar" className="h-full w-full object-cover" src={avatarSrc} />
            </div>
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-container_max_width flex-1 flex-col px-margin_mobile py-8 md:px-margin_desktop">
          <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <section className="relative overflow-hidden rounded-xl bg-primary-container p-8 text-on-primary-container shadow-[0px_4px_20px_rgba(15,23,42,0.05)] lg:col-span-8">
              <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -bottom-10 left-10 h-32 w-32 rounded-full bg-tertiary-fixed/30 blur-3xl" />
              <div className="relative z-10">
                <span className="mb-4 inline-flex items-center gap-1 rounded-full bg-surface/20 px-3 py-1 text-badge-xs text-on-primary-container">
                  <MaterialIcon className="text-[14px]" fill name="workspace_premium" />
                  Limited-Time Challenges
                </span>
                <h1 className="mb-3 text-display-xl text-on-primary-container">Epic Quests</h1>
                <p className="max-w-2xl text-body-base text-on-primary-container/80">
                  Take on bigger streaks, earn bonus XP, and push your consistency into legendary territory.
                </p>
              </div>
            </section>

            <aside className="grid grid-cols-2 gap-4 lg:col-span-4 lg:grid-cols-1">
              <div className="rounded-xl bg-surface-container-lowest p-6 shadow-[0px_4px_20px_rgba(15,23,42,0.05)]">
                <p className="mb-2 text-label-sm text-on-surface-variant">Active Quests</p>
                <p className="text-display-xl text-primary">3</p>
              </div>
              <div className="rounded-xl bg-surface-container-lowest p-6 shadow-[0px_4px_20px_rgba(15,23,42,0.05)]">
                <p className="mb-2 text-label-sm text-on-surface-variant">Bonus XP</p>
                <p className="text-display-xl text-tertiary">490</p>
              </div>
            </aside>
          </div>

          <section className="grid grid-cols-1 gap-gutter lg:grid-cols-2">
            {quests.map((quest) => {
              const isComplete = quest.progress === 100;
              const isActive = quest.cta === "In Progress";

              return (
                <article
                  className="group relative overflow-hidden rounded-xl border border-transparent bg-surface-container-lowest p-6 shadow-[0px_4px_20px_rgba(15,23,42,0.05)] transition-all duration-300 hover:scale-[1.01] hover:border-outline-variant/50 hover:shadow-md"
                  key={quest.id}
                >
                  <MaterialIcon className="absolute -bottom-4 -right-4 text-[96px] text-primary/5 transition-colors group-hover:text-primary/10" name={quest.icon} />
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-xl shadow-sm ${quest.iconWrapClass}`}>
                      <MaterialIcon className="text-[28px]" name={quest.icon} />
                    </div>
                    <span className={`rounded-full px-3 py-1 text-badge-xs ${quest.badgeClass}`}>{quest.reward}</span>
                  </div>

                  <div className="relative z-10 mt-5">
                    <div className="mb-3 flex items-center gap-2 text-badge-xs text-on-surface-variant">
                      <span>{quest.difficulty}</span>
                      <span className="h-1 w-1 rounded-full bg-outline" />
                      <span>{quest.duration}</span>
                    </div>
                    <h2 className="mb-2 text-title-md text-on-surface">{quest.title}</h2>
                    <p className="mb-6 text-body-base text-on-surface-variant">{quest.description}</p>

                    <div className="mb-2 flex items-center justify-between text-label-sm">
                      <span className="text-on-surface-variant">Progress</span>
                      <span className="text-primary">{quest.progress}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
                      <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${quest.progress}%` }} />
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-4">
                      <span className="text-label-sm text-on-surface-variant">{quest.progressLabel}</span>
                      <button
                        className={
                          isComplete
                            ? "rounded-xl bg-surface-container-high px-4 py-2 text-label-sm text-on-surface-variant"
                            : isActive
                              ? "rounded-xl bg-primary px-4 py-2 text-label-sm text-on-primary shadow-[0_4px_14px_0_rgba(83,65,205,0.39)]"
                              : "rounded-xl border border-outline-variant bg-surface px-4 py-2 text-label-sm text-primary"
                        }
                        type="button"
                      >
                        {quest.cta}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        </div>

        <StitchFooter />
      </main>
    </div>

    <StitchBottomNav activeKey="quests" />
  </div>
);

export default EpicQuests;
