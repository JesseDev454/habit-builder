const Badge = require("../models/Badge");
const UserBadge = require("../models/UserBadge");

const defaultBadges = [
  {
    name: "First Step",
    description: "Complete your first habit.",
    icon: "\uD83C\uDF31",
    conditionType: "first_completion",
    conditionValue: 1,
    category: "starter",
    rarity: "common",
  },
  {
    name: "3-Day Spark",
    description: "Reach a 3-day streak on any habit.",
    icon: "\uD83D\uDD25",
    conditionType: "streak",
    conditionValue: 3,
    category: "streak",
    rarity: "common",
  },
  {
    name: "Weekly Warrior",
    description: "Reach a 7-day streak on any habit.",
    icon: "\uD83C\uDFC6",
    conditionType: "streak",
    conditionValue: 7,
    category: "streak",
    rarity: "rare",
  },
  {
    name: "Consistency Champ",
    description: "Complete habits 10 times.",
    icon: "\uD83D\uDCAA",
    conditionType: "total_completions",
    conditionValue: 10,
    category: "consistency",
    rarity: "rare",
  },
  {
    name: "Level Up",
    description: "Reach Level 2.",
    icon: "\u2B50",
    conditionType: "level",
    conditionValue: 2,
    category: "level",
    rarity: "common",
  },
  {
    name: "Comeback Hero",
    description: "Complete a habit after missing at least one day.",
    icon: "\uD83D\uDEE1\uFE0F",
    conditionType: "comeback",
    conditionValue: 1,
    category: "comeback",
    rarity: "rare",
  },
  {
    name: "Quest Starter",
    description: "Create or select your first habit.",
    icon: "\uD83D\uDE80",
    conditionType: "total_completions",
    conditionValue: 1,
    category: "starter",
    rarity: "common",
  },
];

const seedBadges = async () => {
  const badges = [];

  for (const badge of defaultBadges) {
    const savedBadge = await Badge.findOneAndUpdate(
      { name: badge.name },
      { $setOnInsert: badge },
      { new: true, upsert: true }
    );
    badges.push(savedBadge);
  }

  return badges;
};

const conditionMet = ({ badge, user, habit, totalUserCompletions, isComeback }) => {
  switch (badge.conditionType) {
    case "first_completion":
      return totalUserCompletions >= badge.conditionValue;
    case "streak":
      return (habit.currentStreak || 0) >= badge.conditionValue;
    case "total_completions":
      return totalUserCompletions >= badge.conditionValue;
    case "level":
      return (user.level || 1) >= badge.conditionValue;
    case "comeback":
      return Boolean(isComeback);
    default:
      return false;
  }
};

const checkAndAwardBadges = async ({ user, habit, totalUserCompletions, isComeback }) => {
  const activeBadges = await Badge.find({ isActive: true });

  if (activeBadges.length === 0) {
    await seedBadges();
  }

  const badges = activeBadges.length > 0 ? activeBadges : await Badge.find({ isActive: true });
  const existingUserBadges = await UserBadge.find({ user: user._id }).select("badge");
  const existingBadgeIds = new Set(existingUserBadges.map((item) => item.badge.toString()));
  const unlockedBadges = [];

  for (const badge of badges) {
    if (existingBadgeIds.has(badge._id.toString())) continue;
    if (!conditionMet({ badge, user, habit, totalUserCompletions, isComeback })) continue;

    try {
      await UserBadge.create({ user: user._id, badge: badge._id });
      unlockedBadges.push(badge);
      existingBadgeIds.add(badge._id.toString());
    } catch (error) {
      if (error.code !== 11000) throw error;
    }
  }

  return unlockedBadges;
};

module.exports = { checkAndAwardBadges, defaultBadges, seedBadges };
