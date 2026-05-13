const Habit = require("../models/Habit");
const HabitLog = require("../models/HabitLog");
const UserBadge = require("../models/UserBadge");
const { categoryMetadata, getCategoryMeta, normalizeCategoryName } = require("../utils/categoryUtils");
const { endOfDay, getDateKey, startOfDay } = require("../utils/dateUtils");
const { getLevelProgress } = require("../utils/levelUtils");

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getWeekStart = (date = new Date()) => {
  const value = startOfDay(date);
  const day = value.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  value.setDate(value.getDate() + diff);
  return value;
};

const getWeekDates = (date = new Date()) => {
  const weekStart = getWeekStart(date);
  return Array.from({ length: 7 }, (_, index) => {
    const nextDate = new Date(weekStart);
    nextDate.setDate(weekStart.getDate() + index);
    return nextDate;
  });
};

const sum = (values = []) => values.reduce((total, value) => total + value, 0);

const mapLevelProgress = (totalXP = 0) => {
  const progress = getLevelProgress(totalXP);

  return {
    level: progress.level,
    currentLevelXp: progress.currentLevelXP,
    nextLevelXp: progress.nextLevelXP,
    xpIntoLevel: progress.xpIntoLevel,
    xpNeededForNextLevel: progress.xpNeededForNextLevel,
    progressPercent: progress.progressPercent,
  };
};

const serializeBadge = (userBadge) => ({
  _id: userBadge.badge?._id,
  name: userBadge.badge?.name,
  description: userBadge.badge?.description,
  icon: userBadge.badge?.icon,
  rarity: userBadge.badge?.rarity,
  unlockedAt: userBadge.unlockedAt,
});

const getRecentBadges = async (userId, limit = 3) => {
  const userBadges = await UserBadge.find({ user: userId })
    .populate("badge")
    .sort({ unlockedAt: -1 })
    .limit(limit);

  return userBadges.filter((entry) => entry.badge).map(serializeBadge);
};

const buildWeeklySeries = (rows, dates) => {
  const countMap = new Map(rows.map((row) => [row._id, row.completions]));

  return dates.map((date) => ({
    day: dayNames[date.getDay()],
    date: getDateKey(date),
    completions: countMap.get(getDateKey(date)) || 0,
  }));
};

const getWeeklySeries = async (match, date = new Date()) => {
  const dates = getWeekDates(date);
  const dateKeys = dates.map((entry) => getDateKey(entry));
  const rows = await HabitLog.aggregate([
    { $match: { ...match, dateKey: { $in: dateKeys } } },
    { $group: { _id: "$dateKey", completions: { $sum: 1 } } },
  ]);

  return buildWeeklySeries(rows, dates);
};

const getHeatmapSeries = async (match, days = 90) => {
  const safeDays = Math.min(Math.max(Number(days) || 90, 1), 180);
  const today = startOfDay();
  const start = new Date(today);
  start.setDate(today.getDate() - (safeDays - 1));

  const allDates = Array.from({ length: safeDays }, (_, index) => {
    const nextDate = new Date(start);
    nextDate.setDate(start.getDate() + index);
    return getDateKey(nextDate);
  });

  const rows = await HabitLog.aggregate([
    { $match: { ...match, dateKey: { $in: allDates } } },
    { $group: { _id: "$dateKey", count: { $sum: 1 } } },
  ]);
  const countMap = new Map(rows.map((row) => [row._id, row.count]));

  return allDates.map((date) => ({
    date,
    count: countMap.get(date) || 0,
  }));
};

const getBestAndWeakestHabits = (activeHabits, completionMap) => {
  if (activeHabits.length === 0) return { bestHabit: null, weakestHabit: null };

  const habitsWithCounts = activeHabits.map((habit) => ({
    _id: habit._id,
    name: habit.name,
    category: habit.category,
    completions: completionMap.get(habit._id.toString()) || 0,
  }));

  const sorted = [...habitsWithCounts].sort((a, b) => b.completions - a.completions);
  const weakest = [...habitsWithCounts].sort((a, b) => a.completions - b.completions);

  return { bestHabit: sorted[0] || null, weakestHabit: weakest[0] || null };
};

const getHabitCompletionMap = async (userId, habitIds) => {
  if (!habitIds.length) return new Map();

  const rows = await HabitLog.aggregate([
    { $match: { user: userId, habit: { $in: habitIds } } },
    { $group: { _id: "$habit", completions: { $sum: 1 }, xpEarned: { $sum: "$xpEarned" } } },
  ]);

  return new Map(
    rows.map((row) => [
      row._id.toString(),
      {
        completions: row.completions || 0,
        xpEarned: row.xpEarned || 0,
      },
    ])
  );
};

