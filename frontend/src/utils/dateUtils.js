export const formatShortDate = (date = new Date()) =>
  new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(date);
