import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppAvatar from "../../hooks/useAppAvatar";
import { buildHabitSearchTarget } from "../../utils/search";
import MaterialIcon from "../common/MaterialIcon";

const StitchTopBar = () => {
  const navigate = useNavigate();
  const avatarSrc = useAppAvatar();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const target = buildHabitSearchTarget(searchQuery);
    navigate(target.pathname, { state: target.state });
  };

  return (
    <header className="sticky top-0 z-40 bg-surface/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-container_max_width items-center justify-between px-margin_mobile md:px-margin_desktop">
        <div className="text-headline-lg-mobile font-black text-primary md:hidden">HabitQuest</div>
        <div className="hidden max-w-[28rem] flex-1 items-center md:flex">
          <form className="relative w-full" onSubmit={handleSearchSubmit}>
            <MaterialIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant" name="search" />
            <input
              className="w-full rounded-full border border-surface-container-high bg-surface-container-lowest py-2 pl-10 pr-4 text-label-sm shadow-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Search quests, habits..."
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </form>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <button className="relative cursor-pointer rounded-full p-2 text-on-surface-variant transition-colors duration-150 hover:bg-surface-container-highest hover:text-primary" type="button">
            <MaterialIcon name="notifications" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-error" />
          </button>
          <button className="hidden cursor-pointer rounded-full p-2 text-on-surface-variant transition-colors duration-150 hover:bg-surface-container-highest hover:text-primary sm:block" type="button">
            <MaterialIcon name="history_edu" />
          </button>
          <div className="overflow-hidden rounded-full border border-outline-variant sm:hidden">
            <img alt="Hero Avatar" className="h-8 w-8 object-cover" src={avatarSrc} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default StitchTopBar;
