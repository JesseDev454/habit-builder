// Habit controller:
// owns CRUD operations, completion logic, rewards, and streak updates.
const Habit = require("../models/Habit");
const HabitLog = require("../models/HabitLog");
const User = require("../models/User");
const { checkAndAwardBadges } = require("../utils/badgeUtils");
const { updateChallengeProgress } = require("./challengeController");
const { createNotification } = require("./notificationController");
const { normalizeCategoryName } = require("../utils/categoryUtils");
const { endOfDay, getDateKey, startOfDay } = require("../utils/dateUtils");
const { getLevelFromXP, getLevelProgress } = require("../utils/levelUtils");
const { calculateDailyStreak } = require("../utils/streakUtils");
const { getCoinsForDifficulty, getXPForDifficulty } = require("../utils/xpUtils");

const allowedFields = [
  "name",
  "description",
  "category",
  "frequency",
  "targetType",
  "targetValue",
  "difficulty",
  "reminderTime",
  "startDate",
];

const validFrequency = ["daily", "weekly"];
const validTargetType = ["simple", "count"];
const validDifficulty = ["easy", "medium", "hard"];

// Small debugging endpoint used to verify the habit route group is reachable.
const habitStatus = (req, res) => {
  res.json({ message: "Habit routes working" });
};

// Normalize raw frontend form input into a clean shape the database expects.
const normalizeHabitInput = (input) => ({
  name: typeof input.name === "string" ? input.name.trim() : "",
  description: typeof input.description === "string" ? input.description.trim() : "",
  category: typeof input.category === "string" ? normalizeCategoryName(input.category) : "",
  frequency: input.frequency || "daily",
  targetType: input.targetType || "simple",
  targetValue: input.targetValue === undefined || input.targetValue === null ? 1 : Number(input.targetValue),
  difficulty: input.difficulty || "easy",
  reminderTime: typeof input.reminderTime === "string" ? input.reminderTime : "",
  startDate: input.startDate || undefined,
});

// Guard against invalid habits before saving them to MongoDB.
const validateHabitInput = (input) => {
  if (!input.name) return "Habit name is required";
  if (!input.category) return "Habit category is required";
  if (!validFrequency.includes(input.frequency)) return "Frequency must be daily or weekly";
  if (!validTargetType.includes(input.targetType)) return "Target type must be simple or count";
  if (!Number.isFinite(input.targetValue) || input.targetValue < 1) return "Target value must be at least 1";
  if (!validDifficulty.includes(input.difficulty)) return "Difficulty must be easy, medium, or hard";
  return null;
};

// Always scope habit access to the logged-in user so users only touch their own data.
const findOwnedHabit = (userId, habitId, includeArchived = true) => {
  const query = { _id: habitId, user: userId };
  if (!includeArchived) query.isArchived = false;
  return Habit.findOne(query);
};

// Create one new habit for the authenticated user.
const createHabit = async (req, res, next) => {
  try {
    const habitData = normalizeHabitInput(req.body);
    const validationError = validateHabitInput(habitData);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const habit = await Habit.create({ ...habitData, user: req.user._id });
    return res.status(201).json({ habit });
  } catch (error) {
    next(error);
  }
};

// Bulk-create habits, mainly useful for onboarding/template flows.
const createManyHabits = async (req, res, next) => {
  try {
    const { habits } = req.body;

    if (!Array.isArray(habits) || habits.length === 0) {
      return res.status(400).json({ message: "habits must be a non-empty array" });
    }

    const normalizedHabits = habits.map(normalizeHabitInput);
    const validationError = normalizedHabits.map(validateHabitInput).find(Boolean);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const createdHabits = await Habit.insertMany(
      normalizedHabits.map((habit) => ({
        ...habit,
        user: req.user._id,
      }))
    );

    return res.status(201).json({ habits: createdHabits });
  } catch (error) {
    next(error);
  }
};

// Fetch either active or archived habits for the current user.
const getHabits = async (req, res, next) => {
  try {
    const query = { user: req.user._id };

    if (req.query.archived === "true") {
      query.isArchived = true;
    } else {
      query.isArchived = false;
    }

    const habits = await Habit.find(query).sort({ createdAt: -1 });
    return res.status(200).json({ habits });
  } catch (error) {
    next(error);
  }
};

// Return today's active habits and whether each one is already completed for today.
const getTodayHabits = async (req, res, next) => {
  try {
    const habits = await Habit.find({ user: req.user._id, isArchived: false }).sort({ createdAt: -1 }).lean();
    const dateKey = getDateKey();
    const logs = await HabitLog.find({
      user: req.user._id,
      dateKey,
      habit: { $in: habits.map((habit) => habit._id) },
    }).lean();

    const logMap = new Map(logs.map((log) => [log.habit.toString(), log]));
    const habitsWithStatus = habits.map((habit) => {
      const log = logMap.get(habit._id.toString());
      return {
        ...habit,
        completedToday: Boolean(log),
        completedAt: log?.completedAt,
      };
    });

    return res.status(200).json({ habits: habitsWithStatus });
  } catch (error) {
    next(error);
  }
};

// Fetch a single habit detail page payload.
const getHabitById = async (req, res, next) => {
  try {
    const habit = await findOwnedHabit(req.user._id, req.params.id);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    return res.status(200).json({ habit });
  } catch (error) {
    next(error);
  }
};

