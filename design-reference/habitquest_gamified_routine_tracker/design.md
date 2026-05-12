# DESIGN.md — HabitQuest MVP Design System

## 1. Product Identity

### Product Name
HabitQuest

### Full Product Title
HabitQuest: A Gamified Habit-Building Web Application with Streak Tracking

### Product Description
HabitQuest is a gamified productivity web app that helps students and young adults build better routines. Users can create habits, complete daily goals, build streaks, earn XP, level up, unlock badges, join simple challenges, and view progress analytics with a calendar heatmap.

The app should feel like a polished productivity game, not a basic to-do list.

## 2. MVP Scope

This design system is for a realistic 22-day MVP.

The MVP includes:
- Landing page
- Register page
- Login page
- Goal-based onboarding
- Habit template selection
- User dashboard
- Create/edit habit page
- Habit detail page
- Analytics page
- Achievements/badges page
- Simple challenges page
- Notification center
- Profile page
- Admin lite dashboard

The MVP does not include:
- Accountability partner
- Full leaderboard
- Email reminders
- Complex avatar shop
- Mood journal
- Social feed
- Complex enterprise admin system
- Full dark mode implementation

Dark mode may be considered visually, but light mode is the main design.

## 3. Design Goal

The goal is to create a high-fidelity, production-ready interface that is:
- Clean
- Modern
- Motivational
- Student-focused
- Friendly
- Slightly playful
- Premium
- Presentation-worthy
- Realistic for a MERN student team to build in 22 days

The app should look more polished than a basic CRUD project.

## 4. Brand Personality

HabitQuest should feel:
- Motivational
- Energetic
- Encouraging
- Focused
- Friendly
- Practical
- Rewarding
- Slightly playful
- Mature enough for students and young adults

The app should not feel:
- Childish
- Cluttered
- Overly cartoonish
- Corporate and boring
- Like a plain to-do list
- Like a complex RPG game

## 5. Design Inspiration

The interface should be inspired by:
- Duolingo’s motivational energy
- Habitica’s habit gamification
- Notion’s clean organization
- Modern SaaS dashboard layouts

The design must be original and should not directly copy any existing product.

## 6. Visual Style

### Overall Style
- Modern SaaS dashboard
- Soft rounded cards
- Clean whitespace
- Friendly icons
- Motivational gamification elements
- Calm but energetic colors
- Smooth progress visuals
- Mobile responsive layouts

### Core Visual Elements
- XP cards
- Level progress bars
- Streak flame indicators
- Badge cards
- Daily quest cards
- Calendar heatmap
- Weekly progress charts
- Habit completion cards
- Empty state illustrations
- Loading skeletons
- Success modals

## 7. Color Palette

Use this palette consistently across the app.

### Primary Colors
- Primary Purple: `#6C5CE7`
- Deep Purple: `#4B3FCF`
- Soft Lavender: `#EEEAFE`

### Gamification Colors
- XP Gold: `#FBBF24`
- Streak Orange: `#F97316`
- Badge Pink: `#EC4899`
- Quest Blue: `#38BDF8`
- Success Green: `#22C55E`

### Neutral Colors
- App Background: `#F8FAFC`
- Card Surface: `#FFFFFF`
- Border: `#E2E8F0`
- Text Primary: `#0F172A`
- Text Secondary: `#64748B`
- Muted Text: `#94A3B8`

### Feedback Colors
- Error Red: `#EF4444`
- Warning Amber: `#F59E0B`
- Info Blue: `#3B82F6`

## 8. Color Usage Rules

### Primary Purple
Use for:
- Main CTAs
- Active navigation
- Selected states
- Important progress highlights
- Main brand moments

### XP Gold
Use for:
- XP indicators
- Level progress accents
- Reward highlights

### Streak Orange
Use for:
- Streak cards
- Flame icons
- Streak warning states

### Badge Pink
Use for:
- Badge highlights
- Achievement cards
- Unlock moments

### Quest Blue
Use for:
- Daily quest cards
- Challenge progress
- Informational highlights

### Success Green
Use for:
- Completed habits
- Positive progress
- Success states

