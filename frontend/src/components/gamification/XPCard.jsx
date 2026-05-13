import { Sparkles } from "lucide-react";
import Card from "../common/Card";
import LevelProgress from "./LevelProgress";
import { getLevelProgress } from "../../utils/levelUtils";

const XPCard = ({ user }) => {
  const progress = getLevelProgress(user.totalXP || 0);

  return (
    <Card className="bg-gradient-to-br from-white to-amber-50">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-[var(--color-secondary)]">Level {user.level || progress.level}</p>
          <h3 className="font-display text-3xl font-extrabold">{user.totalXP || 0} XP</h3>
          <p className="mt-1 text-xs font-bold text-[var(--color-secondary)]">{user.coins || 0} coins</p>
        </div>
        <div className="rounded-2xl bg-amber-100 p-3 text-[var(--color-xp)]">
          <Sparkles className="h-7 w-7" />
        </div>
      </div>
      <div className="mt-5">
        <LevelProgress totalXP={user.totalXP || 0} />
      </div>
    </Card>
  );
};

export default XPCard;
