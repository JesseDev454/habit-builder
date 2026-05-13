# HabitQuest Architecture and Project Setup Document

## 1. Purpose

This document defines the starter architecture and project setup for **HabitQuest: A Gamified Habit-Building Web Application with Streak Tracking**.

It is based on the MVP requirements document and is intended for the Architecture and Project Setup phase only.

The goal is to create a clean, scalable, beginner-friendly MERN project foundation that the team can build on during later feature phases.

This phase should not implement full business logic. It should only create the project structure, starter configuration, placeholder files, basic routing, basic server setup, and simple health checks.

---

## 2. Architecture Goals

The project should:

- Use a monorepo-style structure with separate frontend and backend folders.
- Keep frontend and backend concerns clearly separated.
- Use beginner-friendly folder names and predictable file locations.
- Include placeholder files for all major MVP feature areas.
- Run frontend and backend together from the root with `npm run dev`.
- Support future authentication, habit tracking, streaks, XP, badges, analytics, notifications, challenges, and admin lite features.
- Avoid over-engineering during setup.

---

## 3. Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Recharts
- React Hot Toast
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- bcryptjs
- dotenv
- cors
- nodemon

### Database

- MongoDB Atlas or local MongoDB
- Mongoose schemas and models

---

## 4. Setup Scope

### In Scope

- Create root project structure.
- Set up React + Vite frontend.
- Set up Express backend.
- Configure Tailwind CSS.
- Configure React Router.
- Configure Axios instance.
- Configure Express server.
- Configure MongoDB connection file.
- Add environment variable examples.
- Add placeholder files for frontend and backend modules.
- Add simple backend health check route.
- Add simple frontend placeholder pages.
- Add root `README.md`.
- Add root `.gitignore`.
- Add root `package.json` with `concurrently`.
- Ensure the starter project can run locally.

### Out of Scope

- Full authentication logic
- Full habit CRUD
- Full streak calculation
- Full XP calculation
- Full analytics logic
- Full badge unlock logic
- Full admin logic
- Production deployment
- Complex validation
- Complex global state management
- Advanced UI polish

---

## 5. Root Project Structure

The root folder should be named:

```text
habitquest/
```

Required root structure:

```text
habitquest/
  frontend/
  backend/
  README.md
  .gitignore
  package.json
```

### Root Responsibilities

- Store shared project documentation.
- Provide root scripts for running frontend and backend together.
- Keep frontend code inside `frontend/`.
- Keep backend code inside `backend/`.

---

## 6. Root Package Requirements

The root `package.json` should install and use `concurrently`.

Required scripts:

```json
{
  "scripts": {
    "frontend": "npm run dev --prefix frontend",
    "backend": "npm run dev --prefix backend",
    "dev": "concurrently \"npm run backend\" \"npm run frontend\""
  }
}
```

### Root Dependencies

- `concurrently`

---

## 7. Backend Structure

Required backend structure:

```text
backend/
  config/
    db.js
  controllers/
    authController.js
    userController.js
    habitController.js
    habitLogController.js
    badgeController.js
    challengeController.js
    analyticsController.js
    notificationController.js
    adminController.js
  middleware/
    authMiddleware.js
    adminMiddleware.js
    errorMiddleware.js
  models/
    User.js
    Habit.js
    HabitLog.js
    Badge.js
    UserBadge.js
    Challenge.js
    UserChallenge.js
    Notification.js
    Category.js
  routes/
    authRoutes.js
    userRoutes.js
    habitRoutes.js
    habitLogRoutes.js
    badgeRoutes.js
    challengeRoutes.js
    analyticsRoutes.js
    notificationRoutes.js
    adminRoutes.js
  utils/
    generateToken.js
    xpUtils.js
    levelUtils.js
    streakUtils.js
    badgeUtils.js
    dateUtils.js
  server.js
  package.json
  .env.example
```

---

## 8. Backend Package Requirements

The backend should be initialized inside `backend/`.

### Backend Dependencies

Required runtime dependencies:

- `express`
- `mongoose`
- `jsonwebtoken`
- `bcryptjs`
- `dotenv`
- `cors`

Required development dependency:

- `nodemon`

### Backend Scripts

The `backend/package.json` should include:

```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}
```

---

## 9. Backend Server Requirements

The `backend/server.js` file should:

- Load environment variables using `dotenv`.
- Connect to MongoDB using `config/db.js`.
- Configure CORS.
- Use `express.json()`.
- Add a health check route.
- Mount all route files using `/api` prefixes.
- Use error middleware.
- Listen on `PORT` from `.env` or default to `5000`.

### Health Check Route

Route:

```text
GET /
```

Response:

```text
HabitQuest API is running
```

### Required Route Mounting

