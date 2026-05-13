const express = require("express");
const {
  getAnalyticsSummary,
  getCategoryAnalytics,
  getDashboardAnalytics,
  getHabitStats,
  getHeatmapData,
  getSingleCategoryAnalytics,
  getWeeklyAnalytics,
} = require("../controllers/analyticsController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/dashboard", protect, getDashboardAnalytics);
router.get("/categories", protect, getCategoryAnalytics);
router.get("/categories/:category", protect, getSingleCategoryAnalytics);
router.get("/summary", protect, getAnalyticsSummary);
router.get("/weekly", protect, getWeeklyAnalytics);
router.get("/heatmap", protect, getHeatmapData);
router.get("/habits/:id", protect, getHabitStats);

module.exports = router;
