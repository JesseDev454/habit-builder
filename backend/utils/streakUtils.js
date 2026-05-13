// Streak utility:
// determines whether a completion keeps a streak alive, repeats the same day, or starts over.
const { getDayDifference } = require("./dateUtils");

const calculateDailyStreak = ({ previousDateKey, currentDateKey, currentStreak = 0 }) => {
  if (!previousDateKey) {
    return { isComeback: false, newCurrentStreak: 1 };
  }

  const difference = getDayDifference(currentDateKey, previousDateKey);

  if (difference === 0) {
    return { isComeback: false, newCurrentStreak: currentStreak };
  }

  if (difference === 1) {
    return { isComeback: false, newCurrentStreak: currentStreak + 1 };
  }

  return { isComeback: true, newCurrentStreak: 1 };
};

module.exports = { calculateDailyStreak };
