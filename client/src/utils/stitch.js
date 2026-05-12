import { findHabitCategory } from "../data/habitCategories";

export const DIFFICULTY_XP = {
  easy: 10,
  medium: 20,
  hard: 30,
};

export const getHabitIcon = (categoryName = "") =>
  findHabitCategory(categoryName)?.icon || "task_alt";

export const getDifficultyXp = (difficulty = "easy") =>
  DIFFICULTY_XP[difficulty] || DIFFICULTY_XP.easy;

export const formatWeeklyCompletionBars = (weekly = []) => {
  const source = Array.isArray(weekly) ? weekly : [];
  const max = Math.max(...source.map((entry) => entry.completions || 0), 1);

  return source.map((entry) => ({
    ...entry,
    heightPercent: Math.max(0, Math.round(((entry.completions || 0) / max) * 100)),
  }));
};

export const getBadgeIconName = (badgeName = "") => {
  const normalized = String(badgeName).trim().toLowerCase();

  if (normalized.includes("first step")) return "directions_walk";
  if (normalized.includes("spark")) return "bolt";
  if (normalized.includes("consistency")) return "workspace_premium";
  if (normalized.includes("weekly warrior")) return "emoji_events";
  if (normalized.includes("level")) return "star";
  if (normalized.includes("comeback")) return "shield";
  if (normalized.includes("quest")) return "rocket_launch";

  return "military_tech";
};

export const getBadgeTone = (badgeName = "") => {
  const normalized = String(badgeName).trim().toLowerCase();

  if (normalized.includes("first step")) {
    return {
      bgClass: "bg-secondary-fixed",
      textClass: "text-on-secondary-fixed",
    };
  }

  if (normalized.includes("spark")) {
    return {
      bgClass: "bg-tertiary-fixed",
      textClass: "text-on-tertiary-fixed",
    };
  }

  return {
    bgClass: "bg-primary-fixed",
    textClass: "text-on-primary-fixed",
  };
};
