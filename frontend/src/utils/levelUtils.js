export const levelThresholds = [0, 100, 250, 500, 900, 1400, 2000, 2800, 3700, 4700];

export const getLevelFromXP = (totalXP = 0) => {
  const xp = Math.max(Number(totalXP) || 0, 0);

  for (let index = levelThresholds.length - 1; index >= 0; index -= 1) {
    if (xp >= levelThresholds[index]) return index + 1;
  }

  return 1;
};

export const getLevelProgress = (totalXP = 0) => {
  const xp = Math.max(Number(totalXP) || 0, 0);
  const level = getLevelFromXP(xp);
  const currentLevelXP = levelThresholds[level - 1] ?? 0;
  const nextLevelXP = levelThresholds[level] ?? currentLevelXP;
  const levelSpan = Math.max(nextLevelXP - currentLevelXP, 1);
  const xpIntoLevel = Math.max(xp - currentLevelXP, 0);
  const xpNeededForNextLevel = level >= levelThresholds.length ? 0 : Math.max(nextLevelXP - xp, 0);
  const progressPercent = level >= levelThresholds.length ? 100 : Math.min(100, Math.round((xpIntoLevel / levelSpan) * 100));

  return {
    level,
    currentLevelXP,
    nextLevelXP,
    xpIntoLevel,
    xpNeededForNextLevel,
    progressPercent,
  };
};
