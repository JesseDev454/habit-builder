const HabitLog = require("../models/HabitLog");

const habitLogStatus = async (req, res, next) => {
  try {
    const logs = await HabitLog.find({ user: req.user._id }).sort({ completedAt: -1 }).limit(25);
    res.json({ logs });
  } catch (error) {
    next(error);
  }
};

module.exports = { habitLogStatus };
