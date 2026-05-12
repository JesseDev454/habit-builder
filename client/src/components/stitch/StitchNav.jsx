import { Link, useNavigate } from "react-router-dom";
import MaterialIcon from "../common/MaterialIcon";
import useAuth from "../../hooks/useAuth";

const desktopItems = [
  { key: "dashboard", label: "Dashboard", icon: "dashboard", to: "/dashboard" },
  { key: "habits", label: "Daily Habits", icon: "checklist_rtl", to: "/daily-habits" },
  { key: "analytics", label: "Analytics", icon: "leaderboard", to: "/analytics" },
  { key: "profile", label: "Profile", icon: "person", to: "/profile" },
  { key: "achievements", label: "Achievements", icon: "workspace_premium", to: "/achievements" },
  { key: "quests", label: "Epic Quests", icon: "swords", to: "/epic-quests" },
];

const mobileItems = [
  { key: "home", label: "Home", icon: "home", to: "/dashboard" },
  { key: "habits", label: "Habits", icon: "checklist", to: "/daily-habits" },
  { key: "quests", label: "Quests", icon: "swords", to: "/epic-quests" },
  { key: "profile", label: "Profile", icon: "person", to: "/profile" },
];

const DesktopNavLink = ({ activeKey, item }) => (
  <Link
    className={
      item.key === activeKey
        ? "flex items-center gap-3 rounded-xl bg-primary-container px-4 py-3 text-on-primary-container shadow-sm transition-all scale-[1.02]"
        : "flex items-center gap-3 rounded-xl px-4 py-3 text-on-surface-variant transition-colors hover:scale-[1.02] hover:bg-surface-container-high hover:text-primary"
    }
    to={item.to}
  >
    <MaterialIcon fill={item.key === activeKey} name={item.icon} />
    <span className="font-label-sm text-label-sm">{item.label}</span>
  </Link>
);

export const StitchSidebar = ({
  activeKey,
  brandVariant = "circle",
  avatarSrc,
  levelLabel = "Level 12 Hero",
  ctaLabel = "New Quest",
  ctaTo = "/habits/new",
}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed left-0 top-0 z-50 hidden h-screen w-[280px] flex-col bg-surface-container-low shadow-[0px_4px_20px_rgba(15,23,42,0.05)] md:flex">
      <div className="flex h-full flex-col gap-4 p-margin_desktop">
        {brandVariant === "text" ? (
          <div className="mb-8">
            <h1 className="font-headline-lg text-headline-lg font-black tracking-tight text-primary">
              HabitQuest
            </h1>
            <p className="mt-1 text-sm text-on-surface-variant">{levelLabel}</p>
          </div>
        ) : (
          <div className="mb-8 flex items-center gap-4">
            <div
              className={
                brandVariant === "square"
                  ? "flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-primary-container shadow-sm"
                  : "h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-primary-container"
              }
            >
              {avatarSrc ? (
                <img alt="Hero Avatar" className="h-full w-full object-cover" src={avatarSrc} />
              ) : null}
            </div>
            <div>
              <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-black tracking-tight text-primary">
                HabitQuest
              </h1>
              <p className="text-label-sm text-on-surface-variant">{levelLabel}</p>
            </div>
          </div>
        )}

        <div className="flex-1 space-y-2">
          {desktopItems.map((item) => (
            <DesktopNavLink activeKey={activeKey} item={item} key={item.key} />
          ))}
        </div>

        <Link
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-label-sm text-on-primary shadow-md transition-transform hover:scale-[1.02]"
          to={ctaTo}
        >
          {ctaLabel}
        </Link>

        <div className="mt-auto space-y-2 border-t border-outline-variant/30 pt-4">
          <button
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-on-surface-variant transition-colors hover:scale-[1.02] hover:bg-surface-container-high hover:text-primary"
            type="button"
          >
            <MaterialIcon name="settings" />
            <span className="font-label-sm text-label-sm">Settings</span>
          </button>
          <button
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-error transition-colors hover:scale-[1.02] hover:bg-error-container"
            onClick={handleLogout}
            type="button"
          >
            <MaterialIcon name="logout" />
            <span className="font-label-sm text-label-sm">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export const StitchFooter = () => (
  <footer className="mt-auto bg-surface-container-highest">
    <div className="mx-auto flex max-w-container_max_width items-center justify-center px-margin_desktop py-8">
      <div className="text-center text-sm text-on-surface-variant">
        &copy; 2024 HabitQuest. Complete Your Legend.
      </div>
    </div>
  </footer>
);

export const StitchBottomNav = ({ activeKey, activeCircleOnly = true }) => (
  <nav className="fixed bottom-0 left-0 z-50 flex w-full justify-around rounded-t-xl bg-surface-container-low px-margin_mobile pb-4 pt-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:hidden">
    {mobileItems.map((item) => {
      const active = item.key === activeKey;

      if (active && activeCircleOnly) {
        return (
          <Link
            className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary-container text-on-primary-container shadow-md"
            key={item.key}
            to={item.to}
          >
            <MaterialIcon fill name={item.icon} />
          </Link>
        );
      }

      return (
        <Link
          className={`flex ${active ? "text-primary" : "text-on-surface-variant"} flex-col items-center justify-center rounded-lg px-2 pb-2 transition-colors active:scale-90`}
          key={item.key}
          to={item.to}
        >
          <MaterialIcon fill={active} className="mb-1" name={item.icon} />
          <span className="font-label-sm text-[10px]">
            {item.label}
          </span>
        </Link>
      );
    })}
  </nav>
);
