# HabitQuest MVP Software Requirements Document

## 1. Product Overview

**App Name:** HabitQuest

HabitQuest is a gamified habit-building web application that helps students and young adults build better routines through habit tracking, streaks, XP, levels, badges, analytics, and simple challenges.

The app should feel like a polished productivity game, not a basic to-do list. The core experience is simple: users create habits, complete them daily, earn rewards, and visually track consistency over time.

### Problem It Solves

Many students and young adults want to build better habits but struggle with motivation, consistency, and progress visibility. Traditional to-do apps often feel too plain, while complex habit apps can feel overwhelming.

HabitQuest solves this by making consistency feel rewarding through lightweight game mechanics.

### Target Users

- Students
- Young adults
- Beginner programmers
- Readers
- Fitness beginners
- People building wellness, sleep, productivity, spiritual growth, or study routines

### Main Value Proposition

HabitQuest helps users stay consistent by turning everyday habits into a rewarding progress system with streaks, XP, levels, badges, challenges, and visual analytics.

---

## 2. MVP Scope

### Must-Have Features

- Landing page
- Register page
- Login/sign in page
- Logout
- JWT authentication
- Protected routes
- Goal-based onboarding
- Habit template selection
- Create habit
- View habits
- Edit habit
- Delete or archive habit
- Dashboard showing today's habits
- Complete habit
- Prevent duplicate completion for the same habit on the same day
- Completion logs
- Current streak calculation
- Longest streak calculation
- XP reward system
- Level system
- Badge unlock system
- Achievements/badges page
- Analytics page
- Calendar heatmap
- Weekly completion chart
- Simple challenges page
- Notification center
- Profile page
- Admin lite dashboard

### Should-Have Features

- Habit categories
- Habit difficulty selection
- Habit detail page
- Archive habit instead of permanent delete
- Basic challenge joining
- Notifications for badge unlocks, level ups, and challenge completion
- Basic admin management for categories, badges, and challenges if time allows

### Nice-to-Have Features

- Habit icons
- Motivational empty states
- Simple celebration animation after badge unlock
- Recent activity feed
- Badge rarity labels
- Challenge completion rewards

### Out-of-Scope Features

- Dark mode
- Email reminders
- Social feed
- Accountability partners
- Leaderboard
- Avatar shop
- Mood journal
- Real AI recommendations
- Complex admin system
- Complex recurring scheduling
- Payment features

---

## 3. User Roles and Permissions

### Guest

Guests can:

- View the landing page
- Register
- Log in

Guests cannot:

- Access dashboard
- Create habits
- Complete habits
- View analytics
- View achievements
- Access admin pages

### Registered User

Registered users can:

- Complete onboarding
- Select habit templates
- Create, view, edit, archive, and delete their own habits
- Complete habits
- Earn XP
- Build streaks
- Unlock badges
- View analytics
- Join simple challenges
- View notifications
- View and update profile

Registered users cannot:

- Access another user's habits or progress
- Access admin dashboard
- Manage global categories, badges, or challenges

### Admin Lite

Admins can:

- View total users
- View total habits
- View total completions
- View active challenges
- View badge activity
- Manage categories, badges, and challenges if time allows

Admins cannot:

- View user passwords
- Access private user data beyond MVP summary information
- Modify user progress unless a future requirement adds that feature

---

## 4. Functional Requirements

