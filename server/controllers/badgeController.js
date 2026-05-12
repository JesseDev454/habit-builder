const Badge = require("../models/Badge");
const Habit = require("../models/Habit");
const HabitLog = require("../models/HabitLog");
const UserBadge = require("../models/UserBadge");
const { seedBadges } = require("../utils/badgeUtils");

const buildBadgeResponse = (badge, unlockedMap, progressPercent = 0) => {
  const unlocked = unlockedMap.get(badge._id.toString());

  return {
    ...badge.toObject(),
    isUnlocked: Boolean(unlocked),
    unlockedAt: unlocked?.unlockedAt,
    progressPercent: Boolean(unlocked) ? 100 : progressPercent,
  };
};

const getUserProgressContext = async (userId) => {
  const [totalCompletions, habits] = await Promise.all([
    HabitLog.countDocuments({ user: userId }),
    Habit.find({ user: userId, isArchived: false }).select("currentStreak longestStreak"),
  ]);

  const bestCurrentStreak = habits.reduce((best, habit) => Math.max(best, habit.currentStreak || 0), 0);
  const bestLongestStreak = habits.reduce((best, habit) => Math.max(best, habit.longestStreak || 0), 0);

  return { bestCurrentStreak, bestLongestStreak, totalCompletions };
};

const calculateBadgeProgress = (badge, user, context) => {
  const value = Math.max(badge.conditionValue || 1, 1);
  let current = 0;

  if (badge.conditionType === "first_completion" || badge.conditionType === "total_completions") {
    current = context.totalCompletions;
  }

  if (badge.conditionType === "level") {
    current = user.level || 1;
  }

  if (badge.conditionType === "streak") {
    current = context.bestCurrentStreak;
  }

  if (badge.conditionType === "comeback") {
    current = 0;
  }

  return Math.min(100, Math.round((current / value) * 100));
};

const seedDefaultBadges = async (req, res, next) => {
  try {
    const badges = await seedBadges();
    res.status(200).json({ badges });
  } catch (error) {
    next(error);
  }
};

const getUnlockedMap = async (userId) => {
  const userBadges = await UserBadge.find({ user: userId }).populate("badge").sort({ unlockedAt: -1 });
  return new Map(userBadges.map((item) => [item.badge._id.toString(), item]));
};

const getAllBadges = async (req, res, next) => {
  try {
    const [badges, unlockedMap] = await Promise.all([
      Badge.find({ isActive: true }).sort({ category: 1, conditionValue: 1 }),
      getUnlockedMap(req.user._id),
    ]);

    res.status(200).json({
      badges: badges.map((badge) => buildBadgeResponse(badge, unlockedMap)),
    });
  } catch (error) {
    next(error);
  }
};

const getMyBadges = async (req, res, next) => {
  try {
    const userBadges = await UserBadge.find({ user: req.user._id }).populate("badge").sort({ unlockedAt: -1 });

    res.status(200).json({
      badges: userBadges
        .filter((item) => item.badge)
        .map((item) => ({
          ...item.badge.toObject(),
          isUnlocked: true,
          unlockedAt: item.unlockedAt,
        })),
    });
  } catch (error) {
    next(error);
  }
};

const getBadgeProgress = async (req, res, next) => {
  try {
    const [badges, unlockedMap, context] = await Promise.all([
      Badge.find({ isActive: true }).sort({ category: 1, conditionValue: 1 }),
      getUnlockedMap(req.user._id),
      getUserProgressContext(req.user._id),
    ]);

    res.status(200).json({
      badges: badges.map((badge) =>
        buildBadgeResponse(badge, unlockedMap, calculateBadgeProgress(badge, req.user, context))
      ),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllBadges, getBadgeProgress, getMyBadges, seedDefaultBadges };
