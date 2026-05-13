// Challenge model:
// stores longer "Epic Quest" style missions beyond normal daily habits.
const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema(
  {
    // Display fields shown on the Epic Quests page.
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    // Goal fields explain how a quest is completed.
    durationDays: { type: Number, required: true, default: 7 },
    goalType: { type: String, enum: ["complete_any", "category_completion", "streak"], default: "complete_any" },
    goalValue: { type: Number, default: 7 },
    // Rewards are granted when a challenge is completed.
    rewardXP: { type: Number, default: 50 },
    rewardCoins: { type: Number, default: 10 },
    badgeReward: { type: mongoose.Schema.Types.ObjectId, ref: "Badge", default: null },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "easy" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Challenge", challengeSchema);
