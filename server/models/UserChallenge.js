const mongoose = require("mongoose");

const userChallengeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    challenge: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge", required: true },
    progress: { type: Number, default: 0 },
    status: { type: String, enum: ["joined", "completed", "failed"], default: "joined" },
    joinedAt: { type: Date, default: Date.now },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

userChallengeSchema.index({ user: 1, challenge: 1 }, { unique: true });

module.exports = mongoose.model("UserChallenge", userChallengeSchema);