The backend should mount:

```text
/api/auth
/api/users
/api/habits
/api/habit-logs
/api/badges
/api/challenges
/api/analytics
/api/notifications
/api/admin
```

---

## 10. MongoDB Connection Requirements

The `backend/config/db.js` file should:

- Export an async MongoDB connection function.
- Use `process.env.MONGO_URI`.
- Log a successful MongoDB connection.
- Exit the process if the connection fails.

---

## 11. Backend Environment Variables

Create `backend/.env.example` with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Important:

- Do not commit real `.env` files.
- Do not hardcode database credentials or JWT secrets.

---

## 12. Backend Route Requirements

Each route file should contain a basic Express router with a placeholder route.

Example requirement:

```text
GET /api/habits
Response: { message: "Habit routes working" }
```

Required placeholder route files:

- `authRoutes.js`
- `userRoutes.js`
- `habitRoutes.js`
- `habitLogRoutes.js`
- `badgeRoutes.js`
- `challengeRoutes.js`
- `analyticsRoutes.js`
- `notificationRoutes.js`
- `adminRoutes.js`

Each route file should be ready to connect to its matching controller file later.

---

## 13. Backend Controller Requirements

Each controller file should export placeholder functions only.

Required controller files:

- `authController.js`
- `userController.js`
- `habitController.js`
- `habitLogController.js`
- `badgeController.js`
- `challengeController.js`
- `analyticsController.js`
- `notificationController.js`
- `adminController.js`

The placeholder functions should return simple JSON messages. They should not contain full business logic yet.

---

## 14. Backend Middleware Requirements

### authMiddleware.js

For setup phase:

- Create a placeholder authentication middleware.
- It may pass requests through for now.
- Full JWT verification will be implemented later.

### adminMiddleware.js

For setup phase:

- Create a placeholder admin middleware.
- It may pass requests through for now.
- Full admin role checking will be implemented later.

### errorMiddleware.js

Should provide a simple centralized error response shape:

```json
{
  "message": "Error message"
}
```

---

## 15. Backend Model Requirements

Model files should include simple starter Mongoose schema structures. Do not add complex methods, hooks, or business logic during setup.

### User

Fields:

- `name`
- `email`
- `password`
- `role`
- `totalXP`
- `level`
- `coins`
- `selectedGoals`
- `createdAt`

### Habit

Fields:

- `user`
- `name`
- `description`
- `category`
- `frequency`
- `targetType`
- `targetValue`
- `difficulty`
- `currentStreak`
- `longestStreak`
- `isArchived`
- `createdAt`

### HabitLog

Fields:

- `user`
- `habit`
- `completedAt`
- `dateKey`
- `xpEarned`

### Badge

Fields:

- `name`
- `description`
- `icon`
- `conditionType`
- `conditionValue`
- `category`
- `isActive`

### UserBadge

Fields:

- `user`
- `badge`
- `unlockedAt`

### Challenge

Fields:

- `title`
- `description`
- `category`
- `durationDays`
- `rewardXP`
- `rewardCoins`
- `badgeReward`
- `isActive`

### UserChallenge

Fields:

- `user`
- `challenge`
- `progress`
- `status`
- `joinedAt`
- `completedAt`

### Notification

Fields:

- `user`
- `type`
- `title`
- `message`
- `isRead`
- `createdAt`

### Category

Fields:

- `name`
- `description`
- `icon`
- `isActive`

---

## 16. Backend Utility Requirements

Create simple utility placeholder files:

- `generateToken.js`
- `xpUtils.js`
- `levelUtils.js`
- `streakUtils.js`
- `badgeUtils.js`
- `dateUtils.js`

For setup phase:

- Utilities can export placeholder functions.
- Do not implement complete XP, level, streak, or badge logic yet.
- Keep them readable so later developers know where business logic belongs.

---

## 17. Frontend Structure

Required frontend source structure:

