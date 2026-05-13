import MaterialIcon from "../common/MaterialIcon";

const chipTones = {
  Career: "bg-info-blue/10 text-info-blue",
  Learning: "bg-primary/10 text-primary",
  Health: "bg-quest-blue/10 text-quest-blue",
  Mindfulness: "bg-badge-pink/10 text-badge-pink",
};

const HabitPreviewCard = ({ template, selected = false, onToggle, disabled = false }) => (
  <button
    className={`glass-card ambient-card hover-lift relative flex min-h-[220px] cursor-pointer flex-col gap-md rounded-xl p-md text-left transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-70 ${
      selected ? "border-2 border-primary bg-primary/5" : "border border-border-neutral bg-card-surface"
    }`}
    disabled={disabled}
    onClick={onToggle}
    type="button"
  >
    <div className={`absolute right-md top-md transition-colors ${selected ? "text-primary" : "text-text-muted group-hover:text-primary"}`}>
      <MaterialIcon className="text-[24px]" fill={selected} name={selected ? "check_circle" : "add_circle"} />
    </div>

    <div className={`${selected ? "bg-primary-container text-on-primary-container" : "bg-surface-container-high text-tertiary"} flex h-12 w-12 items-center justify-center rounded-full`}>
      <MaterialIcon className="text-section-heading" name={template.icon} />
    </div>

    <div>
      <h3 className="mb-tiny pr-8 font-card-heading text-card-heading font-semibold leading-snug text-text-primary">{template.name}</h3>
      <div className="flex flex-wrap items-center gap-xs">
        <span className={`${chipTones[template.displayCategory] || "bg-primary/10 text-primary"} rounded px-2 py-1 text-label-sm font-medium`}>
          {template.displayCategory}
        </span>
        <span className="text-label-sm font-medium text-text-secondary">{template.cadence}</span>
      </div>
    </div>

    <div className="mt-auto flex items-center justify-between border-t border-border-neutral pt-sm">
      <div className="flex items-center gap-tiny font-bold text-xp-gold">
        <MaterialIcon className="text-[18px]" name="bolt" />
        <span>+{template.xpReward} XP</span>
      </div>
    </div>
  </button>
);

export default HabitPreviewCard;