| ID | Feature Name | Description | User Role | Priority | Acceptance Criteria |
|---|---|---|---|---|---|
| FR-001 | Landing Page | Display app value, core features, and calls to action. | Guest | High | Guest can visit landing page and navigate to register or login. |
| FR-002 | Register | Allow new users to create accounts. | Guest | High | User can register with name, email, and password. Duplicate emails are rejected. |
| FR-003 | Login | Allow existing users to sign in. | Guest | High | Valid credentials return a token and user data. Invalid credentials show an error. |
| FR-004 | Logout | Allow users to end their session. | Registered User | High | Token is removed from client storage and user is redirected. |
| FR-005 | JWT Authentication | Protect private API routes with JWT. | Registered User, Admin | High | Requests without a valid token are rejected. |
| FR-006 | Protected Routes | Prevent unauthenticated access to app pages. | Guest, Registered User | High | Guests visiting private pages are redirected to login. |
| FR-007 | Goal-Based Onboarding | Collect user goals and preferred categories. | Registered User | High | New users complete onboarding before accessing dashboard. |
| FR-008 | Habit Template Selection | Let users choose starter habits. | Registered User | High | Selected templates create user habits. |
| FR-009 | Create Habit | Let users create custom habits. | Registered User | High | Habit is saved with title, category, difficulty, and status. |
| FR-010 | View Habits | Show user's active habits. | Registered User | High | User sees only their own habits. |
| FR-011 | Edit Habit | Let users update their habit details. | Registered User | High | User can edit only habits they own. |
| FR-012 | Delete or Archive Habit | Remove a habit from active tracking. | Registered User | High | Archived habit no longer appears in today's active list. |
| FR-013 | Dashboard | Show today's habits and progress summary. | Registered User | High | Dashboard displays today's habits, XP, level, streaks, and badges. |
| FR-014 | Complete Habit | Mark a habit as completed for today. | Registered User | High | Completion creates a log, awards XP, updates streaks, and checks badges. |
| FR-015 | Prevent Duplicate Completion | Stop users from completing the same habit twice in one day. | Registered User | High | Second completion attempt creates no log and awards no XP. |
| FR-016 | Completion Logs | Store every successful habit completion. | Registered User | High | Log contains user, habit, completed date, XP earned, and difficulty. |
| FR-017 | Current Streak | Track current consecutive completion streak. | Registered User | High | Current streak updates after successful completion. |
| FR-018 | Longest Streak | Track the highest streak per habit. | Registered User | High | Longest streak updates only when current streak becomes higher. |
| FR-019 | XP Reward System | Award XP based on habit difficulty. | Registered User | High | Easy gives 10 XP, medium gives 20 XP, hard gives 30 XP. |
| FR-020 | Level System | Calculate user level from total XP. | Registered User | High | User level updates when XP crosses a threshold. |
| FR-021 | Badge Unlock System | Unlock badges based on milestones. | Registered User | High | Badges are awarded once and saved to user profile. |
| FR-022 | Achievements Page | Display locked and unlocked badges. | Registered User | Medium | User can view earned badges and badge requirements. |
| FR-023 | Analytics Page | Display progress statistics and charts. | Registered User | High | User can view completion stats, heatmap, and weekly chart. |
| FR-024 | Calendar Heatmap | Show daily completion activity. | Registered User | High | Heatmap is generated from completion logs grouped by date. |
| FR-025 | Weekly Completion Chart | Show completions per day for the current week. | Registered User | High | Chart displays daily counts for the week. |
| FR-026 | Challenges Page | Show simple challenges users can join. | Registered User | Medium | User can join active challenges and see progress. |
| FR-027 | Notification Center | Show app notifications. | Registered User | Medium | User can view and mark notifications as read. |
| FR-028 | Profile Page | Display user account and progress summary. | Registered User | Medium | User can view name, email, XP, level, badges, and completion stats. |
| FR-029 | Admin Lite Dashboard | Show system-wide summary metrics. | Admin | Medium | Admin can view total users, habits, completions, challenges, and badge activity. |
| FR-030 | Admin Management | Manage categories, badges, and challenges if time allows. | Admin | Low | Admin can create or update categories, badges, and challenges. |

---

## 5. Non-Functional Requirements

### Performance

- Dashboard should load within 2 seconds on a normal connection.
- Common API requests should respond within 500 ms to 1.5 seconds in development.
- Analytics should be generated from indexed completion logs.
- User pages should only fetch data belonging to the logged-in user.

### Security

- Passwords must be hashed using `bcryptjs`.
- JWT must be required for protected routes.
- Admin routes must check both authentication and role.
- Users must only access their own habits, logs, badges, challenges, notifications, and profile.
- Sensitive values must be stored in `.env`.
- Backend must validate important request data.

### Usability

- Dashboard should make today's next action obvious.
- Habit cards should clearly show completed and incomplete states.
- Duplicate completion should be blocked in both frontend and backend.
- Empty states should guide users toward creating habits or selecting templates.
- The app should feel rewarding without being visually overwhelming.

### Reliability

- Completion logs must not duplicate for the same user, habit, and date.
- XP must only be awarded after successful habit completion.
- Streaks must update only after successful completion.
- Badges must not be awarded twice.
- API errors should return clear messages.

### Maintainability

- Backend should separate models, routes, controllers, middleware, and utilities.
- Frontend should separate pages, components, services, contexts, and hooks.
- Reusable UI components should be used for repeated patterns.
- Business logic such as XP, levels, streaks, and badges should be placed in utility/service functions.

