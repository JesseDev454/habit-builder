// Habit routes:
// all endpoints here require authentication and operate on the current user's habits.
const express = require("express");
const {
  archiveHabit,
  completeHabit,
  createHabit,
  createManyHabits,
  getHabitById,
  getHabitLogs,
  getHabits,
  getTodayHabits,
  updateHabit,
} = require("../controllers/habitController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// List/create habits.
router.route("/").get(protect, getHabits).post(protect, createHabit);
// Create multiple habits in one request.
router.post("/bulk", protect, createManyHabits);
// Dashboard helper route for today's habits.
router.get("/today", protect, getTodayHabits);
// Habit detail supporting routes.
router.get("/:id/logs", protect, getHabitLogs);
router.post("/:id/complete", protect, completeHabit);
router.patch("/:id/archive", protect, archiveHabit);
router.route("/:id").get(protect, getHabitById).put(protect, updateHabit);

module.exports = router;
