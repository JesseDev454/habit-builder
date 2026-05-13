const express = require("express");
const { updateGoals, userStatus } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", userStatus);
router.patch("/goals", protect, updateGoals);

module.exports = router;
