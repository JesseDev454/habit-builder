import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AppShell = () => (
  <div className="flex min-h-screen bg-app-bg pb-16 text-text-primary md:pb-0">
    <Sidebar />
    <div className="flex min-h-screen flex-1 flex-col md:ml-[240px]">
      <Topbar />
      <main className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-lg p-md md:p-xl">
        <Outlet />
      </main>
    </div>
    <BottomNav />
  </div>
);

export default AppShell;
