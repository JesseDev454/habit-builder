const Badge = require("../models/Badge");
const Challenge = require("../models/Challenge");
const Habit = require("../models/Habit");
const HabitLog = require("../models/HabitLog");
const Notification = require("../models/Notification");
const User = require("../models/User");
const UserBadge = require("../models/UserBadge");
const UserChallenge = require("../models/UserChallenge");

const getAdminStats = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalHabits,
      activeHabits,
      archivedHabits,
      totalCompletions,
      totalBadges,
      totalBadgesUnlocked,
      activeChallenges,
      joinedChallenges,
      completedChallenges,
      totalNotifications,
      recentUsers,
      recentCompletions,
    ] = await Promise.all([
      User.countDocuments(),
      Habit.countDocuments(),
      Habit.countDocuments({ isArchived: false }),
      Habit.countDocuments({ isArchived: true }),
      HabitLog.countDocuments(),
      Badge.countDocuments(),
      UserBadge.countDocuments(),
      Challenge.countDocuments({ isActive: true }),
      UserChallenge.countDocuments(),
      UserChallenge.countDocuments({ status: "completed" }),
      Notification.countDocuments(),
      User.find().select("name email role createdAt level totalXP").sort({ createdAt: -1 }).limit(5),
      HabitLog.find().populate("user", "name email").populate("habit", "name category").sort({ completedAt: -1 }).limit(8),
    ]);

    res.status(200).json({
      stats: {
        totalUsers,
        totalHabits,
        activeHabits,
        archivedHabits,
        totalCompletions,
        totalBadges,
        totalBadgesUnlocked,
        activeChallenges,
        joinedChallenges,
        completedChallenges,
        totalNotifications,
      },
      recentUsers,
      recentCompletions,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAdminStats };
