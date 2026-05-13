import AnimatedNumber from "./AnimatedNumber";
import Card from "./Card";

const StatCard = ({
  accent = "var(--color-primary)",
  animate = true,
  helper,
  icon: Icon,
  label,
  prefix = "",
  suffix = "",
  value,
}) => (
  <Card className="hover-lift">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-[var(--color-secondary)]">{label}</p>
        <p className="mt-2 font-display text-3xl font-extrabold text-[var(--color-text)]">
          {animate && typeof value === "number" ? (
            <AnimatedNumber prefix={prefix} suffix={suffix} value={value} />
          ) : (
            `${prefix}${value}${suffix}`
          )}
        </p>
        {helper && <p className="mt-1 text-xs font-semibold text-[var(--color-muted)]">{helper}</p>}
      </div>
      {Icon && (
        <div className="rounded-2xl p-3" style={{ color: accent, background: `${accent}18` }}>
          <Icon className="h-5 w-5" />
        </div>
      )}
    </div>
  </Card>
);

export default StatCard;
