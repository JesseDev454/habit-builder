export const FALLBACK_USER = {
  name: "Jesse",
  email: "jesse@habitquest.com",
  totalXP: 420,
  level: 3,
  coins: 420,
};

export const CATEGORY_DEFINITIONS = [
  {
    label: "Study",
    habitCategory: "Study",
    slug: "study",
    icon: "book",
    iconWrapClass: "bg-secondary-fixed text-on-secondary-fixed",
    glowClass: "bg-primary-fixed/30",
    description: "Master new skills and expand your knowledge base.",
    fallbackStreak: 12,
    fallbackHabitCount: 4,
    fallbackProgress: 85,
  },
  {
    label: "Coding",
    habitCategory: "Coding",
    slug: "coding",
    icon: "terminal",
    iconWrapClass: "bg-tertiary-container text-on-tertiary-container",
    glowClass: "bg-tertiary-fixed/30",
    description: "Write clean code daily and build epic projects.",
    fallbackStreak: 5,
    fallbackHabitCount: 2,
    fallbackProgress: 60,
  },
  {
    label: "Reading",
    habitCategory: "Reading",
    slug: "reading",
    icon: "menu_book",
    iconWrapClass: "bg-primary-fixed-dim text-on-primary-fixed",
    glowClass: "bg-primary-container/20",
    description: "Expand your mind through literature and articles.",
    fallbackStreak: 20,
    fallbackHabitCount: 3,
    fallbackProgress: 90,
  },
  {
    label: "Fitness",
    habitCategory: "Fitness",
    slug: "fitness",
    icon: "fitness_center",
    iconWrapClass: "bg-error-container text-on-error-container",
    glowClass: "bg-error-container/30",
    description: "Build physical strength and endurance.",
    fallbackStreak: 8,
    fallbackHabitCount: 5,
    fallbackProgress: 75,
  },
  {
    label: "Water",
    habitCategory: "Water Intake",
    slug: "water-intake",
    icon: "water_drop",
    iconWrapClass: "bg-secondary-fixed-dim text-on-secondary-fixed",
    glowClass: "bg-secondary-fixed/40",
    description: "Stay hydrated for optimal performance.",
    fallbackStreak: 30,
    fallbackHabitCount: 1,
    fallbackProgress: 100,
  },
  {
    label: "Wellness",
    habitCategory: "Wellness",
    slug: "wellness",
    icon: "spa",
    iconWrapClass: "bg-surface-variant text-on-surface",
    glowClass: "bg-surface-container-high/100",
    description: "Maintain mental and physical peace.",
    fallbackStreak: 4,
    fallbackHabitCount: 3,
    fallbackProgress: 50,
  },
  {
    label: "Productivity",
    habitCategory: "Productivity",
    slug: "productivity",
    icon: "task",
    iconWrapClass: "bg-primary-container text-on-primary-container",
    glowClass: "bg-primary/10",
    description: "Focus deeply and get things done efficiently.",
    fallbackStreak: 15,
    fallbackHabitCount: 6,
    fallbackProgress: 80,
  },
  {
    label: "Spiritual",
    habitCategory: "Spiritual Growth",
    slug: "spiritual-growth",
    icon: "self_improvement",
    iconWrapClass: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    glowClass: "bg-tertiary-fixed-dim/30",
    description: "Connect with your inner self and the universe.",
    fallbackStreak: 10,
    fallbackHabitCount: 2,
    fallbackProgress: 70,
  },
  {
    label: "Sleep",
    habitCategory: "Sleep",
    slug: "sleep",
    icon: "bed",
    iconWrapClass: "bg-primary-fixed text-on-primary-fixed-variant",
    glowClass: "bg-primary-fixed-dim/20",
    description: "Rest, recover, and prepare for tomorrow's quests.",
    fallbackStreak: 7,
    fallbackHabitCount: 1,
    fallbackProgress: 65,
  },
];

export const FALLBACK_HABITS = [
  { _id: "fallback-code", name: "Code for 1 hour", description: "Deep work session", category: "Coding", difficulty: "hard", frequency: "daily", currentStreak: 4, longestStreak: 6, completedToday: false, totalCompletions: 12 },
  { _id: "fallback-read", name: "Read for 20 minutes", description: "Fiction or learning notes", category: "Reading", difficulty: "easy", frequency: "daily", currentStreak: 3, longestStreak: 5, completedToday: false, totalCompletions: 10 },
  { _id: "fallback-study", name: "Study for 2 hours", description: "Focused study block", category: "Study", difficulty: "hard", frequency: "daily", currentStreak: 2, longestStreak: 4, completedToday: false, totalCompletions: 8 },
  { _id: "fallback-water", name: "Drink 8 cups of water", description: "Stay hydrated", category: "Water Intake", difficulty: "easy", frequency: "daily", currentStreak: 12, longestStreak: 14, completedToday: true, totalCompletions: 30 },
  { _id: "fallback-sleep", name: "Sleep before 11 PM", description: "Wind down early", category: "Sleep", difficulty: "medium", frequency: "daily", currentStreak: 4, longestStreak: 6, completedToday: false, totalCompletions: 9 },
];

export const DIFFICULTY_XP = {
  easy: 10,
  medium: 20,
  hard: 30,
};

export const FREQUENCY_OPTIONS = ["daily", "weekly"];

export const dayInitials = ["M", "T", "W", "T", "F", "S", "S"];

export const getCategoryBySlug = (slug = "") =>
  CATEGORY_DEFINITIONS.find((category) => category.slug === slug);

export const getCategoryByName = (name = "") => {
  const normalized = name.trim().toLowerCase();

  return CATEGORY_DEFINITIONS.find(
    (category) =>
      category.habitCategory.toLowerCase() === normalized ||
      category.label.toLowerCase() === normalized
  );
};

export const toCategorySlug = (name = "") =>
  name
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const normalizeHabitCategory = (name = "") => {
  const category = getCategoryByName(name);
  return category?.habitCategory || name;
};

export const getHabitIcon = (categoryName = "") => {
  const category = getCategoryByName(categoryName);
  return category?.icon || "task_alt";
};

export const getDifficultyXp = (difficulty = "easy") =>
  DIFFICULTY_XP[difficulty] || DIFFICULTY_XP.easy;

export const getLevelProgress = (totalXP = 0) => {
  const safeXp = Number(totalXP) || 0;
  const currentLevel = Math.max(1, Math.floor(safeXp / 150) + 1);
  const levelFloor = (currentLevel - 1) * 150;
  const levelCeiling = currentLevel * 150;
  const progressValue = safeXp - levelFloor;
  const progressMax = levelCeiling - levelFloor;
  const progressPercent = progressMax ? Math.min(100, Math.round((progressValue / progressMax) * 100)) : 0;

  return {
    level: currentLevel,
    progressValue,
    progressMax,
    progressPercent,
  };
};

export const formatWeeklyCompletionBars = (weekly = []) => {
  const fallback = [
    { day: "Mon", completions: 2 },
    { day: "Tue", completions: 3 },
    { day: "Wed", completions: 4 },
    { day: "Thu", completions: 2 },
    { day: "Fri", completions: 5 },
    { day: "Sat", completions: 1 },
    { day: "Sun", completions: 2 },
  ];

  const source = weekly.length ? weekly : fallback;
  const max = Math.max(...source.map((entry) => entry.completions || 0), 1);

  return source.map((entry) => ({
    ...entry,
    heightPercent: Math.max(0, Math.round(((entry.completions || 0) / max) * 100)),
  }));
};

export const getDisplayHabits = (habits = []) =>
  habits.length ? habits : FALLBACK_HABITS;
