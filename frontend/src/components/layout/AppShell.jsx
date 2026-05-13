// Shared authenticated shell:
// keeps sidebar, top bar, and bottom nav consistent across nested app pages.
import { Outlet, useLocation } from "react-router-dom";
import { StitchBottomNav, StitchSidebar } from "../stitch/StitchNav";
import StitchTopBar from "../stitch/StitchTopBar";
import useAppAvatar from "../../hooks/useAppAvatar";

const getDesktopActiveKey = (pathname) => {
  // Map route prefixes to the sidebar item that should appear active.
  if (pathname.startsWith("/dashboard")) return "dashboard";
  if (pathname.startsWith("/daily-habits")) return "habits";
  if (pathname.startsWith("/create-habit")) return "habits";
  if (pathname.startsWith("/habits/")) return "habits";
  if (pathname.startsWith("/analytics")) return "analytics";
  if (pathname.startsWith("/profile")) return "profile";
  if (pathname.startsWith("/settings")) return "settings";
  if (pathname.startsWith("/achievements")) return "achievements";
  if (pathname.startsWith("/epic-quests")) return "quests";
  if (pathname.startsWith("/challenges")) return "quests";
  return null;
};

const getMobileActiveKey = (pathname) => {
  // Mobile nav uses a slightly smaller set of destinations.
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
  const avatarSrc = useAppAvatar();
  const desktopActiveKey = getDesktopActiveKey(location.pathname);
  const mobileActiveKey = getMobileActiveKey(location.pathname);

  return (
    <div className="min-h-screen bg-background text-on-background">
      <div className="flex min-h-screen flex-col md:flex-row">
        <StitchSidebar activeKey={desktopActiveKey} avatarSrc={avatarSrc} brandVariant="circle" />

        <div className="flex min-h-screen flex-1 flex-col pb-24 md:ml-[280px] md:pb-0">
          <StitchTopBar />

          <main className="mx-auto flex w-full max-w-container_max_width flex-1 flex-col px-margin_mobile py-8 md:px-margin_desktop">
            <div className="animate-page-in flex flex-1 flex-col" key={location.pathname}>
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      <StitchBottomNav activeCircleOnly={Boolean(mobileActiveKey)} activeKey={mobileActiveKey} />
    </div>
  );
};

export default AppShell;
