export const user = {
  name: "Jesse",
  email: "demo@habitquest.com",
  title: "Level 14 Trailblazer",
  level: 14,
  totalXP: 2450,
  nextLevelXP: 3000,
  coins: 120,
  currentStreak: 5,
  longestStreak: 12,
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCnJKoXZ4ONhopWJAwnk7bceHCm3uL9pcJ9ohdnn098ukT5S0T9PcGb_Yan07LP9Ia6LUmvxYYp58rIlM1eC82MXSXsjHX3lbMiQRa65gk00rBNyKBvjcLQOPspqjaRbzPdC8LzhRPmo0b-4n53OseWKi-B5UDdughMEF3oykCdu5z830z65F179m1v-4ReCc_38WHTRK7PYJTFQZXDJbO7KgDB72CykmHzqOnYRXGRcosdGpMzKwdeakGSGw4kVI12FXDazB5qryoQ",
  mobileAvatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAu5hPYaZFqx51qZHhRWfBp7I06jKKQKWFoyY8Kom21nEpPKPaeO8o7bhgmgkzdc9XwtPeGrWLcYjMOlw64I9aiVCyd4zmslZa4BNFEwamTL9fK2-8FZgMGlOVeMBvlxJQKGXpCOxV7R8ZkIW5TB1csp42uNwCdHEGZYXUayw7fCnPtlcbvWo-009JnmJBNb_tsfK6EuFwOHspcVf_cngSmDn1Crqxs386sso6Gdf6E7X5qhU1EM49CTnwfAyjmSMxJxxpsAH7vCY9U",
};

export const habits = [
  { id: "1", name: "Code for 1 hour", description: "Deep work session", category: "Coding", materialIcon: "code", difficulty: "Hard", xpReward: 50, currentStreak: 12, completedToday: false, target: "1 hour", accent: "text-primary" },
  { id: "2", name: "Read for 20 mins", description: "Fiction or Non-fiction", category: "Reading", materialIcon: "menu_book", difficulty: "Easy", xpReward: 20, currentStreak: 3, completedToday: false, target: "20 min", accent: "text-quest-blue" },
  { id: "3", name: "Drink 8 cups of water", description: "Stay hydrated", category: "Wellness", materialIcon: "water_drop", difficulty: "Medium", xpReward: 0, currentStreak: 5, completedToday: true, target: "8 cups", accent: "text-success-green" },
  { id: "4", name: "Study for 2 hours", category: "Study", icon: "GraduationCap", difficulty: "Hard", xpReward: 30, currentStreak: 2, completedToday: false, target: "2 hours" },
  { id: "5", name: "Sleep before 11 PM", category: "Sleep", icon: "Moon", difficulty: "Medium", xpReward: 20, currentStreak: 4, completedToday: false, target: "11 PM" },
];

export const habitTemplates = [
  { id: "t1", name: "Morning coding sprint", category: "Coding", difficulty: "Medium", target: "45 min", xpReward: 20 },
  { id: "t2", name: "Focused study block", category: "Study", difficulty: "Hard", target: "2 hours", xpReward: 30 },
  { id: "t3", name: "Read before bed", category: "Reading", difficulty: "Easy", target: "20 min", xpReward: 10 },
  { id: "t4", name: "Hydration check", category: "Wellness", difficulty: "Easy", target: "8 cups", xpReward: 10 },
  { id: "t5", name: "Evening reflection", category: "Spiritual", difficulty: "Medium", target: "10 min", xpReward: 20 },
  { id: "t6", name: "Sleep reset", category: "Sleep", difficulty: "Medium", target: "Before 11 PM", xpReward: 20 },
];

export const badges = [
  { id: "b1", name: "First Step", description: "Complete your first habit.", icon: "Footprints", unlocked: true, color: "var(--color-success)" },
  { id: "b2", name: "3-Day Spark", description: "Reach a 3-day streak.", icon: "Flame", unlocked: true, color: "var(--color-streak)" },
  { id: "b3", name: "Weekly Warrior", description: "Reach a 7-day streak.", icon: "Shield", unlocked: true, color: "var(--color-primary)" },
  { id: "b4", name: "Consistency Champ", description: "Complete 10 habits.", icon: "Trophy", unlocked: false, color: "var(--color-xp)" },
  { id: "b5", name: "Comeback Hero", description: "Complete after missing a day.", icon: "RefreshCw", unlocked: false, color: "var(--color-quest)" },
  { id: "b6", name: "Level Up", description: "Reach Level 2.", icon: "Stars", unlocked: true, color: "var(--color-badge)" },
];