```text
frontend/src/
  api/
    axios.js
    authApi.js
    userApi.js
    habitApi.js
    analyticsApi.js
    badgeApi.js
    challengeApi.js
    notificationApi.js
    adminApi.js
  assets/
  components/
    layout/
      Sidebar.jsx
      Topbar.jsx
      BottomNav.jsx
      ProtectedRoute.jsx
      AdminRoute.jsx
    common/
      Button.jsx
      Input.jsx
      Card.jsx
      Badge.jsx
      EmptyState.jsx
      LoadingSkeleton.jsx
      SuccessModal.jsx
      ConfirmationModal.jsx
    habits/
      HabitCard.jsx
      HabitForm.jsx
      HabitPreviewCard.jsx
    gamification/
      XPCard.jsx
      LevelProgress.jsx
      StreakCard.jsx
      BadgeCard.jsx
      DailyQuestCard.jsx
    analytics/
      Heatmap.jsx
      WeeklyChart.jsx
      CategoryChart.jsx
      InsightCard.jsx
    admin/
      AdminStatCard.jsx
      AdminTable.jsx
      StatusChip.jsx
  context/
    AuthContext.jsx
  hooks/
    useAuth.js
    useHabits.js
    useDashboard.js
  pages/
    Landing.jsx
    Register.jsx
    Login.jsx
    Onboarding.jsx
    HabitTemplates.jsx
    Dashboard.jsx
    CreateHabit.jsx
    EditHabit.jsx
    HabitDetail.jsx
    Analytics.jsx
    Achievements.jsx
    Challenges.jsx
    Notifications.jsx
    Profile.jsx
    AdminDashboard.jsx
    NotFound.jsx
  utils/
    dateUtils.js
    levelUtils.js
    formatUtils.js
  App.jsx
  main.jsx
  index.css
```

---

## 18. Frontend Package Requirements

The frontend should be created with React + Vite inside `frontend/`.

Required dependencies:

- `react`
- `react-dom`
- `react-router-dom`
- `axios`
- `recharts`
- `react-hot-toast`
- `lucide-react`

Required development dependencies:

- `vite`
- `tailwindcss`
- `postcss`
- `autoprefixer`

### Client Scripts

Keep Vite default scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## 19. Frontend Router Requirements

Configure React Router in `frontend/src/App.jsx`.

Required routes:

```text
/
/register
/login
/onboarding
/habit-templates
/dashboard
/habits/new
/habits/:id/edit
/habits/:id
/analytics
/achievements
/challenges
/notifications
/profile
/admin
*
```

Each page should return a simple placeholder layout for now.

Example page content:

```text
Dashboard Page - HabitQuest
```

---

## 20. Frontend Axios Requirements

Configure `frontend/src/api/axios.js`.

Requirements:

- Set `baseURL` from `VITE_API_URL`.
- Add request interceptor.
- Attach token from `localStorage` if available.
- Keep response handling simple for now.

Frontend `.env.example` should include:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 21. Frontend Layout Component Requirements

Create these layout components:

- `Sidebar`
- `Topbar`
- `BottomNav`
- `ProtectedRoute`
- `AdminRoute`

For setup phase:

- `ProtectedRoute` can be a simple wrapper.
- `AdminRoute` can be a simple wrapper.
- Full auth and role logic will be implemented later.

---

## 22. Frontend Common Component Requirements

Create these common reusable components:

- `Button`
- `Input`
- `Card`
- `Badge`
- `EmptyState`
- `LoadingSkeleton`
- `SuccessModal`
- `ConfirmationModal`

For setup phase:

- Components should be simple but usable.
- Components should accept common props such as `children`, `className`, `onClick`, and `type` where appropriate.
- Avoid complex variants unless needed.

---

## 23. Frontend Feature Component Requirements

Create these feature component placeholders:

### Habits

- `HabitCard`
- `HabitForm`
- `HabitPreviewCard`

### Gamification

- `XPCard`
- `LevelProgress`
- `StreakCard`
- `BadgeCard`
- `DailyQuestCard`

### Analytics

- `Heatmap`
- `WeeklyChart`
- `CategoryChart`
- `InsightCard`

### Admin

- `AdminStatCard`
- `AdminTable`
- `StatusChip`

For setup phase:

- Components can display simple placeholder content.
- Full data integration will come later.

---

## 24. Frontend Page Requirements

Create the following placeholder pages:

- `Landing.jsx`
- `Register.jsx`
- `Login.jsx`
- `Onboarding.jsx`
- `HabitTemplates.jsx`
- `Dashboard.jsx`
- `CreateHabit.jsx`
- `EditHabit.jsx`
- `HabitDetail.jsx`
- `Analytics.jsx`
- `Achievements.jsx`
- `Challenges.jsx`
- `Notifications.jsx`
- `Profile.jsx`
- `AdminDashboard.jsx`
- `NotFound.jsx`

Each page should:

- Export a React component.
- Return a simple readable layout.
- Include page title text.
- Avoid full business logic.

---

## 25. Frontend Hooks and Context Requirements

### AuthContext.jsx

For setup phase:

- Create a basic context provider.
- Include placeholder values such as `user`, `login`, `logout`, and `isAuthenticated`.
- Full auth integration will be added later.

### Hooks

Create placeholder hooks:

- `useAuth.js`
- `useHabits.js`
- `useDashboard.js`

For setup phase:

- Hooks can return placeholder values.
- Keep them simple and readable.

---

## 26. Frontend Utility Requirements

Create these utility files:

