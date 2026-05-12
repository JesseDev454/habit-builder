export const mockStats = {
  user: {
    name: "Jesse",
    email: "jesse@habitquest.com",
    level: 3,
    totalXP: 420,
    bestStreak: 6,
    longestStreak: 14,
    todaysProgress: "3/5",
    todaysPercent: 60,
  },
  weeklyCompletions: [
    { day: "Mon", completions: 3 },
    { day: "Tue", completions: 4 },
    { day: "Wed", completions: 2 },
    { day: "Thu", completions: 3 },
    { day: "Fri", completions: 5 },
    { day: "Sat", completions: 0 },
    { day: "Sun", completions: 0 },
  ],
  recentBadges: [
    { id: "b1", title: "First Step", description: "Completed first habit.", icon: "directions_walk", tone: "secondary-fixed", textTone: "on-secondary-fixed" },
    { id: "b2", title: "3-Day Spark", description: "Maintained a 3-day streak.", icon: "bolt", tone: "tertiary-fixed", textTone: "on-tertiary-fixed" },
    { id: "b3", title: "Consistency Champ", description: "100 total habit completions.", icon: "workspace_premium", tone: "primary-fixed", textTone: "on-primary-fixed" },
  ],
};
