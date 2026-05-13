const express = require("express");
const { habitLogStatus } = require("../controllers/habitLogController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, habitLogStatus);

module.exports = router;
