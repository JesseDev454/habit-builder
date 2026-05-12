const express = require("express");
const { getAnalyticsSummary, getHabitStats, getHeatmapData, getWeeklyAnalytics } = require("../controllers/analyticsController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/summary", protect, getAnalyticsSummary);
router.get("/weekly", protect, getWeeklyAnalytics);
router.get("/heatmap", protect, getHeatmapData);
router.get("/habits/:id", protect, getHabitStats);

module.exports = router;