### Responsiveness

- App must work on mobile, tablet, and desktop.
- Mobile should use a bottom navigation or simplified navigation.
- Cards, charts, and forms should stack cleanly on small screens.

### Browser Compatibility

Support the latest stable versions of:

- Chrome
- Edge
- Firefox
- Safari

---

## 6. User Stories

### Authentication

- As a guest, I want to register, so that I can start tracking my habits.
- As a guest, I want to log in, so that I can access my dashboard.
- As a user, I want to log out, so that my account stays secure.
- As a user, I want private routes protected, so that only I can access my habit data.

### Onboarding

- As a new user, I want to choose my goals, so that the app can personalize my starter experience.
- As a new user, I want to choose preferred habit categories, so that I can find relevant templates.
- As a new user, I want to select starter habits, so that I can begin quickly.

### Habit Management

- As a user, I want to create a habit, so that I can track a routine I care about.
- As a user, I want to view my habits, so that I know what I am working on.
- As a user, I want to edit a habit, so that I can update its details.
- As a user, I want to archive a habit, so that inactive habits do not clutter my dashboard.

### Habit Completion

- As a user, I want to complete a habit for today, so that I can record progress.
- As a user, I want completed habits to show as completed, so that I do not repeat them accidentally.
- As a user, I want the system to prevent duplicate completions, so that XP and stats stay accurate.

### Streaks

- As a user, I want to see my current streak, so that I feel motivated to continue.
- As a user, I want to see my longest streak, so that I can beat my personal best.
- As a user, I want streaks to reset after a missed day, so that my progress is honest.

### XP and Levels

- As a user, I want to earn XP when I complete habits, so that daily action feels rewarding.
- As a user, I want harder habits to give more XP, so that effort is recognized.
- As a user, I want to level up, so that I can see long-term progress.

### Badges

- As a user, I want to unlock badges, so that milestones feel meaningful.
- As a user, I want to view my achievements, so that I can see what I have earned.
- As a user, I want badges to unlock only once, so that achievements remain special.

### Analytics

- As a user, I want to see a heatmap, so that I can understand my consistency.
- As a user, I want to see weekly completions, so that I can track recent performance.
- As a user, I want to see completion rate, so that I can measure progress.

### Challenges

- As a user, I want to join simple challenges, so that I have short-term goals.
- As a user, I want to see challenge progress, so that I know how close I am to finishing.

### Notifications

- As a user, I want notifications for badges and level ups, so that important wins are visible.
- As a user, I want to mark notifications as read, so that my notification center stays organized.

### Profile

- As a user, I want to view my profile, so that I can see my account and progress summary.
- As a user, I want to update basic profile information, so that my account feels personal.

### Admin Lite

- As an admin, I want to view total users, so that I can understand app usage.
- As an admin, I want to view total habits and completions, so that I can measure engagement.
- As an admin, I want to view active challenges, so that I can monitor challenge activity.
- As an admin, I want to manage badges and categories if time allows, so that app content can be updated.

---

## 7. Acceptance Criteria

### Register

Given a guest is on the register page,  
When they enter a valid name, email, and password,  
Then a new account is created and the user can continue to onboarding.

Given a guest enters an email already in use,  
When they submit the register form,  
Then the app shows an error message.

### Login

Given a registered user has an account,  
When they enter valid credentials,  
Then they are logged in and redirected to the dashboard.

Given a user enters invalid credentials,  
When they submit the login form,  
Then the app shows an authentication error.

### Protected Routes

Given a guest is not logged in,  
When they visit `/dashboard`,  
Then they are redirected to login.

### Onboarding

Given a new user logs in for the first time,  
When onboarding is incomplete,  
Then they are redirected to onboarding.

Given the user completes onboarding,  
When they save goals, categories, and selected templates,  
Then the app creates selected starter habits and sends them to the dashboard.

### Create Habit

Given a logged-in user is on the create habit page,  
When they submit valid habit details,  
Then a new habit is created and shown in their habit list.

### Complete Habit

Given a user has an active habit for today,  
When they click complete,  
Then the app creates a completion log, awards XP, updates streaks, checks badges, and marks the habit complete.

Given the habit is already completed today,  
When the user tries to complete it again,  
Then no new log is created and no extra XP is awarded.

### Streaks

Given a user completed the habit yesterday,  
When they complete it today,  
Then current streak increases by 1.

