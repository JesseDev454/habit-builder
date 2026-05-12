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

router.route("/").get(protect, getHabits).post(protect, createHabit);
router.post("/bulk", protect, createManyHabits);
router.get("/today", protect, getTodayHabits);
router.get("/:id/logs", protect, getHabitLogs);
router.post("/:id/complete", protect, completeHabit);
router.patch("/:id/archive", protect, archiveHabit);
router.route("/:id").get(protect, getHabitById).put(protect, updateHabit);

module.exports = router;
