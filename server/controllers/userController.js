const userResource = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  totalXP: user.totalXP,
  level: user.level,
  coins: user.coins,
  selectedGoals: user.selectedGoals,
});

const userStatus = (req, res) => {
  res.json({ message: "User routes working" });
};

const updateGoals = async (req, res, next) => {
  try {
    const { selectedGoals } = req.body;

    if (!Array.isArray(selectedGoals) || selectedGoals.some((goal) => typeof goal !== "string")) {
      return res.status(400).json({ message: "selectedGoals must be an array of strings" });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { selectedGoals: selectedGoals.map((goal) => goal.trim()).filter(Boolean) },
      { new: true, runValidators: true }
    ).select("-password");

    return res.status(200).json({ user: userResource(user) });
  } catch (error) {
    next(error);
  }
};

module.exports = { updateGoals, userStatus };
const User = require("../models/User");
