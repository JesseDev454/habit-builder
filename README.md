# HabitQuest

HabitQuest is a gamified habit-building MERN web app for students and young adults. It helps users build better routines with habits, streaks, XP, levels, badges, challenges, notifications, and analytics.

## Tech Stack

Frontend:

- React + Vite
- Tailwind CSS
- React Router
- Axios
- React Hot Toast
- Lucide React
- Recharts

Backend:

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- cors
- bcryptjs
- jsonwebtoken
- nodemon

Root tooling:

- concurrently

## Folder Structure

```text
habit-builder/
  frontend/
  backend/
  design-reference/
    habitquest_gamified_routine_tracker/
  docs/
  README.md
  .gitignore
  package.json
```

## Design Reference

The Stitch design reference is stored in:

```text
design-reference/habitquest_gamified_routine_tracker/
```

The React frontend recreates the design language from those Stitch screens: soft SaaS dashboard cards, purple brand accents, XP/streak/badge colors, responsive app shell, auth layout, landing hero, dashboard, analytics, achievements, challenges, profile, notifications, and admin screens.

The original downloaded reference folder was left untouched.

## Setup

1. Install root dependencies:

```bash
npm install
```

2. Install frontend dependencies:

```bash
npm install --prefix frontend
```

3. Install backend dependencies:

```bash
npm install --prefix backend
```

4. Create local environment files:

```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

On Windows PowerShell, use:

```powershell
Copy-Item frontend/.env.example frontend/.env
Copy-Item backend/.env.example backend/.env
```

5. Update `backend/.env` with a MongoDB Atlas or local MongoDB connection string.

For Sprint 0, the API can still start without `MONGO_URI`; it will warn and skip the database connection.

## Commands

Run both apps from the root:

```bash
npm run dev
```

Frontend only:

```bash
npm run dev --prefix frontend
```

Backend only:

```bash
npm run dev --prefix backend
```

Expected URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

Backend health check:

```text
HabitQuest API is running
```

## Sprint 0 Summary

Sprint 0 creates:

- MERN monorepo foundation
- React + Vite frontend
- Express backend
- MongoDB connection setup
- Placeholder API routes
- Starter Mongoose schemas
- Static Stitch-matched frontend screens
- Mock data for all major MVP areas
- Reusable UI components
- Design audit notes in `frontend/src/design-notes.md`

Sprint 0 does not implement:

- Real authentication
- Real habit CRUD
- Real completion logs
- Real streak logic
- Real XP or level logic
- Real badge unlocking
- Real analytics queries
- Real challenge logic
- Real admin management

## Team Workflow

Use feature branches and avoid pushing directly to main.

Suggested branches:

- `feature/auth`
- `feature/habit-crud`
- `feature/dashboard`
- `feature/gamification`
- `feature/analytics`
- `feature/admin-lite`

Recommended workflow:

1. Pull latest main.
2. Create a feature branch.
3. Work only on the assigned feature area.
4. Test locally.
5. Open a pull request for review.

## Manual Sprint 0 Test

1. Run `npm run dev`.
2. Open `http://localhost:5173`.
3. Visit all frontend routes:
   - `/`
   - `/register`
   - `/login`
   - `/onboarding`
   - `/habit-templates`
   - `/dashboard`
   - `/habits/new`
   - `/habits/1/edit`
   - `/habits/1`
   - `/analytics`
   - `/achievements`
   - `/challenges`
   - `/notifications`
   - `/profile`
   - `/admin`
4. Open `http://localhost:5000`.
5. Check placeholder API routes such as `/api/habits`, `/api/badges`, and `/api/admin`.

## Next Sprint

Sprint 1 should connect real authentication:

- Register/login APIs
- Password hashing
- JWT generation
- Auth context
- Protected routes
- User onboarding persistence

## Sprint 4 MVP Features

Sprint 4 connects the final demo-ready support features:

- Real analytics summary, weekly completion chart, and heatmap data
- Habit detail stats from real completion logs
- Simple challenges with seed, list, join, and progress tracking
- Notifications for challenge activity, level ups, and badge unlocks
- Profile progress summary from real user data
- Admin Lite stats dashboard for admin users

## Seeding Demo Data

Use an authenticated token in Postman, Thunder Client, or the frontend setup buttons.

Seed badges:

```http
POST http://localhost:5000/api/badges/seed
Authorization: Bearer TOKEN_HERE
```

Seed challenges:

```http
POST http://localhost:5000/api/challenges/seed
Authorization: Bearer TOKEN_HERE
```

## Admin Demo Setup

Admin stats are protected by the admin route. To make a user admin for demo, update the user role directly in MongoDB:

```js
db.users.updateOne(
  { email: "demo@habitquest.com" },
  { $set: { role: "admin" } }
)
```

Then log in again so the JWT session restores the updated role.

## Final MVP Demo Flow

1. Register or log in.
2. Select onboarding goals.
3. Choose starter habit templates.
4. Complete a habit and show XP, coins, streak, badges, and reward modal.
5. Open Achievements to show real badge progress.
6. Open Analytics to show summary, weekly chart, and heatmap.
7. Seed and join a Challenge.
8. Open Notifications and mark updates as read.
9. Open Profile to show real user progress.
10. Log in as an admin user and open Admin Lite.
