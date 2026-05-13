// Habit model:
// one document per habit the user creates.
const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    // Ownership: every habit belongs to one user.
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // Core habit setup fields coming from the create/edit form.
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    category: { type: String, required: true, trim: true },
    frequency: { type: String, enum: ["daily", "weekly"], default: "daily" },
    targetType: { type: String, enum: ["simple", "count"], default: "simple" },
    targetValue: { type: Number, default: 1, min: 1 },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "easy" },
    reminderTime: { type: String, default: "" },
    startDate: { type: Date, default: Date.now },
    // Progress tracking fields updated whenever the habit is completed.
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    lastCompletedDateKey: { type: String, default: "" },
    totalCompletions: { type: Number, default: 0 },
    // Archive keeps history while hiding a habit from active lists.
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Habit", habitSchema);
