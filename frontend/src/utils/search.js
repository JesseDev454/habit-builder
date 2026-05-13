export const buildHabitSearchTarget = (query = "") => {
  const trimmed = String(query).trim();

  if (!trimmed) {
    return {
      pathname: "/daily-habits",
    };
  }

  return {
    pathname: "/daily-habits",
    state: {
      habitSearchQuery: trimmed,
    },
  };
};

export const normalizeSearchText = (value = "") =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