### Neutral Colors
Use neutrals for:
- Page backgrounds
- Cards
- Borders
- Body text
- Metadata
- Secondary UI

Do not use too many bright colors in one section. Use gamification colors as accents, not as background everywhere.

## 9. Dark Mode Consideration

Light mode is the main design.

If dark mode preview is shown, use:
- Dark Background: `#0F172A`
- Dark Surface: `#1E293B`
- Dark Border: `#334155`
- Dark Text Primary: `#F8FAFC`
- Dark Text Secondary: `#CBD5E1`
- Dark Primary Accent: `#8B7CF6`

Do not use pure black backgrounds.

## 10. Typography

Use a modern sans-serif typeface.

Recommended fonts:
- Inter
- Plus Jakarta Sans
- Manrope
- System sans-serif

### Typography Scale

#### Desktop
- Hero heading: 48px–64px
- Page heading: 30px–36px
- Section heading: 20px–24px
- Card heading: 16px–18px
- Body text: 14px–16px
- Small labels: 12px–13px

#### Mobile
- Hero heading: 34px–42px
- Page heading: 26px–30px
- Section heading: 18px–22px
- Card heading: 16px–18px
- Body text: 14px–16px
- Small labels: 12px–13px

### Typography Rules
- Headings should be bold and confident.
- Body text should be readable.
- Labels should be clear and compact.
- Avoid decorative fonts.
- Avoid long text blocks inside cards.

## 11. Layout System

### Desktop App Layout
Use a dashboard shell:
- Left sidebar navigation
- Top header
- Main content area
- Card-based grid

Recommended desktop structure:
- Sidebar width: around 240px
- Main page padding: 32px
- Card gap: 20px–24px
- Card padding: 20px–24px

### Tablet Layout
- Sidebar may collapse
- Use two-column card grids where possible
- Maintain readable spacing

### Mobile Layout
Use:
- Top header
- Bottom navigation
- Single-column content
- Stacked cards
- Thumb-friendly buttons

Recommended mobile structure:
- Page padding: 16px
- Card gap: 16px
- Card padding: 16px–20px
- Bottom navigation fixed at bottom

## 12. Spacing System

Use consistent spacing:
- 4px for tiny gaps
- 8px for small gaps
- 12px for compact spacing
- 16px for standard spacing
- 24px for card/section spacing
- 32px for large section spacing
- 48px+ for landing page sections

## 13. Border Radius

Use soft rounded corners:
- Inputs: 12px
- Buttons: 12px–16px
- Small chips: 999px pill radius
- Cards: 18px–24px
- Modals: 24px
- Dashboard feature cards: 24px

## 14. Shadows

Use soft shadows only.

Recommended:
- Cards: subtle shadow with low opacity
- Hover cards: slightly stronger shadow
- Modals: medium soft shadow

Avoid harsh black shadows.

## 15. Buttons

### Primary Button
Use for main actions.

Style:
- Primary Purple background
- White text
- Rounded corners
- Medium-bold label
- Slight hover/pressed state

Examples:
- Start Your Quest
- Create Account
- Continue Your Quest
- Create Habit
- Complete Habit
- Save Habit
- Join Challenge
- Claim Reward

### Secondary Button
Use for supporting actions.

Style:
- Soft Lavender background
- Primary Purple text
- Rounded corners

Examples:
- View Demo
- Customize
- View Details
- Create Custom Habit
- Explore Challenges

### Ghost Button
Use for low-priority actions.

Style:
- Transparent background
- Text Secondary
- Minimal border or no border

Examples:
- Skip for Now
- Cancel
- Maybe Later
- Back

### Danger Button
Use for destructive actions.

Style:
- Error Red background or red outline
- Clear warning label

Examples:
- Delete Habit
- Remove Badge
- Deactivate Challenge

## 16. Form Inputs

Form inputs should be:
- Rounded
- Spacious
- Clearly labeled
- Accessible
- Easy to scan

Input states:
- Default
- Focus
- Error
- Success
- Disabled

Use helpful validation messages.

