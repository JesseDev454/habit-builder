// XP / coin utility:
// keeps reward values in one place so the whole app uses the same progression rules.
const xpRewards = {
  easy: 10,
  medium: 20,
  hard: 30,
};

const coinRewards = {
  easy: 2,
  medium: 5,
  hard: 8,
};

// Easy/medium/hard map to fixed XP rewards for the MVP.
const getXPForDifficulty = (difficulty = "easy") => xpRewards[difficulty] || xpRewards.easy;

// Coins are a secondary reward used by the dashboard/shop UI.
const getCoinsForDifficulty = (difficulty = "easy") => coinRewards[difficulty] || coinRewards.easy;

module.exports = { getCoinsForDifficulty, getXPForDifficulty };