- `dateUtils.js`
- `levelUtils.js`
- `formatUtils.js`

For setup phase:

- Utilities can export simple placeholder helpers.
- Avoid complete business logic until the relevant feature phase.

---

## 27. Tailwind CSS Requirements

Configure Tailwind CSS in the frontend.

`frontend/src/index.css` should include:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

It should also include basic global styles for:

- `body`
- Links
- Buttons or form defaults if needed

---

## 28. Design Tokens

Use the following HabitQuest color system as Tailwind-friendly design constants.

| Token | Hex |
|---|---|
| Primary Purple | `#6C5CE7` |
| Deep Purple | `#4B3FCF` |
| Soft Lavender | `#EEEAFE` |
| XP Gold | `#FBBF24` |
| Streak Orange | `#F97316` |
| Badge Pink | `#EC4899` |
| Quest Blue | `#38BDF8` |
| Success Green | `#22C55E` |
| Background | `#F8FAFC` |
| Card Surface | `#FFFFFF` |
| Text Primary | `#0F172A` |
| Text Secondary | `#64748B` |
| Border | `#E2E8F0` |

Recommended Tailwind theme names:

- `primary`
- `primaryDeep`
- `lavender`
- `xpGold`
- `streak`
- `badgePink`
- `questBlue`
- `success`
- `appBg`
- `card`
- `textPrimary`
- `textSecondary`
- `borderSoft`

---

## 29. README Requirements

Create a clear root `README.md` with:

1. Project title
2. Short description
3. Tech stack
4. Folder structure
5. Setup instructions
6. Environment variables
7. How to run frontend only
8. How to run backend only
9. How to run both together
10. Team development workflow
11. Branch naming examples

---

## 30. Git Ignore Requirements

The root `.gitignore` should exclude:

```text
node_modules/
frontend/node_modules/
backend/node_modules/
.env
frontend/.env
backend/.env
dist/
frontend/dist/
build/
.DS_Store
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

---

## 31. Local Run Requirements

After setup, the project should support:

### Run Frontend Only

```bash
npm run frontend
```

or:

```bash
cd frontend
npm run dev
```

Expected frontend URL:

```text
http://localhost:5173
```

### Run Backend Only

```bash
npm run backend
```

or:

```bash
cd backend
npm run dev
```

Expected backend URL:

```text
http://localhost:5000
```

Expected health check response:

```text
HabitQuest API is running
```

### Run Both Together

From the root:

```bash
npm run dev
```

---

## 32. Team Development Workflow

Recommended branch names:

- `feature/auth`
- `feature/habit-crud`
- `feature/dashboard`
- `feature/gamification`
- `feature/analytics`
- `feature/admin-lite`

Recommended workflow:

1. Pull the latest main branch.
2. Create a feature branch.
3. Work only on the assigned feature area.
4. Keep commits small and descriptive.
5. Test the app locally before opening a pull request.
6. Request review before merging.

Example commit messages:

- `setup project structure`
- `add auth route placeholders`
- `add dashboard placeholder page`
- `configure axios instance`
- `add starter mongoose models`

---

## 33. Quality Requirements

The setup should:

- Use clean file names.
- Use consistent imports.
- Avoid unnecessary complexity.
- Run without frontend or backend startup errors.
- Keep placeholder code simple and readable.
- Add comments only where useful.
- Avoid unused complex logic.
- Avoid hardcoded secrets.
- Keep business logic out of setup files unless required for the app to start.

---

## 34. Setup Acceptance Criteria

The setup phase is complete when:

- Root `habitquest/` structure exists.
- `frontend/` contains a working React + Vite app.
- `backend/` contains a working Express app.
- Tailwind CSS is configured.
- React Router is configured with all required placeholder routes.
- Axios instance is configured.
- Backend health check route works.
- Backend route placeholders respond successfully.
- MongoDB connection file exists and uses `MONGO_URI`.
- `.env.example` files exist for frontend and backend.
- Root `README.md` exists with setup instructions.
- Root `.gitignore` exists.
- `npm run dev` from the root starts both frontend and backend.

---

## 35. Suggested Next Build Phase

After this setup phase, the recommended next phase is:

1. Authentication
2. JWT middleware
3. User registration and login
4. Auth context integration
5. Protected route behavior
6. Onboarding starter flow

This keeps the project aligned with the 22-day MVP plan and avoids building later features before the foundation is ready.

---

## 36. Setup Assumptions

- The app will use MongoDB Atlas or a local MongoDB instance.
- The frontend will run on port `5173`.
- The backend will run on port `5000`.
- Real secrets will be stored only in local `.env` files.
- Full feature logic will be implemented in later phases.
- The team is beginner-to-intermediate, so the structure favors clarity over advanced abstractions.