const getTodayStatusMap = async (userId, habitIds, dateKey = getDateKey()) => {
  if (!habitIds.length) return new Map();

  const logs = await HabitLog.find({
    user: userId,
    dateKey,
    habit: { $in: habitIds },
  }).lean();

  return new Map(logs.map((log) => [log.habit.toString(), log]));
};

const withTodayStatus = (habits, todayStatusMap) =>
  habits.map((habit) => {
    const log = todayStatusMap.get(habit._id.toString());
    return {
      ...habit.toObject(),
      completedToday: Boolean(log),
      completedAt: log?.completedAt,
    };
  });

const getCategoryStatsRow = ({ category, habits, weeklyLogs, completionMap }) => {
  const habitIds = new Set(habits.map((habit) => habit._id.toString()));
  const weeklyCount = weeklyLogs.filter((log) => habitIds.has(log.habit.toString())).length;
  const weeklyCompletion = habits.length
    ? Math.min(100, Math.round((weeklyCount / (habits.length * 7)) * 100))
    : 0;

  return {
    slug: category.slug,
    name: category.name,
    shortName: category.shortName,
    icon: category.icon,
    description: category.description,
    habitCount: habits.length,
    weeklyCompletion,
    bestStreak: habits.reduce((best, habit) => Math.max(best, habit.longestStreak || 0), 0),
    xpEarned: sum(
      habits.map((habit) => completionMap.get(habit._id.toString())?.xpEarned || 0)
    ),
  };
};

const getDashboardAnalytics = async (req, res, next) => {
  try {
    const dateKey = getDateKey();
    const activeHabits = await Habit.find({ user: req.user._id, isArchived: false }).sort({ createdAt: -1 });
    const habitIds = activeHabits.map((habit) => habit._id);
    const [todayStatusMap, weeklyCompletions, recentBadges, totalCompletions] = await Promise.all([
      getTodayStatusMap(req.user._id, habitIds, dateKey),
      getWeeklySeries({ user: req.user._id }),
      getRecentBadges(req.user._id, 3),
      HabitLog.countDocuments({ user: req.user._id }),
    ]);

    const todayHabits = withTodayStatus(activeHabits, todayStatusMap);
    const completedToday = todayHabits.filter((habit) => habit.completedToday).length;
    const totalTodayHabits = todayHabits.length;
    const bestStreak = activeHabits.reduce((best, habit) => Math.max(best, habit.longestStreak || 0), 0);

    return res.status(200).json({
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        totalXP: req.user.totalXP || 0,
        level: req.user.level || 1,
        coins: req.user.coins || 0,
      },
      levelProgress: mapLevelProgress(req.user.totalXP || 0),
      stats: {
        totalHabits: activeHabits.length,
        completedToday,
        totalTodayHabits,
        todayProgressPercent: totalTodayHabits
          ? Math.round((completedToday / totalTodayHabits) * 100)
          : 0,
        bestStreak,
        totalCompletions,
      },
      todayHabits,
      recentBadges,
      weeklyCompletions,
    });
  } catch (error) {
    next(error);
  }
};

