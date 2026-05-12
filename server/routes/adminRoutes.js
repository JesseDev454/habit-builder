const express = require("express");
const { getAdminStats } = require("../controllers/adminController");
const { adminOnly } = require("../middleware/adminMiddleware");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/stats", protect, adminOnly, getAdminStats);

module.exports = router;