Given a user missed yesterday,  
When they complete the habit today,  
Then current streak resets to 1.

Given current streak becomes greater than longest streak,  
When completion is saved,  
Then longest streak updates.

### XP and Level

Given a user completes an easy habit,  
When the completion is saved,  
Then the user earns 10 XP.

Given total XP reaches a level threshold,  
When XP is updated,  
Then the user level updates.

### Badges

Given a user completes their first habit,  
When the completion is saved,  
Then the First Step badge is unlocked.

Given a badge is already unlocked,  
When the same condition happens again,  
Then the badge is not awarded twice.

### Analytics

Given a user has completion logs,  
When they visit analytics,  
Then the app displays heatmap data and weekly completion chart.

### Admin

Given an admin is logged in,  
When they visit the admin dashboard,  
Then they can view total users, habits, completions, active challenges, and badge activity.

Given a normal user visits an admin route,  
When the request is made,  
Then access is denied.

---

## 8. Main User Flows

### New User Flow

1. User lands on landing page.
2. User clicks register.
3. User creates an account.
4. User is redirected to onboarding.
5. User selects goals and preferred categories.
6. User selects starter habit templates.
7. App creates selected starter habits.
8. User lands on dashboard.

### Returning User Flow

1. User opens login page.
2. User logs in.
3. User lands on dashboard.
4. User sees today's habits.
5. User completes habits.
6. XP, streaks, and badges update.
7. User views analytics or achievements.

### Habit Creation Flow

1. User opens create habit page.
2. User enters title, description, category, and difficulty.
3. User submits form.
4. Backend saves habit for that user.
5. User returns to dashboard or habit detail page.

### Habit Completion Flow

1. User sees today's habit card.
2. User clicks complete.
3. Backend checks for duplicate completion.
4. Backend creates a habit log.
5. Backend awards XP.
6. Backend updates current and longest streaks.
7. Backend checks level and badge unlocks.
8. Frontend updates dashboard and shows success feedback.

### Badge Unlock Flow

1. User completes a habit.
2. Backend checks badge conditions.
3. If a new condition is met, backend creates a user badge.
4. Backend creates a notification.
5. Frontend shows a toast or success modal.
6. Badge appears on achievements page.

### Analytics Flow

1. User opens analytics page.
2. Frontend requests analytics data.
3. Backend reads completion logs.
4. Backend returns summary stats, heatmap data, and weekly chart data.
5. Frontend renders analytics views.

### Admin Flow

1. Admin logs in.
2. Admin visits admin dashboard.
3. Backend verifies admin role.
4. Admin sees app-wide summary metrics.
5. If time allows, admin manages categories, badges, and challenges.

---

## 9. Data Requirements

### User

Fields:

- `_id`
- `name`
- `email`
- `passwordHash`
- `role`: `user` or `admin`
- `totalXP`
- `level`
- `goals`
- `preferredCategories`
- `onboardingCompleted`
- `createdAt`
- `updatedAt`

### Habit

Fields:

- `_id`
- `userId`
- `title`
- `description`
- `categoryId`
- `difficulty`: `easy`, `medium`, `hard`
- `status`: `active`, `archived`
- `currentStreak`
- `longestStreak`
- `lastCompletedDate`
- `createdAt`
- `updatedAt`

### HabitLog

Fields:

- `_id`
- `userId`
- `habitId`
- `completedDate`
- `xpEarned`
- `difficulty`
- `createdAt`

Important index:

- Unique combination of `userId`, `habitId`, and `completedDate`

### Badge

Fields:

- `_id`
- `name`
- `description`
- `conditionType`
- `conditionValue`
- `icon`
- `isActive`
- `createdAt`
- `updatedAt`

Example condition types:

- `first_completion`
- `streak_count`
- `total_completions`
- `level_reached`
- `comeback`

### UserBadge

Fields:

- `_id`
- `userId`
- `badgeId`
- `unlockedAt`

Important index:

- Unique combination of `userId` and `badgeId`

### Challenge

Fields:

- `_id`
- `title`
- `description`
- `categoryId`
- `targetCompletions`
- `xpReward`
- `startDate`
- `endDate`
- `status`: `active`, `archived`
- `createdAt`
- `updatedAt`

### UserChallenge

Fields:

- `_id`
- `userId`
- `challengeId`
- `progress`
- `status`: `joined`, `completed`
- `joinedAt`
- `completedAt`

### Notification

Fields:

