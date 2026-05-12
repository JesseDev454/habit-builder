const express = require("express");
const { getChallenges, getMyChallenges, joinChallenge, seedDefaultChallenges } = require("../controllers/challengeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/seed", protect, seedDefaultChallenges);
router.get("/my-challenges", protect, getMyChallenges);
router.get("/", protect, getChallenges);
router.post("/:id/join", protect, joinChallenge);

module.exports = router;
