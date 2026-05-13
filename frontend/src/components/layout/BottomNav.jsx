import { NavLink } from "react-router-dom";
import MaterialIcon from "../common/MaterialIcon";

const items = [
  { to: "/dashboard", label: "Home", icon: "home" },
  { to: "/habits/new", label: "Habits", icon: "task_alt" },
  { to: "/challenges", label: "Quests", icon: "workspace_premium" },
  { to: "/analytics", label: "Stats", icon: "bar_chart" },
];

const BottomNav = () => (
  <nav className="fixed bottom-0 left-0 z-50 flex h-16 w-full items-center justify-around rounded-t-xl bg-surface px-4 py-2 shadow-[0_-4px_12px_rgba(15,23,42,0.08)] md:hidden">
    {items.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) =>
          `flex flex-col items-center justify-center rounded-xl px-4 py-2 transition-transform duration-300 ${
            isActive ? "scale-110 bg-primary-container text-on-primary-container" : "text-on-surface-variant hover:bg-surface-container-high"
          }`
        }
      >
        <MaterialIcon name={item.icon} fill={item.label === "Home"} />
        <span className="mt-1 text-[10px] font-medium">{item.label}</span>
      </NavLink>
    ))}
  </nav>
);

export default BottomNav;
