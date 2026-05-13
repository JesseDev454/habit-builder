const express = require("express");
const { getAllBadges, getBadgeProgress, getMyBadges, seedDefaultBadges } = require("../controllers/badgeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/seed", protect, seedDefaultBadges);
router.get("/my-badges", protect, getMyBadges);
router.get("/progress", protect, getBadgeProgress);
router.get("/", protect, getAllBadges);

module.exports = router;
