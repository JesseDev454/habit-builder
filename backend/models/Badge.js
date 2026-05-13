// Badge model:
// defines the rules for achievements users can unlock.
const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema(
  {
    // Basic display fields shown in the achievements/profile UI.
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    icon: { type: String, default: "award" },
    // conditionType + conditionValue describe when this badge should unlock.
    conditionType: {
      type: String,
      enum: ["first_completion", "streak", "total_completions", "level", "comeback"],
      required: true,
    },
    conditionValue: { type: Number, default: 1 },
    // Category and rarity help group badges visually.
    category: {
      type: String,
      enum: ["starter", "streak", "consistency", "level", "comeback", "special"],
      default: "starter",
    },
    rarity: { type: String, enum: ["common", "rare", "epic"], default: "common" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Badge", badgeSchema);
