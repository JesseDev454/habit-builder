import { Award, CheckCircle2, Coins, Flame, Sparkles, Trophy, X } from "lucide-react";
import Button from "./Button";

const RewardItem = ({ icon: Icon, label, value, tone }) => (
  <div className="rounded-2xl bg-surface-container-low p-4 text-left">
    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full" style={{ background: `${tone}18`, color: tone }}>
      <Icon className="h-5 w-5" />
    </div>
    <p className="text-xs font-bold uppercase tracking-wide text-text-secondary">{label}</p>
    <p className="mt-1 text-lg font-extrabold text-text-primary">{value}</p>
  </div>
);

const SuccessModal = ({
  title = "Quest Complete!",
  message = "Nice work. Your streak is still alive.",
  onClose,
  rewards,
}) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
    <div className="w-full max-w-[36rem] rounded-3xl border border-white/70 bg-white p-6 text-center shadow-2xl">
      <button className="ml-auto block rounded-full p-2 text-text-muted transition hover:bg-surface-container-low hover:text-text-primary" onClick={onClose} type="button">
        <X className="h-4 w-4" />
      </button>
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success-green/10 text-success-green">
        <CheckCircle2 className="h-8 w-8" />
      </div>
      <h3 className="font-display text-2xl font-bold text-text-primary">{title}</h3>
      <p className="mx-auto mt-2 w-full max-w-[24rem] whitespace-normal text-sm text-text-secondary">{message}</p>

      {rewards ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <RewardItem icon={Sparkles} label="XP earned" tone="var(--color-xp)" value={`+${rewards.xpEarned || 0} XP`} />
          <RewardItem icon={Coins} label="Coins" tone="var(--color-xp)" value={`+${rewards.coinsEarned || 0}`} />
          <RewardItem icon={Flame} label="Streak" tone="var(--color-streak)" value={`${rewards.currentStreak || 0} days`} />
        </div>
      ) : null}

      {rewards?.leveledUp ? (
        <div className="mt-4 rounded-2xl border border-xp-gold/30 bg-amber-50 p-4 text-left">
          <p className="flex items-center gap-2 font-bold text-text-primary">
            <Trophy className="h-5 w-5 text-xp-gold" /> Level up! You reached Level {rewards.newLevel}.
          </p>
        </div>
      ) : null}

      {rewards?.unlockedBadges?.length ? (
        <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-left">
          <p className="mb-3 flex items-center gap-2 font-bold text-text-primary">
            <Award className="h-5 w-5 text-primary" /> New badge unlocked!
          </p>
          <div className="grid gap-2">
            {rewards.unlockedBadges.map((badge) => (
              <div key={badge._id || badge.name} className="flex items-center gap-3 rounded-xl bg-white p-3">
                <span className="text-2xl">{badge.icon}</span>
                <div>
                  <p className="font-bold text-text-primary">{badge.name}</p>
                  <p className="text-xs text-text-secondary">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <Button className="mt-6 w-full sm:w-auto" onClick={onClose}>Continue Questing</Button>
    </div>
  </div>
);

export default SuccessModal;