Example:
- “Habit name is required.”
- “Please enter a valid email address.”
- “Password must be at least 8 characters.”

## 17. Navigation

### Desktop Sidebar
Include:
- Logo
- Dashboard
- Habits
- Analytics
- Achievements
- Challenges
- Notifications
- Profile
- Settings

Active navigation item:
- Soft Lavender background
- Primary Purple text/icon
- Rounded pill/card style

### Top Header
Include:
- Search bar
- Notification bell
- Profile avatar
- Optional quick action button

### Mobile Bottom Navigation
Include:
- Dashboard
- Habits
- Analytics
- Achievements
- Profile

Use icons with labels.

## 18. Core Components

### Habit Card
Each habit card should include:
- Habit icon
- Habit name
- Category chip
- Target/progress
- Current streak
- XP reward
- Completion status
- Complete button

States:
- Incomplete
- Completed
- Missed
- Loading

### XP/Level Card
Include:
- Current level
- Total XP
- XP progress bar
- XP needed for next level
- Sparkle or lightning icon

### Streak Card
Include:
- Flame icon
- Current streak
- Longest streak
- Motivational text

### Badge Card
Include:
- Badge icon
- Badge name
- Description
- Locked/unlocked state
- Progress indicator where needed

### Daily Quest Card
Include:
- Quest title
- Quest progress
- Reward XP
- Progress bar
- CTA

### Challenge Card
Include:
- Challenge title
- Description
- Duration
- Category
- Reward
- Progress bar
- Join/Continue button

### Analytics Card
Include:
- Stat title
- Main value
- Supporting text
- Small trend indicator

### Calendar Heatmap
Include:
- Monthly grid
- Color intensity for completion
- Legend
- Clickable/hoverable day state where applicable

### Admin Stat Card
Include:
- Metric name
- Metric value
- Icon
- Trend indicator if useful

### Admin Table
Include:
- Clear headers
- Status chips
- Action buttons
- Search/filter controls

## 19. Page-Specific Design Rules

### Landing Page
Must feel polished and marketable.
Use strong hero section, clear CTA, product preview, feature cards, and final CTA.

### Dashboard
Dashboard is the most important screen.
It must look impressive and complete.
Prioritize:
- Today’s progress
- Habit cards
- XP/level
- Streaks
- Badges
- Heatmap
- Weekly analytics

### Analytics Page
Must feel visual and useful.
Use charts, stat cards, heatmap, and insight cards.

### Achievements Page
Must feel rewarding.
Locked badges should still look attractive but muted.

### Challenges Page
Must feel motivational but simple.
Do not make challenge logic look too complex.

### Admin Lite Dashboard
Must feel structured and clean.
Use stat cards, simple charts, and tables.
Do not make it feel like a huge enterprise admin panel.

## 20. Empty States

### No Habits Yet
Title: “No habits yet”
Message: “Start with one small habit and build from there.”
Button: “Create Your First Habit”

### No Completed Habits
Title: “No completions yet”
Message: “Complete a habit today to start building momentum.”
Button: “View Today’s Habits”

### No Badges Unlocked
Title: “Badges are waiting”
Message: “Complete habits and keep streaks alive to unlock achievements.”
Button: “View Habits”

### No Challenges Joined
Title: “No challenges joined”
Message: “Join a challenge and turn your routine into a quest.”
Button: “Explore Challenges”

### No Notifications
Title: “All clear”
Message: “Reminders, streak warnings, and rewards will appear here.”

### No Analytics Data
Title: “Not enough data yet”
Message: “Complete habits for a few days to unlock your progress insights.”
Button: “Go to Dashboard”

## 21. Loading States

Use skeleton loaders instead of plain spinners.

Create skeleton states for:
- Dashboard cards
- Habit list
- Analytics charts
- Calendar heatmap
- Badge grid
- Challenge cards
- Admin tables

Skeletons should:
- Match actual card shape
- Use soft neutral colors
- Have rounded corners
- Use subtle pulse animation

## 22. Success States

### Habit Completed
Title: “Nice work!”
Message: “You earned 20 XP and kept your streak alive.”
Button: “Continue”

