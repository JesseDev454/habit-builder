import Card from "../common/Card";
import ProgressBar from "../common/ProgressBar";

const BadgeCard = ({ badge }) => {
  const unlocked = badge.isUnlocked ?? badge.unlocked;
  const colorByRarity = {
    common: "var(--color-primary)",
    rare: "var(--color-badge)",
    epic: "var(--color-xp)",
  };
  const tone = colorByRarity[badge.rarity] || "var(--color-primary)";

  return (
    <Card className={`hover-lift ${unlocked ? "" : "opacity-70 grayscale"}`}>
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl" style={{ background: `${tone}18` }}>
          {badge.icon || "🏅"}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-bold">{badge.name}</h3>
          <p className="mt-1 text-sm text-[var(--color-secondary)]">{badge.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-surface-container px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-text-secondary">{badge.category}</span>
            <span className="rounded-full px-2 py-1 text-[11px] font-bold uppercase tracking-wide" style={{ background: `${tone}18`, color: tone }}>{badge.rarity}</span>
          </div>
          {unlocked ? (
            <p className="mt-3 text-xs font-bold uppercase tracking-wide text-success-green">
              Unlocked{badge.unlockedAt ? ` on ${new Date(badge.unlockedAt).toLocaleDateString()}` : ""}
            </p>
          ) : (
            <div className="mt-4">
              <div className="mb-1 flex justify-between text-xs font-bold text-text-secondary">
                <span>Progress</span>
                <span>{badge.progressPercent || 0}%</span>
              </div>
              <ProgressBar value={badge.progressPercent || 0} color={tone} />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default BadgeCard;
