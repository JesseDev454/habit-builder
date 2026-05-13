// Main Express entry point for the HabitQuest backend.
// This file wires together database connection, middleware, and all API routes.
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const errorMiddleware = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const habitRoutes = require("./routes/habitRoutes");
const habitLogRoutes = require("./routes/habitLogRoutes");
const badgeRoutes = require("./routes/badgeRoutes");
const challengeRoutes = require("./routes/challengeRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB before serving requests.
connectDB();

// Allow the frontend app to call this API during local development/demo use.
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Small health-check route so we can confirm the API is running.
app.get("/", (req, res) => {
  res.send("HabitQuest API is running");
});

// Route groups keep the server organized by feature area.
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/habit-logs", habitLogRoutes);
app.use("/api/badges", badgeRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorMiddleware);

// Start the API server after all middleware and routes are registered.
app.listen(PORT, () => {
  console.log(`HabitQuest API listening on port ${PORT}`);
});
