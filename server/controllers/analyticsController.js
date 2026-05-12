const Habit = require("../models/Habit");
const HabitLog = require("../models/HabitLog");
const { endOfDay, getDateKey, startOfDay } = require("../utils/dateUtils");

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getWeekStart = (date = new Date()) => {
  const value = startOfDay(date);
  const day = value.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  value.setDate(value.getDate() + diff);
  return value;
};

const getWeekDates = () => {
  const weekStart = getWeekStart();
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    return date;
  });
};

const countLogsByHabit = async (userId) => {
  const rows = await HabitLog.aggregate([
    { $match: { user: userId } },
    { $group: { _id: "$habit", completions: { $sum: 1 } } },
  ]);

  return new Map(rows.map((row) => [row._id.toString(), row.completions]));
};

const getBestAndWeakestHabits = async (userId, activeHabits) => {
  if (activeHabits.length === 0) return { bestHabit: null, weakestHabit: null };

  const completionMap = await countLogsByHabit(userId);
  const habitsWithCounts = activeHabits.map((habit) => ({
    _id: habit._id,
    name: habit.name,
    completions: completionMap.get(habit._id.toString()) || 0,
  }));

  const sorted = [...habitsWithCounts].sort((a, b) => b.completions - a.completions);
  const weakest = [...habitsWithCounts].sort((a, b) => a.completions - b.completions);

  return { bestHabit: sorted[0] || null, weakestHabit: weakest[0] || null };
};

const getAnalyticsSummary = async (req, res, next) => {
  try {
    const weekStart = getWeekStart();
    const weekEnd = endOfDay(new Date());

    const [activeHabits, archivedHabits, totalCompletions, completionsThisWeek] = await Promise.all([
      Habit.find({ user: req.user._id, isArchived: false }),
      Habit.countDocuments({ user: req.user._id, isArchived: true }),
      HabitLog.countDocuments({ user: req.user._id }),
      HabitLog.countDocuments({ user: req.user._id, completedAt: { $gte: weekStart, $lte: weekEnd } }),
    ]);

    const completionRate = activeHabits.length
      ? Math.min(100, Math.round((completionsThisWeek / (activeHabits.length * 7)) * 100))
      : 0;
    const { bestHabit, weakestHabit } = await getBestAndWeakestHabits(req.user._id, activeHabits);

    res.status(200).json({
      summary: {
        totalHabits: activeHabits.length,
        archivedHabits,
        totalCompletions,
        completionsThisWeek,
        completionRate,
        bestHabit,
        weakestHabit,
        bestCurrentStreak: activeHabits.reduce((best, habit) => Math.max(best, habit.currentStreak || 0), 0),
        longestStreak: activeHabits.reduce((best, habit) => Math.max(best, habit.longestStreak || 0), 0),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getWeeklyAnalytics = async (req, res, next) => {
  try {
    const dates = getWeekDates();
    const dateKeys = dates.map((date) => getDateKey(date));
    const logs = await HabitLog.aggregate([
      { $match: { user: req.user._id, dateKey: { $in: dateKeys } } },
      { $group: { _id: "$dateKey", completions: { $sum: 1 } } },
    ]);
    const countMap = new Map(logs.map((row) => [row._id, row.completions]));

    res.status(200).json({
      weekly: dates.map((date) => ({
        day: dayNames[date.getDay()],
        date: getDateKey(date),
        completions: countMap.get(getDateKey(date)) || 0,
      })),
    });
  } catch (error) {
    next(error);
  }
};

const getHeatmapData = async (req, res, next) => {
  try {
    const days = Math.min(Math.max(Number(req.query.days) || 90, 1), 180);
    const today = startOfDay();
    const start = new Date(today);
    start.setDate(today.getDate() - (days - 1));

    const allDates = Array.from({ length: days }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      return getDateKey(date);
    });

    const rows = await HabitLog.aggregate([
      { $match: { user: req.user._id, dateKey: { $in: allDates } } },
      { $group: { _id: "$dateKey", count: { $sum: 1 } } },
    ]);
    const countMap = new Map(rows.map((row) => [row._id, row.count]));

    res.status(200).json({
      heatmap: allDates.map((date) => ({ date, count: countMap.get(date) || 0 })),
    });
  } catch (error) {
    next(error);
  }
};

const getHabitStats = async (req, res, next) => {
  try {
    const habit = await Habit.findOne({ _id: req.params.id, user: req.user._id });
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    const weekStart = getWeekStart();
    const [totalCompletions, completionsThisWeek, recentLogs] = await Promise.all([
      HabitLog.countDocuments({ user: req.user._id, habit: habit._id }),
      HabitLog.countDocuments({ user: req.user._id, habit: habit._id, completedAt: { $gte: weekStart } }),
      HabitLog.find({ user: req.user._id, habit: habit._id }).sort({ completedAt: -1 }).limit(8),
    ]);

    res.status(200).json({
      stats: {
        habitId: habit._id,
        totalCompletions,
        completionsThisWeek,
        currentStreak: habit.currentStreak || 0,
        longestStreak: habit.longestStreak || 0,
        recentLogs,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAnalyticsSummary, getHabitStats, getHeatmapData, getWeeklyAnalytics };
