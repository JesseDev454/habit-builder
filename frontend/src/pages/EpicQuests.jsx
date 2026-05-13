import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import MaterialIcon from "../components/common/MaterialIcon";
import StitchTopBar from "../components/stitch/StitchTopBar";
import { StitchBottomNav, StitchFooter, StitchSidebar } from "../components/stitch/StitchNav";
import { getChallenges, joinChallenge } from "../api/challengeApi";
import useAppAvatar from "../hooks/useAppAvatar";

const iconClassByCategory = {
  coding: {
    icon: "terminal",
    iconWrapClass: "bg-primary-container text-on-primary-container",
    badgeClass: "bg-tertiary-fixed text-on-tertiary-fixed",
  },
  study: {
    icon: "school",
    iconWrapClass: "bg-secondary-fixed text-on-secondary-fixed",
    badgeClass: "bg-primary-fixed text-on-primary-fixed",
  },
  "water intake": {
    icon: "water_drop",
    iconWrapClass: "bg-secondary-fixed text-on-secondary-fixed",
    badgeClass: "bg-tertiary-fixed text-on-tertiary-fixed",
  },
  reading: {
    icon: "menu_book",
    iconWrapClass: "bg-primary-fixed text-on-primary-fixed-variant",
    badgeClass: "bg-secondary-fixed text-on-secondary-fixed-variant",
  },
  fitness: {
    icon: "fitness_center",
    iconWrapClass: "bg-error-container text-on-error-container",
    badgeClass: "bg-tertiary-fixed text-on-tertiary-fixed",
  },
  wellness: {
    icon: "self_improvement",
    iconWrapClass: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    badgeClass: "bg-primary-fixed text-on-primary-fixed",
  },
};

const labelByDifficulty = {
  easy: "Focused",
  medium: "Heroic",
  hard: "Legendary",
};

