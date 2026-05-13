export const buildHabitSearchPath = (query = "") => {
  const trimmed = String(query).trim();

  if (!trimmed) {
    return "/daily-habits";
  }

  return `/daily-habits?search=${encodeURIComponent(trimmed)}`;
};

export const normalizeSearchText = (value = "") =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
