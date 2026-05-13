import { Target } from "lucide-react";
import Button from "../common/Button";
import Card from "../common/Card";
import ProgressBar from "../common/ProgressBar";

const DailyQuestCard = ({ completed = 2, total = 5 }) => (
  <Card className="bg-gradient-to-br from-[#f6f2fe] to-white">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-bold text-[var(--color-primary)]">Daily Quest</p>
        <h3 className="mt-1 font-display text-2xl font-extrabold">Complete {total} habits today</h3>
        <p className="mt-2 text-sm text-[var(--color-secondary)]">Finish your daily loop to earn a bonus streak shield.</p>
      </div>
      <div className="rounded-2xl bg-sky-100 p-3 text-[var(--color-quest)]">
        <Target className="h-7 w-7" />
      </div>
    </div>
    <div className="mt-5">
      <ProgressBar value={(completed / total) * 100} color="var(--color-quest)" />
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs font-bold text-[var(--color-secondary)]">{completed}/{total} completed</span>
        <Button variant="secondary">View quest</Button>
      </div>
    </div>
  </Card>
);

export default DailyQuestCard;
