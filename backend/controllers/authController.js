// Auth controller:
// handles registration, login, and returning the currently signed-in user.
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// This helper removes sensitive fields and keeps the frontend response shape consistent.
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

// Register a new user, validate inputs, then return a JWT plus safe user data.
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

// Log an existing user in by checking email + password.
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    // Guard against missing/corrupted password records so login returns a clean auth error
    // instead of a server error.
    if (!user || !user.password || !(await user.matchPassword(password))) {
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

// Return the authenticated user that the auth middleware attached to req.user.
const getMe = async (req, res) => {
  res.status(200).json({ user: userResource(req.user) });
};

module.exports = { registerUser, loginUser, getMe };
