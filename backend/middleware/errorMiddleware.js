const errorMiddleware = (err, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  if (err.code === 11000) {
    if (err.keyPattern?.habit && err.keyPattern?.dateKey) {
      return res.status(400).json({ message: "Habit already completed today" });
    }

    return res.status(400).json({ message: "Email is already registered" });
  }

  res.status(statusCode).json({
    message: err.message || "Server error",
  });
};

module.exports = errorMiddleware;
