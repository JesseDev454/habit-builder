const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    icon: { type: String, default: "award" },
    conditionType: {
      type: String,
      enum: ["first_completion", "streak", "total_completions", "level", "comeback"],
      required: true,
    },
    conditionValue: { type: Number, default: 1 },
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