- `_id`
- `userId`
- `type`: `badge`, `level`, `challenge`, `system`
- `title`
- `message`
- `isRead`
- `createdAt`

### Category

Fields:

- `_id`
- `name`
- `description`
- `icon`
- `isActive`
- `createdAt`
- `updatedAt`

---

## 10. API Requirements

### Auth

| Method | Route | Purpose | Auth Required | Expected Request Body | Expected Response |
|---|---|---|---|---|---|
| POST | `/api/auth/register` | Register user | No | `name`, `email`, `password` | User summary and token |
| POST | `/api/auth/login` | Log in user | No | `email`, `password` | User summary and token |
| GET | `/api/auth/me` | Get current user | Yes | None | Current user |
| POST | `/api/auth/logout` | Logout helper | Yes | None | Success message |

### Users/Profile

| Method | Route | Purpose | Auth Required | Expected Request Body | Expected Response |
|---|---|---|---|---|---|
| GET | `/api/users/profile` | Get profile | Yes | None | User profile and stats |
| PUT | `/api/users/profile` | Update profile | Yes | `name` and optional profile fields | Updated profile |
| POST | `/api/users/onboarding` | Save onboarding | Yes | `goals`, `preferredCategories`, `templateIds` | Updated user and created habits |

### Habits

| Method | Route | Purpose | Auth Required | Expected Request Body | Expected Response |
|---|---|---|---|---|---|
| GET | `/api/habits` | Get user habits | Yes | None | Habit list |
| GET | `/api/habits/today` | Get today's habits | Yes | None | Today's habit cards with completion state |
| GET | `/api/habits/:id` | Get habit detail | Yes | None | Habit detail |
| POST | `/api/habits` | Create habit | Yes | `title`, `description`, `categoryId`, `difficulty` | Created habit |
| PUT | `/api/habits/:id` | Edit habit | Yes | Habit fields | Updated habit |
| DELETE | `/api/habits/:id` | Delete or archive habit | Yes | Optional `archiveOnly` | Success message |

### Habit Completion/Logs

| Method | Route | Purpose | Auth Required | Expected Request Body | Expected Response |
|---|---|---|---|---|---|
| POST | `/api/habits/:id/complete` | Complete habit today | Yes | Optional `date` for testing, otherwise today | Log, XP, streak, badges |
| GET | `/api/habit-logs` | Get user completion logs | Yes | Query filters | Logs |
| GET | `/api/habits/:id/logs` | Get logs for one habit | Yes | None | Habit logs |

### Badges

| Method | Route | Purpose | Auth Required | Expected Request Body | Expected Response |
|---|---|---|---|---|---|
| GET | `/api/badges` | Get all active badges | Yes | None | Badge list |
| GET | `/api/badges/me` | Get user badges | Yes | None | Unlocked badges |
| GET | `/api/badges/progress` | Get badge progress | Yes | None | Locked and unlocked badge progress |

### Analytics

| Method | Route | Purpose | Auth Required | Expected Request Body | Expected Response |
|---|---|---|---|---|---|
| GET | `/api/analytics/summary` | Get user stats | Yes | None | XP, level, completions, streaks |
| GET | `/api/analytics/heatmap` | Get heatmap data | Yes | Query date range | Date-count array |
| GET | `/api/analytics/weekly` | Get weekly chart data | Yes | Optional week query | Daily completion counts |
| GET | `/api/analytics/habits/:id` | Get habit-specific analytics | Yes | None | Habit stats |

### Challenges

| Method | Route | Purpose | Auth Required | Expected Request Body | Expected Response |
|---|---|---|---|---|---|
| GET | `/api/challenges` | Get active challenges | Yes | None | Challenge list |
| POST | `/api/challenges/:id/join` | Join challenge | Yes | None | User challenge |
| GET | `/api/challenges/me` | Get joined challenges | Yes | None | User challenge list |

### Notifications

| Method | Route | Purpose | Auth Required | Expected Request Body | Expected Response |
|---|---|---|---|---|---|
| GET | `/api/notifications` | Get notifications | Yes | None | Notification list |
| PUT | `/api/notifications/:id/read` | Mark one as read | Yes | None | Updated notification |
| PUT | `/api/notifications/read-all` | Mark all as read | Yes | None | Success message |

### Admin

