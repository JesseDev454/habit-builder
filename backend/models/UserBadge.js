// UserBadge model:
// connects a user to a badge they have unlocked.
const mongoose = require("mongoose");

const userBadgeSchema = new mongoose.Schema(
  {
    // "user" says who unlocked it.
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // "badge" says what they unlocked.
    badge: { type: mongoose.Schema.Types.ObjectId, ref: "Badge", required: true },
    // unlockedAt is used for recent badge activity on the dashboard/profile.
    unlockedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Prevent the same badge from being assigned to the same user twice.
userBadgeSchema.index({ user: 1, badge: 1 }, { unique: true });

module.exports = mongoose.model("UserBadge", userBadgeSchema);
