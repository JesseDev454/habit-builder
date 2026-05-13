import MaterialIcon from "../common/MaterialIcon";
import { user } from "../../data/mockData";
import useAuth from "../../hooks/useAuth";

const Topbar = () => {
  const { user: authUser } = useAuth();
  const displayUser = authUser || user;

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between bg-surface px-lg shadow-sm md:px-xl">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative ml-auto hidden w-full max-w-[28rem] md:block">
          <MaterialIcon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
          <input
            className="h-10 w-full rounded-[12px] border border-border-neutral bg-app-bg pl-10 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary"
            placeholder="Search quests..."
            type="text"
          />
        </div>
      </div>
      <div className="ml-4 flex items-center gap-2">
        {["notifications", "local_fire_department", "stars"].map((name) => (
          <button key={name} className="flex h-10 w-10 scale-95 items-center justify-center rounded-full text-on-surface-variant transition-colors duration-200 hover:bg-surface-container-low active:scale-90">
            <MaterialIcon name={name} />
          </button>
        ))}
        <div className="ml-2 h-8 w-8 overflow-hidden rounded-full border border-border-neutral md:hidden">
          <img className="h-full w-full object-cover" src={displayUser.mobileAvatar || user.mobileAvatar || user.avatar} alt={`${displayUser.name} avatar`} />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