| Method | Route | Purpose | Auth Required | Expected Request Body | Expected Response |
|---|---|---|---|---|---|
| GET | `/api/admin/summary` | Get admin metrics | Admin | None | Totals and summaries |
| GET | `/api/admin/users` | View user summaries | Admin | None | User list summary |
| GET | `/api/admin/habits` | View habit summaries | Admin | None | Habit summary |
| GET | `/api/admin/badges/activity` | View badge activity | Admin | None | Recent badge unlocks |
| POST | `/api/admin/categories` | Create category | Admin | Category data | Created category |
| PUT | `/api/admin/categories/:id` | Update category | Admin | Category data | Updated category |
| POST | `/api/admin/badges` | Create badge | Admin | Badge data | Created badge |
| PUT | `/api/admin/badges/:id` | Update badge | Admin | Badge data | Updated badge |
| POST | `/api/admin/challenges` | Create challenge | Admin | Challenge data | Created challenge |
| PUT | `/api/admin/challenges/:id` | Update challenge | Admin | Challenge data | Updated challenge |

---

## 11. Frontend Page Requirements

### Landing

Should contain:

- App name
- Short value proposition
- Register and login buttons
- Feature highlights for streaks, XP, badges, and analytics
- Polished visual style that feels like a productivity game

### Register

Should contain:

- Name input
- Email input
- Password input
- Submit button
- Link to login
- Loading state
- Toast error messages

### Login

Should contain:

- Email input
- Password input
- Submit button
- Link to register
- Loading state
- Toast error messages

### Onboarding

Should contain:

- Goal selection
- Preferred category selection
- Continue button
- Progress indicator if split into multiple steps

### Habit Templates

Should contain:

- Template cards grouped by category
- Select and unselect actions
- Continue to dashboard button

### Dashboard

Should contain:

- Welcome message
- Today's habits
- XP and level card
- Streak summary
- Recently unlocked badges
- Empty state if no habits exist
- Quick link to create habit

### Create Habit

Should contain:

- Habit form
- Title field
- Description field
- Category select
- Difficulty select
- Save and cancel actions

### Edit Habit

Should contain:

- Same fields as create habit
- Save changes action
- Archive or delete option

### Habit Detail

Should contain:

- Habit title
- Category
- Difficulty
- Current streak
- Longest streak
- Completion history
- Edit button

### Analytics

Should contain:

- Total completions
- Completion rate
- Current level and XP
- Calendar heatmap
- Weekly completion chart
- Habit performance summary

### Achievements

Should contain:

- Unlocked badges
- Locked badges
- Badge requirements
- Unlock dates for earned badges

### Challenges

Should contain:

- Active challenges
- Joined challenges
- Join button
- Progress indicator

### Notifications

Should contain:

- Notification list
- Read and unread states
- Mark as read action
- Mark all as read action

### Profile

Should contain:

- User name
- Email
- Joined date
- XP and level
- Total completions
- Total badges
- Basic edit profile form

### Admin Dashboard

Should contain:

- Total users
- Total habits
- Total completions
- Active challenges
- Badge activity
- Optional category, badge, and challenge management tables

---

## 12. Component Requirements

Reusable React components:

- `Sidebar`: Desktop app navigation
- `Topbar`: Page title, user menu, and notification shortcut
- `BottomNav`: Mobile navigation
- `ProtectedRoute`: Blocks unauthenticated users from private pages
- `AdminRoute`: Blocks non-admin users from admin pages
- `HabitCard`: Displays habit information and complete button
- `HabitForm`: Shared create and edit habit form
- `XPCard`: Shows XP and level progress
- `StreakCard`: Shows current and longest streaks
- `BadgeCard`: Shows badge state and details
- `ChallengeCard`: Shows challenge details and join/progress state
- `Heatmap`: Displays calendar completion activity
- `WeeklyChart`: Displays weekly completion chart using Recharts
- `EmptyState`: Friendly message for empty pages
- `LoadingSkeleton`: Loading placeholder
- `SuccessModal`: Celebration after badge or level unlock
- `ConfirmationModal`: Confirm delete or archive actions
- `AdminTable`: Reusable admin data table
- `ToastHandler`: Standardized success and error messages
- `StatCard`: Reusable dashboard and admin metric card

---

## 13. Build Priority: 22-Day Plan

### Days 1-2: Setup

- Create frontend with React + Vite
- Install Tailwind CSS
- Set up React Router
- Set up backend with Express
- Connect MongoDB
- Create folder structure
- Configure `.env`
- Create basic app layout

### Days 3-5: Authentication

