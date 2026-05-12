const Challenge = require("../models/Challenge");
const User = require("../models/User");
const UserChallenge = require("../models/UserChallenge");
const { getLevelFromXP } = require("../utils/levelUtils");
const { createNotification } = require("./notificationController");

const defaultChallenges = [
  {
    title: "7-Day Coding Streak",
    description: "Build a coding streak by showing up daily.",
    category: "Coding",
    durationDays: 7,
    goalType: "streak",
    goalValue: 7,
    rewardXP: 100,
    rewardCoins: 20,
    difficulty: "medium",
  },
  {
    title: "Study Sprint",
    description: "Complete five study sessions this week.",
    category: "Study",
    durationDays: 7,
    goalType: "category_completion",
    goalValue: 5,
    rewardXP: 80,
    rewardCoins: 15,
    difficulty: "easy",
  },
  {
    title: "Hydration Hero",
    description: "Complete hydration habits across seven days.",
    category: "Water Intake",
    durationDays: 7,
    goalType: "category_completion",
    goalValue: 7,
    rewardXP: 70,
    rewardCoins: 12,
    difficulty: "easy",
  },
  {
    title: "Reading Quest",
    description: "Stack ten reading completions over two weeks.",
    category: "Reading",
    durationDays: 14,
    goalType: "category_completion",
    goalValue: 10,
    rewardXP: 120,
    rewardCoins: 25,
    difficulty: "medium",
  },
  {
    title: "Wellness Reset",
    description: "Complete any ten wellness-building quests.",
    category: "Wellness",
    durationDays: 10,
    goalType: "complete_any",
    goalValue: 10,
    rewardXP: 90,
    rewardCoins: 18,
    difficulty: "medium",
  },
];

const seedDefaultChallenges = async (req, res, next) => {
  try {
    const challenges = [];

    for (const challenge of defaultChallenges) {
      const saved = await Challenge.findOneAndUpdate(
        { title: challenge.title },
        { $setOnInsert: challenge },
        { new: true, upsert: true }
      );
      challenges.push(saved);
    }

    res.status(200).json({ challenges });
  } catch (error) {
    next(error);
  }
};

const enrichChallenges = async (userId, challenges) => {
  const joined = await UserChallenge.find({
    user: userId,
    challenge: { $in: challenges.map((challenge) => challenge._id) },
  });
  const joinedMap = new Map(joined.map((item) => [item.challenge.toString(), item]));

  return challenges.map((challenge) => {
    const userChallenge = joinedMap.get(challenge._id.toString());
    return {
      ...challenge.toObject(),
      isJoined: Boolean(userChallenge),
      userProgress: userChallenge?.progress || 0,
      userStatus: userChallenge?.status,
      joinedAt: userChallenge?.joinedAt,
      completedAt: userChallenge?.completedAt,
    };
  });
};

const getChallenges = async (req, res, next) => {
  try {
    const challenges = await Challenge.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ challenges: await enrichChallenges(req.user._id, challenges) });
  } catch (error) {
    next(error);
  }
};

const getMyChallenges = async (req, res, next) => {
  try {
    const userChallenges = await UserChallenge.find({ user: req.user._id }).populate("challenge").sort({ joinedAt: -1 });
    res.status(200).json({ challenges: userChallenges });
  } catch (error) {
    next(error);
  }
};

const joinChallenge = async (req, res, next) => {
  try {
    const challenge = await Challenge.findOne({ _id: req.params.id, isActive: true });
    if (!challenge) return res.status(404).json({ message: "Challenge not found" });

    const existing = await UserChallenge.findOne({ user: req.user._id, challenge: challenge._id });
    if (existing) return res.status(400).json({ message: "Challenge already joined" });

    const userChallenge = await UserChallenge.create({ user: req.user._id, challenge: challenge._id });
    await createNotification({
      user: req.user._id,
      type: "challenge",
      title: "Challenge joined",
      message: `You joined ${challenge.title}.`,
      metadata: { challenge: challenge._id },
    });

    res.status(201).json({ challenge: { ...challenge.toObject(), isJoined: true, userProgress: 0, userStatus: userChallenge.status } });
  } catch (error) {
    next(error);
  }
};

const shouldIncrementProgress = (challenge, habit) => {
  if (challenge.goalType === "complete_any") return true;
  if (challenge.goalType === "category_completion") return habit.category === challenge.category;
  return false;
};

const shouldCompleteStreakChallenge = (challenge, habit) =>
  challenge.goalType === "streak" && habit.category === challenge.category && (habit.currentStreak || 0) >= challenge.goalValue;

const updateChallengeProgress = async ({ userId, habit }) => {
  const joinedChallenges = await UserChallenge.find({ user: userId, status: "joined" }).populate("challenge");
  const completedChallenges = [];

  for (const userChallenge of joinedChallenges) {
    const challenge = userChallenge.challenge;
    if (!challenge?.isActive) continue;

    let nextProgress = userChallenge.progress || 0;

    if (shouldIncrementProgress(challenge, habit)) {
      nextProgress += 1;
    }

    const completedByProgress = nextProgress >= challenge.goalValue;
    const completedByStreak = shouldCompleteStreakChallenge(challenge, habit);

    userChallenge.progress = Math.min(nextProgress, challenge.goalValue);

    if (completedByProgress || completedByStreak) {
      userChallenge.progress = challenge.goalValue;
      userChallenge.status = "completed";
      userChallenge.completedAt = new Date();

      const user = await User.findById(userId);
      if (user) {
        user.totalXP = (user.totalXP || 0) + (challenge.rewardXP || 0);
        user.coins = (user.coins || 0) + (challenge.rewardCoins || 0);
        user.level = getLevelFromXP(user.totalXP);
        await user.save();
      }

      await createNotification({
        user: userId,
        type: "challenge",
        title: "Challenge completed",
        message: `You completed ${challenge.title} and earned rewards.`,
        metadata: { challenge: challenge._id, rewardXP: challenge.rewardXP, rewardCoins: challenge.rewardCoins },
      });

      completedChallenges.push({
        _id: challenge._id,
        title: challenge.title,
        rewardXP: challenge.rewardXP,
        rewardCoins: challenge.rewardCoins,
      });
    }

    await userChallenge.save();
  }

  return completedChallenges;
};

module.exports = {
  getChallenges,
  getMyChallenges,
  joinChallenge,
  seedDefaultChallenges,
  updateChallengeProgress,
};
