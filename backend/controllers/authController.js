const User = require("../models/User");
const generateToken = require("../utils/generateToken");

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

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Please provide name, email, password, and confirm password" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
    });

    return res.status(201).json({
      user: userResource(user),
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.status(200).json({
      user: userResource(user),
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res) => {
  res.status(200).json({ user: userResource(req.user) });
};

module.exports = { registerUser, loginUser, getMe };
