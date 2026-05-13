// UserChallenge model:
// tracks a specific user's progress inside a challenge.
const mongoose = require("mongoose");

const userChallengeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    challenge: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge", required: true },
    // progress and status drive the Epic Quests card state.
    progress: { type: Number, default: 0 },
    status: { type: String, enum: ["joined", "completed", "failed"], default: "joined" },
    joinedAt: { type: Date, default: Date.now },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// A user can only join a given challenge once.
userChallengeSchema.index({ user: 1, challenge: 1 }, { unique: true });

module.exports = mongoose.model("UserChallenge", userChallengeSchema);