### Badge Unlocked
Title: “Badge unlocked!”
Message: “You earned the Weekly Warrior badge.”
Button: “View Achievements”

### Level Up
Title: “Level up!”
Message: “You reached Level 3. Your consistency is growing.”
Button: “Awesome”

### Habit Created
Title: “Habit created”
Message: “Your new habit has been added to today’s quest.”
Button: “Go to Dashboard”

### Challenge Joined
Title: “Challenge joined”
Message: “Your new challenge has been added to your quest list.”
Button: “View Challenge”

## 23. Microcopy

### General Tone
Microcopy should be:
- Motivational
- Mature
- Short
- Friendly
- Encouraging
- Student-focused

### Good Microcopy Examples
- “Turn your daily habits into a quest.”
- “Start Your Quest”
- “Welcome back. You’re building momentum.”
- “Your streak is heating up.”
- “Complete one more habit to finish today’s quest.”
- “Nice work. 20 XP earned.”
- “Badge unlocked!”
- “Level up!”
- “Start with one small win.”
- “Your consistency improved this week.”
- “Pick a few habits to begin your quest.”
- “Protect your streak.”
- “You’re closer than yesterday.”

### Avoid
- “You failed.”
- “You are lazy.”
- “Bad user.”
- “Don’t break your life.”
- Overly childish phrases
- Long motivational speeches

## 24. Icons and Illustrations

### Icon Style
Use clean line icons or soft filled icons.

Recommended icon meanings:
- Flame = streak
- Trophy = achievements
- Coin = rewards
- Sparkles = XP
- Calendar = heatmap
- Target = goals
- Bell = notifications
- Chart = analytics
- Shield/star = badges
- Rocket = onboarding
- Book = study/reading
- Dumbbell = fitness
- Code brackets = coding
- Water drop = hydration
- Moon = sleep

### Illustration Style
Use minimal friendly illustrations.
Illustrations should support the UI, not dominate it.

Avoid large childish cartoon characters.

## 25. Charts and Data Visualization

Use simple, readable visuals:
- Weekly bar chart
- Calendar heatmap
- Category breakdown chart
- Completion rate card
- Trend line chart if needed

Rules:
- Keep charts clean.
- Use labels clearly.
- Avoid visual clutter.
- Use brand colors as accents.
- Ensure charts work on mobile.

## 26. Mobile Design Rules

Mobile must feel intentionally designed.

Do:
- Use bottom navigation
- Stack cards vertically
- Keep CTA buttons large
- Use compact charts
- Keep heatmap readable
- Use short headings
- Avoid wide tables

For mobile admin pages:
- Convert tables into stacked cards
- Put actions inside kebab menus or small action rows
- Use filters as dropdowns

## 27. Accessibility

Follow these rules:
- Use strong contrast for text
- Do not rely only on color for meaning
- Use icons plus labels where needed
- Keep button labels clear
- Make tap targets large enough
- Use readable font sizes
- Avoid tiny chart labels

## 28. UI Do’s

Do:
- Make the dashboard visually impressive.
- Keep the MVP realistic.
- Use consistent colors and spacing.
- Make habits easy to complete.
- Make XP, streaks, and badges easy to understand.
- Use empty states that guide the user.
- Make success states feel rewarding.
- Use clean data visuals.
- Make mobile layouts feel polished.
- Keep admin pages simple and clean.

## 29. UI Don’ts

Do not:
- Make the app look like a basic to-do list.
- Make the app look childish.
- Overload the UI with bright colors.
- Use cluttered RPG-style screens.
- Add features outside the MVP scope.
- Hide important actions like “Complete Habit.”
- Make admin pages too complex.
- Copy existing apps directly.
- Use vague button labels like “Submit.”
- Make charts too complicated.
- Ignore empty/loading states.

## 30. Final Design Quality Bar

The final design should look:
- High-fidelity
- Consistent
- Realistic
- Production-ready
- Presentation-worthy
- Friendly
- Motivational
- Premium
- Buildable by a student MERN team in 22 days