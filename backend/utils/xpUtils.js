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

const getXPForDifficulty = (difficulty = "easy") => xpRewards[difficulty] || xpRewards.easy;

const getCoinsForDifficulty = (difficulty = "easy") => coinRewards[difficulty] || coinRewards.easy;

module.exports = { getCoinsForDifficulty, getXPForDifficulty };
