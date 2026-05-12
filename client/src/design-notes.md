# HabitQuest Stitch Design Audit

## Reference Used

Source folder: `design-reference/habitquest_gamified_routine_tracker/`

The reference contains desktop and mobile HTML/screens for landing, register, sign in, onboarding, templates, dashboard, create/edit/detail habit pages, analytics, achievements, challenges, notifications, profile, admin lite dashboard, loading, empty, and success states.

## Main Colors

- Primary: `#5341cd` and `#6C5CE7`
- Deep purple: `#4B3FCF`
- Soft surface/lavender: `#fcf8ff`, `#f6f2fe`, `#EEEAFE`
- XP: `#FBBF24`
- Streak: `#F97316`
- Badge: `#EC4899`
- Quest: `#38BDF8`
- Success: `#22C55E`
- Background: `#F8FAFC`
- Text: `#0F172A`, `#64748B`, `#94A3B8`
- Border: `#E2E8F0`

## Typography

The reference uses Plus Jakarta Sans for hero/page headings and Inter for body text, labels, cards, and controls. The React app preserves that feel using Google font imports and a `font-display` utility.

## Layout Patterns

- Landing page uses a sticky top bar, large rounded hero/dashboard preview, and soft glass cards.
- App pages use a desktop sidebar, sticky topbar, responsive content grid, and mobile bottom navigation.
- Cards are white, softly rounded, lightly bordered, and use ambient shadows.
- Gamification cards use accent colors for XP, streaks, badges, and quests.

## Reusable Components Found

- Sidebar navigation
- Top app bar
- Habit completion cards
- XP/level progress cards
- Streak summary cards
- Badge cards
- Challenge cards
- Calendar heatmap
- Weekly charts
- Auth form layout
- Success/confirmation modal styling

## Assets

No full Stitch folder was moved into `client/src`. Remote image URLs from the reference are reused for visual parity where useful, especially the profile/avatar treatment.
