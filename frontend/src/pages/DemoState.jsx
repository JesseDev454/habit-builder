import { Link, useParams } from "react-router-dom";
import Button from "../components/common/Button";
import MaterialIcon from "../components/common/MaterialIcon";

const stateConfig = {
  "dashboard-loading": {
    icon: "hourglass_top",
    color: "text-primary",
    title: "Loading your dashboard",
    message: "Preparing quests, streaks, XP, and badges...",
    kind: "loading",
  },
  "empty-dashboard": {
    icon: "explore",
    color: "text-primary",
    title: "Your quest board is empty",
    message: "Create your first daily habit and start building momentum.",
    action: "Start New Habit",
  },
  "habit-created": {
    icon: "check_circle",
    color: "text-success-green",
    title: "Habit Created!",
    message: "Your new quest has been added to the dashboard.",
    action: "Back to Dashboard",
  },
  "habit-completed": {
    icon: "stars",
    color: "text-xp-gold",
    title: "Quest Complete!",
    message: "You earned XP and protected your streak.",
    action: "Continue",
  },
  "badge-unlocked": {
    icon: "military_tech",
    color: "text-badge-pink",
    title: "Badge Unlocked!",
    message: "You earned a new achievement for your showcase.",
    action: "View Achievements",
  },
};

const DemoState = () => {
  const { state } = useParams();
  const config = stateConfig[state] || stateConfig["habit-completed"];

  return (
    <main className="flex min-h-screen items-center justify-center bg-app-bg p-md font-body-md text-text-primary">
      <div className="relative w-full max-w-[32rem] overflow-hidden rounded-[24px] border border-border-neutral bg-card-surface p-xl text-center shadow-[0_20px_50px_rgba(15,23,42,0.1)]">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-quest-blue/10 blur-3xl" />
        <div className={`relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-surface-container-low ${config.color} shadow-inner`}>
          <MaterialIcon name={config.icon} fill className={`${config.kind === "loading" ? "animate-spin" : ""} text-[56px]`} />
        </div>
        <h1 className="relative mt-lg font-page-heading text-page-heading font-bold">{config.title}</h1>
        <p className="relative mx-auto mt-sm w-full max-w-[24rem] whitespace-normal text-body-md text-text-secondary">{config.message}</p>
        <div className="relative mt-lg">
          <Link to={state === "badge-unlocked" ? "/achievements" : "/dashboard"}>
            <Button>{config.action || "Continue"}</Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default DemoState;
