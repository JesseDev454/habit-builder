import { Outlet, useLocation } from "react-router-dom";
import { StitchBottomNav, StitchSidebar } from "../stitch/StitchNav";
import MaterialIcon from "../common/MaterialIcon";

const avatarSrc =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCv4ugk_G95eEwaEV4_8BP66NZr0cuvImbDtpF1OBcItmX3O3UkQjNh6SUgjHUpFBxnpf1w9KWJ32oDMSnCni393Jf9Ys6BPk5BfZSjB2TAoszINNHpa_9R_dPv7yUo8k9Q1-Cd4GFlkmVOgUmeOEr8swDlEdVNwwHcaWKY_vgI6ctGnZvrGGLkrSn7NC0SGEt_yhTW2jyAB5qVRscTJGe364ZjY2SEdBk9eJsKYxZXzXe_iOXA_hStcT3_js93oQ78BLp2fe_0zJ2m";

const getDesktopActiveKey = (pathname) => {
  if (pathname.startsWith("/dashboard")) return "dashboard";
  if (pathname.startsWith("/daily-habits")) return "habits";
  if (pathname.startsWith("/create-habit")) return "habits";
  if (pathname.startsWith("/habits/")) return "habits";
  if (pathname.startsWith("/analytics")) return "analytics";
  if (pathname.startsWith("/profile")) return "profile";
  if (pathname.startsWith("/achievements")) return "achievements";
  if (pathname.startsWith("/epic-quests")) return "quests";
  if (pathname.startsWith("/challenges")) return "quests";
  return null;
};

const getMobileActiveKey = (pathname) => {
  if (pathname.startsWith("/dashboard")) return "home";
  if (pathname.startsWith("/daily-habits")) return "habits";
  if (pathname.startsWith("/create-habit")) return "habits";
  if (pathname.startsWith("/habits/")) return "habits";
  if (pathname.startsWith("/profile")) return "profile";
  if (pathname.startsWith("/epic-quests")) return "quests";
  if (pathname.startsWith("/challenges")) return "quests";
  return null;
};

const AppShell = () => {
  const location = useLocation();
  const desktopActiveKey = getDesktopActiveKey(location.pathname);
  const mobileActiveKey = getMobileActiveKey(location.pathname);

  return (
    <div className="min-h-screen bg-background text-on-background">
      <div className="flex min-h-screen flex-col md:flex-row">
        <StitchSidebar activeKey={desktopActiveKey} avatarSrc={avatarSrc} brandVariant="circle" />

        <div className="flex min-h-screen flex-1 flex-col pb-24 md:ml-[280px] md:pb-0">
          <header className="sticky top-0 z-40 bg-surface/90 shadow-sm backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-container_max_width items-center justify-between px-margin_mobile md:px-margin_desktop">
              <div className="text-headline-lg-mobile font-black text-primary md:hidden">HabitQuest</div>
              <div className="hidden max-w-[28rem] flex-1 items-center md:flex">
                <div className="relative w-full">
                  <MaterialIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant" name="search" />
                  <input
                    className="w-full rounded-full border border-surface-container-high bg-surface-container-lowest py-2 pl-10 pr-4 text-label-sm shadow-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Search quests, habits..."
                    type="text"
                  />
                </div>
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

          <main className="mx-auto flex w-full max-w-container_max_width flex-1 flex-col px-margin_mobile py-8 md:px-margin_desktop">
            <Outlet />
          </main>
        </div>
      </div>

      <StitchBottomNav activeCircleOnly={Boolean(mobileActiveKey)} activeKey={mobileActiveKey} />
    </div>
  );
};

export default AppShell;