- Create User model
- Build register API
- Build login API
- Add JWT middleware
- Add frontend auth context
- Add protected routes
- Add logout
- Add basic form validation

### Days 6-8: Habit CRUD

- Add category seed data
- Create Habit model
- Build create habit API and page
- Build view habits API and UI
- Build edit habit
- Build archive/delete habit
- Add habit templates
- Build onboarding flow

### Days 9-11: Dashboard and Completion Logs

- Build today's habits API
- Build complete habit API
- Create HabitLog model
- Prevent duplicate completion
- Build dashboard habit cards
- Add completion status UI
- Add toast feedback

### Days 12-14: Streaks, XP, Levels

- Add XP reward logic
- Add level calculation
- Add current streak logic
- Add longest streak logic
- Add dashboard XP and streak cards
- Add profile stats foundation

### Days 15-16: Badges

- Create Badge model
- Create UserBadge model
- Seed default badges
- Add badge checking logic
- Build achievements page
- Add badge unlock notification or modal

### Days 17-18: Analytics and Heatmap

- Build analytics summary API
- Build heatmap API
- Build weekly completion chart API
- Build analytics page
- Integrate Recharts
- Build calendar heatmap component

### Days 19-20: Challenges, Profile, Admin Lite

- Create Challenge model
- Create UserChallenge model
- Build challenges page
- Add join challenge feature
- Build notification center
- Build profile page
- Build admin summary dashboard
- Add optional admin management tables if core work is finished

### Day 21: Testing and Bug Fixes

- Test registration and login
- Test protected routes
- Test habit CRUD
- Test duplicate completion rule
- Test XP, streaks, and levels
- Test badge unlocks
- Test analytics data
- Fix UI issues

### Day 22: Deployment and Demo Preparation

- Prepare demo seed data
- Run final responsive checks
- Deploy frontend and backend
- Test production environment variables
- Prepare presentation flow

---

## 14. Risks and Simplifications

### Risk: Streak Logic Can Become Complex

Simplification:

- Support daily habits only for MVP.
- Do not support custom schedules, weekdays-only habits, multiple completions per day, or complex recurrence.

### Risk: Badge Logic Can Become Hard to Manage

Simplification:

- Start with five fixed badges.
- Use simple condition types.

Recommended MVP badges:

- First Step: Complete first habit
- 3-Day Spark: Reach a 3-day streak
- Weekly Warrior: Reach a 7-day streak
- Consistency Champ: Complete 10 habits
- Level Up: Reach Level 2

### Risk: Analytics Queries May Become Slow

Simplification:

- Use `HabitLog` as the single source of truth.
- Calculate simple summaries for only the logged-in user.
- Avoid complex cross-user analytics in MVP.

### Risk: Admin Management May Take Too Much Time

Simplification:

- Build admin summary dashboard first.
- Add create/edit management only after user-facing core features are stable.

### Risk: Challenges May Become Too Complex

Simplification:

- Use simple completion-count challenges, such as "Complete 5 habits this week."
- Avoid social or competitive challenges.

### Risk: Notifications May Become Too Broad

Simplification:

- Only create notifications for badge unlocks, level ups, and challenge completion.

### Risk: Calendar Heatmap May Take Time

Simplification:

- Use simple date-count data.
- Render each day as a square with color intensity based on completion count.

### Risk: Onboarding Can Delay Core Development

Simplification:

- Use a short two-step onboarding flow:
  1. Select goals and categories.
  2. Select starter templates.

---

## 15. Demo Day Requirements

The following must work for presentation:

- Register a new user
- Log in successfully
- Complete onboarding
- Select habit templates
- Create a custom habit
- View today's habits on dashboard
- Complete a habit
- Prevent duplicate completion
- XP updates after completion
- Level progress updates
- Current streak updates
- Longest streak updates
- Badge unlock appears
- Achievements page displays earned badge
- Analytics page displays weekly chart
- Calendar heatmap displays completion activity
- Profile page displays user stats
- Notification center shows unlock notifications
- Admin lite dashboard shows total users, habits, completions, challenges, and badge activity

---

## Recommended MVP Rule Set

To keep the 22-day build realistic:

- Support daily habits only.
- Use archive instead of hard delete where possible.
- Keep badge conditions simple.
- Keep challenges simple and manual.
- Make analytics useful but not overly advanced.
- Prioritize correctness of completion, XP, streaks, and badge logic over visual extras.
