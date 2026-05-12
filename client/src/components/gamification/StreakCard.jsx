import { Flame } from "lucide-react";
import Card from "../common/Card";

const StreakCard = ({ label, value, tone = "var(--color-streak)" }) => (
  <Card className="hover-lift">
    <div className="flex items-center gap-4">
      <div className="rounded-2xl p-3" style={{ background: `${tone}18`, color: tone }}>
        <Flame className="h-7 w-7 fill-current" />
      </div>
      <div>
        <p className="text-sm font-bold text-[var(--color-secondary)]">{label}</p>
        <p className="font-display text-3xl font-extrabold">{value} days</p>
      </div>
    </div>
  </Card>
);

export default StreakCard;
