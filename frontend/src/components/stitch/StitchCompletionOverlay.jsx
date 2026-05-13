import MaterialIcon from "../common/MaterialIcon";
import { getBadgeIconName, getBadgeTone } from "../../utils/stitch";

const StitchCompletionOverlay = ({ open, rewards, onClose }) => {
  if (!open) return null;

  const unlockedBadges = rewards?.unlockedBadges || [];
  const leveledUp = Boolean(rewards?.leveledUp);
  const title = leveledUp
    ? `Level ${rewards?.newLevel || ""} Reached!`
    : unlockedBadges.length > 0
      ? "Badge Unlocked!"
      : "Quest Complete!";
  const message = leveledUp
    ? "Your consistency just pushed you into a new rank. Keep the momentum going."
    : unlockedBadges.length > 0
      ? "You unlocked a new reward for staying consistent."
      : "Nice work. You're one step closer to your next level.";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-on-background/10 px-4 backdrop-blur-sm">
      <div className="animate-[popIn_0.3s_ease-out] relative w-full max-w-[24rem] rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-6 text-center shadow-2xl">
        <div className="absolute -left-6 -top-6 h-12 w-12 rounded-full bg-secondary/20 blur-xl" />
        <div className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-primary/20 blur-xl" />
        <div className="relative z-10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-surface-container-lowest bg-primary shadow-lg shadow-primary/30">
          <MaterialIcon
            className="text-3xl text-on-primary"
            fill
            name={leveledUp ? "military_tech" : unlockedBadges.length > 0 ? "workspace_premium" : "verified"}
          />
        </div>
        <h3 className="relative z-10 mb-2 text-2xl text-on-background font-display-xl">
          {title}
        </h3>
        <div className="relative z-10 mb-4 flex flex-wrap justify-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-tertiary-fixed px-3 py-1 text-label-sm font-bold text-on-tertiary-fixed shadow-sm">
            <MaterialIcon className="text-sm" name="stars" /> +{rewards?.xpEarned || 0} XP
          </span>
          <span className="flex items-center gap-1 rounded-full bg-surface-container px-3 py-1 text-label-sm text-on-surface shadow-sm">
            <MaterialIcon className="text-sm text-tertiary" name="local_fire_department" /> Streak updated
          </span>
          {leveledUp ? (
            <span className="flex items-center gap-1 rounded-full bg-primary-container px-3 py-1 text-label-sm font-bold text-on-primary-container shadow-sm">
              <MaterialIcon className="text-sm" fill name="star" /> Level {rewards?.newLevel || 1}
            </span>
          ) : null}
        </div>
        <p className="relative z-10 mb-6 text-body-base text-on-surface-variant">
          {message}
        </p>
        {unlockedBadges.length > 0 ? (
          <div className="relative z-10 mb-6 space-y-3">
            {unlockedBadges.map((badge) => {
              const tone = getBadgeTone(badge.name);

              return (
                <div
                  className="flex items-center gap-3 rounded-xl bg-surface-container p-3 text-left shadow-sm animate-[popIn_0.35s_ease-out]"
                  key={badge._id || badge.name}
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${tone.bgClass}`}>
                    <MaterialIcon className={`text-2xl ${tone.textClass}`} fill name={getBadgeIconName(badge.name)} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-label-sm text-on-surface">{badge.name}</p>
                    <p className="text-[12px] text-on-surface-variant">{badge.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
        <button
          className="relative z-10 w-full cursor-pointer rounded-xl bg-surface-container-high py-3 text-label-sm text-on-surface shadow-sm transition-colors duration-100 hover:bg-surface-variant active:scale-95"
          onClick={onClose}
          type="button"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default StitchCompletionOverlay;
