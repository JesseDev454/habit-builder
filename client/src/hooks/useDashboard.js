import useHabits from "./useHabits";
import { analyticsSummary, badges, user, weeklyProgress } from "../data/mockData";

const useDashboard = () => {
  const habitState = useHabits({ today: true });

  return {
    user,
    badges: badges.filter((badge) => badge.unlocked),
    analyticsSummary,
    weeklyProgress,
    ...habitState,
  };
};

export default useDashboard;