const getAnalyticsSummary = async (req, res, next) => {
  try {
    const weekStart = getWeekStart();
    const weekEnd = endOfDay(new Date());
    const activeHabits = await Habit.find({ user: req.user._id, isArchived: false });
    const habitIds = activeHabits.map((habit) => habit._id);
    const [archivedHabits, totalCompletions, completionsThisWeek, completionMap] = await Promise.all([
      Habit.countDocuments({ user: req.user._id, isArchived: true }),
      HabitLog.countDocuments({ user: req.user._id }),
      HabitLog.countDocuments({
        user: req.user._id,
        completedAt: { $gte: weekStart, $lte: weekEnd },
      }),
      getHabitCompletionMap(req.user._id, habitIds),
    ]);

    const completionRate = activeHabits.length
      ? Math.min(100, Math.round((completionsThisWeek / (activeHabits.length * 7)) * 100))
      : 0;
    const { bestHabit, weakestHabit } = getBestAndWeakestHabits(activeHabits, completionMap);

    return res.status(200).json({
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
    const weekly = await getWeeklySeries({ user: req.user._id });
    return res.status(200).json({ weekly });
  } catch (error) {
    next(error);
  }
};

const getHeatmapData = async (req, res, next) => {
  try {
    const heatmap = await getHeatmapSeries({ user: req.user._id }, req.query.days);
    return res.status(200).json({ heatmap });
  } catch (error) {
    next(error);
  }
};

const getCategoryAnalytics = async (req, res, next) => {
  try {
    const habits = await Habit.find({ user: req.user._id, isArchived: false }).sort({ createdAt: -1 });
    const habitIds = habits.map((habit) => habit._id);
    const weekStart = getWeekStart();
    const weekEnd = endOfDay(new Date());
    const [weeklyLogs, completionMap] = await Promise.all([
      HabitLog.find({
        user: req.user._id,
        completedAt: { $gte: weekStart, $lte: weekEnd },
      }).lean(),
      getHabitCompletionMap(req.user._id, habitIds),
    ]);

    const habitsByCategory = categoryMetadata.map((category) => ({
      category,
      habits: habits.filter((habit) => normalizeCategoryName(habit.category) === category.name),
    }));

    return res.status(200).json({
      categories: habitsByCategory.map(({ category, habits: categoryHabits }) =>
        getCategoryStatsRow({
          category,
          habits: categoryHabits,
          weeklyLogs,
          completionMap,
        })
      ),
    });
  } catch (error) {
    next(error);
  }
};

const getSingleCategoryAnalytics = async (req, res, next) => {
  try {
    const categoryMeta = getCategoryMeta(req.params.category);

    if (!categoryMeta) {
      return res.status(404).json({ message: "Category not found" });
    }

    const allHabits = await Habit.find({ user: req.user._id, isArchived: false }).sort({ createdAt: -1 });
    const categoryHabits = allHabits.filter(
      (habit) => normalizeCategoryName(habit.category) === categoryMeta.name
    );
    const habitIds = categoryHabits.map((habit) => habit._id);
    const dateKey = getDateKey();
    const weekStart = getWeekStart();
    const [todayStatusMap, weeklyLogs, completionMap, recentCompletions, consistency] = await Promise.all([
      getTodayStatusMap(req.user._id, habitIds, dateKey),
      HabitLog.find({
        user: req.user._id,
        habit: { $in: habitIds },
        completedAt: { $gte: weekStart, $lte: endOfDay(new Date()) },
      }).lean(),
      getHabitCompletionMap(req.user._id, habitIds),
      HabitLog.find({ user: req.user._id, habit: { $in: habitIds } })
        .populate("habit", "name category difficulty")
        .sort({ completedAt: -1 })
        .limit(8),
      getHeatmapSeries({ user: req.user._id, habit: { $in: habitIds } }, 21),
    ]);

    const habits = withTodayStatus(categoryHabits, todayStatusMap);
    const stats = getCategoryStatsRow({
      category: categoryMeta,
      habits: categoryHabits,
      weeklyLogs,
      completionMap,
    });

    return res.status(200).json({
      category: {
        slug: categoryMeta.slug,
        name: categoryMeta.name,
        shortName: categoryMeta.shortName,
        icon: categoryMeta.icon,
        description: categoryMeta.description,
      },
      activeHabits: stats.habitCount,
      weeklyCompletion: stats.weeklyCompletion,
      bestStreak: stats.bestStreak,
      xpEarned: stats.xpEarned,
      habits,
      recentCompletions: recentCompletions.map((log) => ({
        _id: log._id,
        habitId: log.habit?._id,
        habitName: log.habit?.name,
        category: log.habit?.category,
        xpEarned: log.xpEarned,
        completedAt: log.completedAt,
        dateKey: log.dateKey,
        streakAfterCompletion: log.streakAfterCompletion,
      })),
      consistency,
    });
  } catch (error) {
    next(error);
  }
};

const getHabitStats = async (req, res, next) => {
  try {
    const habit = await Habit.findOne({ _id: req.params.id, user: req.user._id, isArchived: false });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const weekStart = getWeekStart();
    const dateKey = getDateKey();
    const [totalCompletions, completionsThisWeek, totalXp, recentLogs, todayLog, weeklyCompletions, heatmap] =
      await Promise.all([
        HabitLog.countDocuments({ user: req.user._id, habit: habit._id }),
        HabitLog.countDocuments({
          user: req.user._id,
          habit: habit._id,
          completedAt: { $gte: weekStart },
        }),
        HabitLog.aggregate([
          { $match: { user: req.user._id, habit: habit._id } },
          { $group: { _id: null, totalXpEarned: { $sum: "$xpEarned" } } },
        ]),
        HabitLog.find({ user: req.user._id, habit: habit._id }).sort({ completedAt: -1 }).limit(8),
        HabitLog.findOne({ user: req.user._id, habit: habit._id, dateKey }),
        getWeeklySeries({ user: req.user._id, habit: habit._id }),
        getHeatmapSeries({ user: req.user._id, habit: habit._id }, 21),
      ]);

    return res.status(200).json({
      stats: {
        habitId: habit._id,
        totalCompletions,
        completionsThisWeek,
        currentStreak: habit.currentStreak || 0,
        longestStreak: habit.longestStreak || 0,
        completedToday: Boolean(todayLog),
        totalXpEarned: totalXp[0]?.totalXpEarned || 0,
        recentLogs,
        weeklyCompletions,
        heatmap,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAnalyticsSummary,
  getCategoryAnalytics,
  getDashboardAnalytics,
  getHabitStats,
  getHeatmapData,
  getSingleCategoryAnalytics,
  getWeeklyAnalytics,
};