export const challenges = [
  { id: "c1", title: "7-Day Coding Streak", category: "Coding", progress: 5, target: 7, rewardXP: 150, rewardCoins: 30, joined: true },
  { id: "c2", title: "14-Day Study Sprint", category: "Study", progress: 8, target: 14, rewardXP: 220, rewardCoins: 40, joined: true },
  { id: "c3", title: "30-Day Reading Quest", category: "Reading", progress: 9, target: 30, rewardXP: 300, rewardCoins: 60, joined: false },
  { id: "c4", title: "Hydration Hero", category: "Wellness", progress: 4, target: 7, rewardXP: 120, rewardCoins: 20, joined: false },
  { id: "c5", title: "Sleep Reset", category: "Sleep", progress: 2, target: 7, rewardXP: 130, rewardCoins: 25, joined: false },
];

export const notifications = [
  { id: "n1", type: "badge", title: "Badge unlocked", message: "You earned Weekly Warrior for a 7-day streak.", time: "10 min ago", isRead: false },
  { id: "n2", type: "streak", title: "Streak warning", message: "Read for 20 minutes is still waiting today.", time: "1 hour ago", isRead: false },
  { id: "n3", type: "level", title: "Level up", message: "You reached Level 3 Trailblazer.", time: "Yesterday", isRead: true },
  { id: "n4", type: "habit", title: "Habit reminder", message: "Study for 2 hours is scheduled for this evening.", time: "Yesterday", isRead: true },
  { id: "n5", type: "challenge", title: "Challenge progress", message: "You are 5/7 days into your Coding Streak.", time: "2 days ago", isRead: true },
];

export const analyticsSummary = {
  completionRate: 82,
  totalCompletions: 87,
  currentStreak: 12,
  bestHabit: "Coding",
  weakestHabit: "Wellness",
};

export const weeklyProgress = [
  { day: "Mon", completions: 3, xp: 60 },
  { day: "Tue", completions: 4, xp: 80 },
  { day: "Wed", completions: 2, xp: 40 },
  { day: "Thu", completions: 5, xp: 110 },
  { day: "Fri", completions: 4, xp: 90 },
  { day: "Sat", completions: 3, xp: 60 },
  { day: "Sun", completions: 1, xp: 20 },
];

export const categoryBreakdown = [
  { name: "Coding", value: 32 },
  { name: "Study", value: 24 },
  { name: "Wellness", value: 20 },
  { name: "Reading", value: 14 },
  { name: "Sleep", value: 10 },
];

export const heatmapData = Array.from({ length: 42 }, (_, index) => ({
  id: index,
  count: [0, 1, 2, 3, 4][(index * 7 + 3) % 5],
}));

export const adminStats = {
  totalUsers: 1240,
  totalHabits: 4560,
  totalCompletions: 12800,
  activeChallenges: 8,
  totalBadgesUnlocked: 3196,
};

export const adminRows = [
  { id: "a1", user: "Jane Doe", initials: "JD", action: "Completed Habit", target: "Morning Run", status: "Active" },
  { id: "a2", user: "Mike Smith", initials: "MS", action: "Unlocked Badge", target: "7-Day Streak", status: "Active" },
  { id: "a3", user: "Sarah Lee", initials: "SL", action: "Joined Challenge", target: "Study Sprint", status: "Active" },
  { id: "a4", user: "Alex Kim", initials: "AK", action: "Created Habit", target: "Read 20 pages", status: "Active" },
];

export const landingPreviewHabits = [
  { name: "Read 20 pages", icon: "menu_book", done: false },
  { name: "Drink water", icon: "water_drop", done: true },
  { name: "Code for 1 hour", icon: "code", done: false },
];

export const dashboardBars = [
  { day: "M", height: "40%", active: false },
  { day: "T", height: "60%", active: false },
  { day: "W", height: "85%", active: true },
  { day: "T", height: "33%", active: false, today: true },
  { day: "F", height: "0%", active: false },
  { day: "S", height: "0%", active: false },
  { day: "S", height: "0%", active: false },
];