// Update only the fields the app allows the user to edit.
const updateHabit = async (req, res, next) => {
  try {
    const habit = await findOwnedHabit(req.user._id, req.params.id);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const normalizedUpdates = normalizeHabitInput({ ...habit.toObject(), ...updates });
    const validationError = validateHabitInput(normalizedUpdates);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    Object.assign(habit, normalizedUpdates);
    await habit.save();

    return res.status(200).json({ habit });
  } catch (error) {
    next(error);
  }
};

// Archive a habit instead of hard-deleting it so progress history stays intact.
const archiveHabit = async (req, res, next) => {
  try {
    const habit = await findOwnedHabit(req.user._id, req.params.id);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    habit.isArchived = true;
    await habit.save();

    return res.status(200).json({ message: "Habit archived successfully" });
  } catch (error) {
    next(error);
  }
};

// Complete a habit once for the current day and award all related progression rewards.
const completeHabit = async (req, res, next) => {
  try {
    const habit = await findOwnedHabit(req.user._id, req.params.id, false);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const dateKey = getDateKey();
    const existingLog = await HabitLog.findOne({
      user: req.user._id,
      habit: habit._id,
      dateKey,
    });

    if (existingLog) {
      return res.status(400).json({
        message: "Habit already completed today.",
        alreadyCompleted: true,
      });
    }

    // Rewards are driven from habit difficulty.
    const xpEarned = getXPForDifficulty(habit.difficulty);
    const coinsEarned = getCoinsForDifficulty(habit.difficulty);
    const previousLevel = req.user.level || 1;
    const previousDateKey = habit.lastCompletedDateKey;
    // Daily habits use streak logic; weekly habits simply stay active without daily resets.
    const streakResult =
      habit.frequency === "daily"
        ? calculateDailyStreak({
            previousDateKey,
            currentDateKey: dateKey,
            currentStreak: habit.currentStreak || 0,
          })
        : {
            isComeback: false,
            newCurrentStreak: Math.max(habit.currentStreak || 0, 1),
          };

    // The log is the source of truth for "this habit was completed today".
    const log = await HabitLog.create({
      user: req.user._id,
      habit: habit._id,
      dateKey,
      completedAt: new Date(),
      xpEarned,
      streakAfterCompletion: streakResult.newCurrentStreak,
    });

    habit.currentStreak = streakResult.newCurrentStreak;
    habit.longestStreak = Math.max(habit.longestStreak || 0, habit.currentStreak);
    habit.lastCompletedDateKey = dateKey;
    habit.totalCompletions = (habit.totalCompletions || 0) + 1;
    await habit.save();

    const updatedTotalXP = (req.user.totalXP || 0) + xpEarned;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $inc: { coins: coinsEarned },
        $set: {
          totalXP: updatedTotalXP,
          level: getLevelFromXP(updatedTotalXP),
        },
      },
      { new: true }
    ).select("-password");

    const totalUserCompletions = await HabitLog.countDocuments({ user: req.user._id });
    const unlockedBadges = await checkAndAwardBadges({
      user: updatedUser,
      habit,
      totalUserCompletions,
      isComeback: streakResult.isComeback,
    });
    const completedChallenges = await updateChallengeProgress({ userId: req.user._id, habit });
    const finalUser = await User.findById(req.user._id).select("-password");

    if (finalUser.level > previousLevel) {
      await createNotification({
        user: req.user._id,
        type: "level",
        title: "Level up",
        message: `You reached Level ${finalUser.level}.`,
        metadata: { level: finalUser.level },
      });
    }

    for (const badge of unlockedBadges) {
      await createNotification({
        user: req.user._id,
        type: "badge",
        title: "Badge unlocked",
        message: `You unlocked ${badge.name}.`,
        metadata: { badge: badge._id },
      });
    }

    return res.status(201).json({
      message: "Habit completed successfully",
      habit: {
        ...habit.toObject(),
        completedToday: true,
        completedAt: log.completedAt,
      },
      log,
      rewards: {
        xpEarned,
        coinsEarned,
        newLevel: finalUser.level,
        leveledUp: finalUser.level > previousLevel,
        levelProgress: getLevelProgress(finalUser.totalXP),
        currentStreak: habit.currentStreak,
        longestStreak: habit.longestStreak,
        unlockedBadges,
        completedChallenges,
      },
      user: {
        _id: finalUser._id,
        name: finalUser.name,
        email: finalUser.email,
        role: finalUser.role,
        totalXP: finalUser.totalXP,
        level: finalUser.level,
        coins: finalUser.coins,
        selectedGoals: finalUser.selectedGoals,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Fetch recent completion history for a specific habit.
const getHabitLogs = async (req, res, next) => {
  try {
    const habit = await findOwnedHabit(req.user._id, req.params.id);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const query = { user: req.user._id, habit: habit._id };

    if (req.query.start || req.query.end) {
      query.completedAt = {};
      if (req.query.start) query.completedAt.$gte = startOfDay(req.query.start);
      if (req.query.end) query.completedAt.$lte = endOfDay(req.query.end);
    }

    const logs = await HabitLog.find(query).sort({ completedAt: -1 });
    return res.status(200).json({ logs });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  archiveHabit,
  completeHabit,
  createHabit,
  createManyHabits,
  getHabitById,
  getHabitLogs,
  getHabits,
  getTodayHabits,
  habitStatus,
  updateHabit,
};
