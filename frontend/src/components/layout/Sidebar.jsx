import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import MaterialIcon from "../common/MaterialIcon";
import { user } from "../../data/mockData";
import useAuth from "../../hooks/useAuth";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { to: "/habits/new", label: "Daily Habits", icon: "check_circle" },
  { to: "/challenges", label: "Epic Quests", icon: "military_tech" },
  { to: "/analytics", label: "Analytics", icon: "insights" },
  { to: "/profile", label: "Settings", icon: "settings" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout, user: authUser } = useAuth();
  const displayUser = authUser || user;

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-full w-[240px] flex-col gap-md bg-white py-xl shadow-md md:flex">
      <div className="px-lg pb-md">
        <NavLink to="/" className="font-page-heading text-section-heading font-bold text-primary">
          HabitQuest
        </NavLink>
        <div className="mt-lg flex items-center gap-sm">
          <img className="h-12 w-12 rounded-full border-2 border-primary object-cover" src={user.avatar} alt="User Level Profile" />
          <div>
            <p className="font-label-sm text-label-sm text-text-primary">{displayUser.name}</p>
            <p className="flex items-center text-[11px] font-medium text-streak-orange">
              <MaterialIcon name="local_fire_department" fill className="mr-[2px] text-[12px]" /> Level 14 Trailblazer
            </p>
          </div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-xs overflow-y-auto px-sm">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-sm rounded-lg px-4 py-3 text-label-sm font-medium transition-all ${
                isActive
                  ? "border-r-4 border-primary bg-surface-container font-bold text-primary"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-primary"
              }`
            }
          >
            <MaterialIcon name={item.icon} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-sm px-lg">
        <NavLink
          to="/habits/new"
          className="flex w-full items-center justify-center gap-2 rounded-[12px] bg-primary py-3 text-label-sm font-medium text-white shadow-sm transition-colors hover:bg-on-primary-fixed-variant"
        >
          <MaterialIcon name="add" className="text-[18px]" /> Start New Habit
        </NavLink>
        <NavLink className="flex items-center gap-sm rounded-lg px-4 py-3 text-label-sm font-medium text-on-surface-variant transition-all hover:bg-surface-container hover:text-primary" to="/notifications">
          <MaterialIcon name="help" />
          Help Center
        </NavLink>
        <button
          className="flex items-center gap-sm rounded-lg px-4 py-3 text-left text-label-sm font-medium text-on-surface-variant transition-all hover:bg-red-50 hover:text-error-red"
          onClick={handleLogout}
          type="button"
        >
          <MaterialIcon name="logout" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
