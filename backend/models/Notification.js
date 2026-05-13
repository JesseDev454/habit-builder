// Notification model:
// stores in-app alerts such as badge unlocks, level-ups, and challenge progress.
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // type helps the frontend choose the right icon/tone for each notification.
    type: { type: String, enum: ["habit", "badge", "level", "streak", "challenge", "system"], default: "system" },
    title: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    metadata: { type: Object, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
