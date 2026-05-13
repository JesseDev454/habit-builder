const mongoose = require("mongoose");

const habitLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    habit: { type: mongoose.Schema.Types.ObjectId, ref: "Habit", required: true },
    completedAt: { type: Date, default: Date.now },
    dateKey: { type: String, required: true },
    xpEarned: { type: Number, default: 0 },
    streakAfterCompletion: { type: Number, default: 0 },
  },
  { timestamps: true }
);

habitLogSchema.index({ user: 1, habit: 1, dateKey: 1 }, { unique: true });

module.exports = mongoose.model("HabitLog", habitLogSchema);
