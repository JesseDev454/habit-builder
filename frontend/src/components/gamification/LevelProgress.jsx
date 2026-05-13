import ProgressBar from "../common/ProgressBar";
import { getLevelProgress } from "../../utils/levelUtils";

const LevelProgress = ({ totalXP = 0 }) => {
  const progress = getLevelProgress(totalXP);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs font-bold text-[var(--color-secondary)]">
        <span>{progress.xpIntoLevel} XP into Level {progress.level}</span>
        <span>{progress.xpNeededForNextLevel ? `${progress.xpNeededForNextLevel} XP left` : "Max level"}</span>
      </div>
      <ProgressBar value={progress.progressPercent} color="var(--color-xp)" />
    </div>
  );
};

export default LevelProgress;