const EpicQuests = () => {
  const avatarSrc = useAppAvatar();
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [joiningId, setJoiningId] = useState(null);

  const loadChallenges = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getChallenges();
      setQuests(data.challenges || []);
    } catch (loadError) {
      setError(loadError.message || "Could not load epic quests.");
      setQuests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChallenges();
  }, []);

  const activeQuests = useMemo(
    () => quests.filter((quest) => quest.isJoined && quest.userStatus === "joined").length,
    [quests]
  );

  const totalBonusXp = useMemo(
    () => quests.reduce((total, quest) => total + (quest.rewardXP || 0), 0),
    [quests]
  );

  const handleJoin = async (questId) => {
    try {
      setJoiningId(questId);
      const data = await joinChallenge(questId);
      setQuests((current) =>
        current.map((quest) =>
          quest._id === questId
            ? {
                ...quest,
                ...data.challenge,
                isJoined: true,
                userProgress: 0,
                userStatus: data.challenge.userStatus || "joined",
              }
            : quest
        )
      );
      toast.success("Quest joined.");
    } catch (joinError) {
      toast.error(joinError.message || "Could not join quest.");
    } finally {
      setJoiningId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background">
      <div className="flex min-h-screen flex-col md:flex-row">
        <StitchSidebar activeKey="quests" avatarSrc={avatarSrc} brandVariant="circle" />

        <main className="flex min-h-screen w-full flex-1 flex-col pb-24 md:ml-[280px] md:pb-0">
          <StitchTopBar />

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
                  <p className="text-display-xl text-primary">{activeQuests}</p>
                </div>
                <div className="rounded-xl bg-surface-container-lowest p-6 shadow-[0px_4px_20px_rgba(15,23,42,0.05)]">
                  <p className="mb-2 text-label-sm text-on-surface-variant">Bonus XP</p>
                  <p className="text-display-xl text-tertiary">{totalBonusXp}</p>
                </div>
              </aside>
            </div>

            {error ? (
              <div className="mb-6 rounded-xl border border-error-container bg-surface-container-lowest p-4 text-body-base text-error">
                {error}
              </div>
            ) : null}

            {loading ? (
              <div className="rounded-xl bg-surface-container-lowest p-6 text-body-base text-on-surface-variant shadow-[0px_4px_20px_rgba(15,23,42,0.05)]">
                Loading epic quests...
              </div>
            ) : null}

            {!loading && quests.length === 0 ? (
              <div className="rounded-xl bg-surface-container-lowest p-6 text-body-base text-on-surface-variant shadow-[0px_4px_20px_rgba(15,23,42,0.05)]">
                No epic quests are available yet.
              </div>
            ) : null}

            {!loading && quests.length > 0 ? (
              <section className="grid grid-cols-1 gap-gutter lg:grid-cols-2">
                {quests.map((quest) => {
                  const categoryKey = String(quest.category || "").trim().toLowerCase();
                  const styles = iconClassByCategory[categoryKey] || {
                    icon: "workspace_premium",
                    iconWrapClass: "bg-primary-container text-on-primary-container",
                    badgeClass: "bg-tertiary-fixed text-on-tertiary-fixed",
                  };
                  const progress = Math.min(
                    100,
                    Math.round(((quest.userProgress || 0) / Math.max(quest.goalValue || 1, 1)) * 100)
                  );
                  const isComplete = quest.userStatus === "completed";
                  const isActive = quest.isJoined && !isComplete;
                  const ctaLabel = isComplete ? "Completed" : isActive ? "In Progress" : "Start Quest";

                  return (
                    <article
                      className="group relative overflow-hidden rounded-xl border border-transparent bg-surface-container-lowest p-6 shadow-[0px_4px_20px_rgba(15,23,42,0.05)] transition-all duration-300 hover:scale-[1.01] hover:border-outline-variant/50 hover:shadow-md"
                      key={quest._id}
                    >
                      <MaterialIcon className="absolute -bottom-4 -right-4 text-[96px] text-primary/5 transition-colors group-hover:text-primary/10" name={styles.icon} />
                      <div className="relative z-10 flex items-start justify-between gap-4">
                        <div className={`flex h-14 w-14 items-center justify-center rounded-xl shadow-sm ${styles.iconWrapClass}`}>
                          <MaterialIcon className="text-[28px]" name={styles.icon} />
                        </div>
                        <span className={`rounded-full px-3 py-1 text-badge-xs ${styles.badgeClass}`}>
                          +{quest.rewardXP} XP
                        </span>
                      </div>

                      <div className="relative z-10 mt-5">
                        <div className="mb-3 flex items-center gap-2 text-badge-xs text-on-surface-variant">
                          <span>{labelByDifficulty[quest.difficulty] || quest.difficulty}</span>
                          <span className="h-1 w-1 rounded-full bg-outline" />
                          <span>{quest.durationDays} Days</span>
                        </div>
                        <h2 className="mb-2 text-title-md text-on-surface">{quest.title}</h2>
                        <p className="mb-6 text-body-base text-on-surface-variant">{quest.description}</p>

                        <div className="mb-2 flex items-center justify-between text-label-sm">
                          <span className="text-on-surface-variant">Progress</span>
                          <span className="text-primary">{progress}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
                          <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${progress}%` }} />
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-4">
                          <span className="text-label-sm text-on-surface-variant">
                            {isComplete
                              ? "Quest completed"
                              : `${quest.userProgress || 0} / ${quest.goalValue} progress`}
                          </span>
                          <button
                            className={
                              isComplete
                                ? "rounded-xl bg-surface-container-high px-4 py-2 text-label-sm text-on-surface-variant"
                                : isActive
                                  ? "rounded-xl bg-primary px-4 py-2 text-label-sm text-on-primary shadow-[0_4px_14px_0_rgba(83,65,205,0.39)]"
                                  : "rounded-xl border border-outline-variant bg-surface px-4 py-2 text-label-sm text-primary"
                            }
                            disabled={isComplete || isActive || joiningId === quest._id}
                            onClick={() => !isComplete && !isActive && handleJoin(quest._id)}
                            type="button"
                          >
                            {joiningId === quest._id ? "Joining..." : ctaLabel}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </section>
            ) : null}
          </div>

          <StitchFooter />
        </main>
      </div>

      <StitchBottomNav activeKey="quests" />
    </div>
  );
};

export default EpicQuests;
