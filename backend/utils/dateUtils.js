const toDate = (date = new Date()) => {
  if (date instanceof Date) return new Date(date);

  if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const [year, month, day] = date.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  return new Date(date);
};

const pad = (value) => String(value).padStart(2, "0");

const getDateKey = (date = new Date()) => {
  const value = toDate(date);
  return `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}`;
};

const getYesterdayDateKey = (date = new Date()) => {
  const value = toDate(date);
  value.setDate(value.getDate() - 1);
  return getDateKey(value);
};

const getDayDifference = (dateKeyA, dateKeyB) => {
  const first = startOfDay(dateKeyA);
  const second = startOfDay(dateKeyB);
  const dayInMs = 24 * 60 * 60 * 1000;
  return Math.round((first.getTime() - second.getTime()) / dayInMs);
};

const startOfDay = (date = new Date()) => {
  const value = toDate(date);
  value.setHours(0, 0, 0, 0);
  return value;
};

const endOfDay = (date = new Date()) => {
  const value = toDate(date);
  value.setHours(23, 59, 59, 999);
  return value;
};

module.exports = { endOfDay, getDateKey, getDayDifference, getYesterdayDateKey, startOfDay };
