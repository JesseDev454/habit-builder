const categoryMetadata = [
  {
    slug: "study",
    name: "Study",
    shortName: "Study",
    icon: "book",
    description: "Master new skills and expand your knowledge base.",
  },
  {
    slug: "coding",
    name: "Coding",
    shortName: "Coding",
    icon: "terminal",
    description: "Build your programming consistency.",
  },
  {
    slug: "reading",
    name: "Reading",
    shortName: "Reading",
    icon: "menu_book",
    description: "Expand your mind through literature and articles.",
  },
  {
    slug: "fitness",
    name: "Fitness",
    shortName: "Fitness",
    icon: "fitness_center",
    description: "Build physical strength and endurance.",
  },
  {
    slug: "water",
    name: "Water Intake",
    shortName: "Water",
    icon: "water_drop",
    description: "Stay hydrated for optimal performance.",
  },
  {
    slug: "wellness",
    name: "Wellness",
    shortName: "Wellness",
    icon: "spa",
    description: "Maintain mental and physical peace.",
  },
  {
    slug: "productivity",
    name: "Productivity",
    shortName: "Productivity",
    icon: "task",
    description: "Focus deeply and get things done efficiently.",
  },
  {
    slug: "spiritual-growth",
    name: "Spiritual Growth",
    shortName: "Spiritual",
    icon: "self_improvement",
    description: "Connect with your inner self and the universe.",
  },
  {
    slug: "sleep",
    name: "Sleep",
    shortName: "Sleep",
    icon: "bed",
    description: "Rest, recover, and prepare for tomorrow's quests.",
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

const getCategoryMeta = (value = "") => {
  const normalized = normalizeCategoryValue(value);

  return (
    categoryMetadata.find((category) => normalizeCategoryValue(category.slug) === normalized) ||
    categoryMetadata.find((category) => normalizeCategoryValue(category.name) === normalized) ||
    categoryMetadata.find((category) => normalizeCategoryValue(category.shortName) === normalized) ||
    null
  );
};

const normalizeCategoryName = (value = "") => getCategoryMeta(value)?.name || String(value).trim();

module.exports = {
  categoryMetadata,
  getCategoryMeta,
  normalizeCategoryName,
  normalizeCategoryValue,
};
