import { Link } from "react-router-dom";
import MaterialIcon from "../common/MaterialIcon";

const iconByCategory = {
  Coding: "code",
  Study: "school",
  Reading: "menu_book",
  Fitness: "fitness_center",
  "Water Intake": "water_drop",
  Wellness: "self_improvement",
  Productivity: "task_alt",
  "Spiritual Growth": "spa",
  Sleep: "bedtime",
};

const accentByCategory = {
  Coding: "text-primary",
  Study: "text-primary",
  Reading: "text-quest-blue",
  Fitness: "text-streak-orange",
  "Water Intake": "text-success-green",
  Wellness: "text-success-green",
  Productivity: "text-primary",
  "Spiritual Growth": "text-badge-pink",
  Sleep: "text-secondary",
};

const xpByDifficulty = {
  easy: 10,
  medium: 20,
  hard: 30,
};

const referenceStreakByName = [
  { match: "code", streak: 12 },
  { match: "read", streak: 3 },
  { match: "drink", streak: 5 },
];

const referenceDescriptionByName = [
  { match: "code", description: "Deep work session" },
  { match: "read", description: "Fiction or Non-fiction" },
  { match: "drink", description: "Stay hydrated" },
  { match: "study", description: "Focused learning block" },
  { match: "workout", description: "Move your body" },
  { match: "sleep", description: "Protect your recovery" },
  { match: "pray", description: "Quiet reflection time" },
  { match: "meditate", description: "Quiet reflection time" },
  { match: "review", description: "Keep lessons fresh" },
];

const formatTarget = (habit) => {
  if (habit.targetType === "count") return `${habit.targetValue} times`;
  return habit.targetValue > 1 ? `${habit.targetValue} completions` : "1 completion";
};

const findByName = (habit, items, key) => {
  const name = habit.name?.toLowerCase() || "";
  return items.find((item) => name.includes(item.match))?.[key];
};

const HabitCard = ({ habit, onComplete, completing = false }) => {
  const completed = Boolean(habit.completedToday);
  const icon = iconByCategory[habit.category] || "check_circle";
  const accent = accentByCategory[habit.category] || "text-primary";
  const xpReward = xpByDifficulty[habit.difficulty] || 10;
  const streak = habit.currentStreak || findByName(habit, referenceStreakByName, "streak") || 0;
  const description = habit.description || findByName(habit, referenceDescriptionByName, "description") || `${habit.category} quest | ${habit.frequency} | Target: ${formatTarget(habit)}`;

  return (
    <div className={`${completed ? "border border-border-neutral bg-surface opacity-70" : "hover-lift border border-transparent bg-card-surface hover:border-border-neutral"} group flex items-center gap-3 rounded-xl p-4 shadow-[0_4px_12px_rgba(15,23,42,0.05)] transition-all sm:gap-4`}>
      <div className={`${completed ? "bg-success-green/10 text-success-green" : `bg-surface-container ${accent}`} flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg`}>
        <MaterialIcon name={completed ? "check_circle" : icon} className="text-2xl" />
      </div>
      <div className="min-w-0 flex-1">
        <Link to={`/habits/${habit._id}`} className={`${completed ? "line-through" : ""} block truncate text-base font-medium text-text-primary transition-colors hover:text-primary`}>
          {habit.name}
        </Link>
        <p className="mt-0.5 truncate text-sm text-text-secondary">{description}</p>
      </div>
      <div className="hidden items-center gap-1 rounded-md bg-surface-container px-2 py-1 sm:flex">
        <MaterialIcon name="local_fire_department" fill className="text-[14px] text-streak-orange" />
        <span className="text-[12px] font-medium text-text-primary">{streak}</span>
      </div>
      <div className={`${completed ? "text-text-secondary" : "text-xp-gold"} mr-2 flex w-16 justify-end gap-1 text-sm font-medium`}>
        {completed ? "Done" : `+${xpReward} XP`}
      </div>
      <div className="flex flex-shrink-0 items-center gap-1 sm:gap-2">
        <Link className="hidden h-9 w-9 items-center justify-center rounded-full text-text-secondary opacity-0 transition-all hover:bg-surface-container hover:text-primary group-hover:opacity-100 md:inline-flex" to={`/habits/${habit._id}/edit`} aria-label={`Edit ${habit.name}`}>
          <MaterialIcon name="edit" className="text-[18px]" />
        </Link>
        <button
          className={`${completed ? "cursor-not-allowed bg-surface-variant text-text-secondary" : "bg-primary text-white hover:bg-on-primary-fixed-variant"} rounded-lg px-3 py-2 text-sm font-medium shadow-sm transition-all duration-200 active:scale-95 disabled:cursor-wait disabled:opacity-70 sm:px-4`}
          disabled={completed || completing}
          onClick={() => onComplete?.(habit._id)}
          type="button"
        >
          {completing ? "Completing..." : completed ? "Completed" : "Complete"}
        </button>
      </div>
    </div>
  );
};

export default HabitCard;
