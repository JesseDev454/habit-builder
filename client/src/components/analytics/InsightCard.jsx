import Card from "../common/Card";

const InsightCard = ({ label, value, helper, icon: Icon, color = "var(--color-primary)" }) => (
  <Card>
    <div className="flex items-start gap-4">
      {Icon && (
        <div className="rounded-2xl p-3" style={{ background: `${color}18`, color }}>
          <Icon className="h-6 w-6" />
        </div>
      )}
      <div>
        <p className="text-sm font-bold text-[var(--color-secondary)]">{label}</p>
        <p className="mt-1 font-display text-2xl font-extrabold">{value}</p>
        {helper && <p className="mt-1 text-xs font-semibold text-[var(--color-muted)]">{helper}</p>}
      </div>
    </div>
  </Card>
);

export default InsightCard;
