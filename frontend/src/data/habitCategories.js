export const habitCategories = [
  {
    id: "study",
    name: "Study",
    shortName: "Study",
    description: "Master new skills and expand your knowledge base.",
    icon: "book",
  },
  {
    id: "coding",
    name: "Coding",
    shortName: "Coding",
    description: "Build your programming consistency.",
    icon: "terminal",
  },
  {
    id: "reading",
    name: "Reading",
    shortName: "Reading",
    description: "Expand your mind through literature and articles.",
    icon: "menu_book",
  },
  {
    id: "fitness",
    name: "Fitness",
    shortName: "Fitness",
    description: "Build physical strength and endurance.",
    icon: "fitness_center",
  },
  {
    id: "water",
    name: "Water Intake",
    shortName: "Water",
    description: "Stay hydrated for optimal performance.",
    icon: "water_drop",
  },
  {
    id: "wellness",
    name: "Wellness",
    shortName: "Wellness",
    description: "Maintain mental and physical peace.",
    icon: "spa",
  },
  {
    id: "productivity",
    name: "Productivity",
    shortName: "Productivity",
    description: "Focus deeply and get things done efficiently.",
    icon: "task",
  },
  {
    id: "spiritual-growth",
    name: "Spiritual Growth",
    shortName: "Spiritual",
    description: "Connect with your inner self and the universe.",
    icon: "self_improvement",
  },
  {
    id: "sleep",
    name: "Sleep",
    shortName: "Sleep",
    description: "Rest, recover, and prepare for tomorrow's quests.",
    icon: "bed",
  },
];

const normalizeCategoryValue = (value = "") =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const findHabitCategory = (value = "") => {
  const normalized = normalizeCategoryValue(value);

  return (
    habitCategories.find((category) => normalizeCategoryValue(category.id) === normalized) ||
    habitCategories.find((category) => normalizeCategoryValue(category.name) === normalized) ||
    habitCategories.find((category) => normalizeCategoryValue(category.shortName) === normalized) ||
    null
  );
};

export const normalizeHabitCategory = (value = "") =>
  findHabitCategory(value)?.name || String(value).trim();

export const getCategorySlug = (value = "") =>
  findHabitCategory(value)?.id ||
  String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
