import { useEffect, useMemo, useState } from "react";
import MaterialIcon from "../components/common/MaterialIcon";
import { StitchBottomNav, StitchFooter, StitchSidebar } from "../components/stitch/StitchNav";
import { getAnalyticsSummary, getHeatmapData, getWeeklyAnalytics } from "../api/analyticsApi";
import { mockStats } from "../data/mockStats";
import { formatWeeklyCompletionBars } from "../utils/stitch";

const avatarSrc =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBABfsgjQVYTZHBqBJ1dF5Mas6GXXBftmxTFiXNgGTz9bfaCqIxNGOfoGW0ry-NB_XR3xczbaFqE_NQvx_hp8fiyeDJW5gHjoHhRvSgMpi5mXwMe2mQevfN6Es-7ynliVIGK-kKd3Juk7kobEltMqwU0WfbDW7pBH_vPBF4g8zIgi_Z4q_lovFvYuZaOIFL8XZDv4GX9oKJG3SI6RXW1pWAF6Gw3gI6SqeYdP8ZS8P9-gUpef6sBiGe-hpVWWeXElGOjWRXSmcM7y96";
const mobileAvatar =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAHqIeo4EKMdN8ibgCOUYHnZF6fqze30plzO8inxSJM1clXNNFoOjiETl1Qz_O6v-N9akD5t0FkHSNrtLQFbGt2vqEDc1k58qL-mviY6ACf5qERM43CLPErDpzAZdXhFPkFo6AMRvqKz7sde578WJuKH5DgYQygqTYWzXtQdwS7_pjCsmInRMvpoIHPJ6TTBwAUOqkyssO65KHjRpVo2VH5q7taqnTXlxnpdB1Fst3x8Kd_qbQpe12yhIRsFwxtAYFagaZH3JR4ZtQs";

const heatTone = (count) => {
  if (count >= 4) return "bg-success";
  if (count >= 3) return "bg-success/80";
  if (count >= 2) return "bg-success/60";
  if (count >= 1) return "bg-success/20";
  return "bg-surface-container-highest";
};

const Analytics = () => {
  const [summary, setSummary] = useState(null);
  const [weekly, setWeekly] = useState([]);
  const [heatmap, setHeatmap] = useState([]);

  useEffect(() => {
    Promise.all([getAnalyticsSummary(), getWeeklyAnalytics(), getHeatmapData(7)])
      .then(([summaryData, weeklyData, heatmapData]) => {
        setSummary(summaryData.summary);
        setWeekly(weeklyData.weekly || []);
        setHeatmap(heatmapData.heatmap || []);
      })
      .catch(() => {
        setSummary(null);
        setWeekly([]);
        setHeatmap([]);
      });
  }, []);

  const cards = useMemo(
    () => [
      { label: "Total Habits", value: summary?.totalHabits ?? 12, icon: "checklist", tone: "text-primary" },
      { label: "Total Completions", value: summary?.totalCompletions ?? 48, icon: "task_alt", tone: "text-success" },
      { label: "Completion Rate", value: `${summary?.completionRate ?? 85}%`, icon: "pie_chart", tone: "text-on-surface" },
      { label: "Best Streak", value: summary?.longestStreak ?? 14, icon: "local_fire_department", tone: "text-tertiary" },
    ],
    [summary]
  );

  const bars = formatWeeklyCompletionBars(weekly.length ? weekly : mockStats.weeklyCompletions);
  const heatmapDisplay = heatmap.length ? heatmap.slice(-7) : mockStats.weeklyCompletions;

  return (
    <div className="min-h-screen bg-background text-on-background">
      <div className="flex min-h-screen flex-col md:flex-row">
        <StitchSidebar activeKey="analytics" avatarSrc={avatarSrc} brandVariant="circle" />

        <div className="flex min-h-screen flex-1 flex-col md:ml-[280px]">
          <header className="sticky top-0 z-40 bg-surface/90 shadow-sm backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-container_max_width items-center justify-between px-margin_mobile md:px-margin_desktop">
              <div className="md:hidden text-headline-lg-mobile font-black text-primary">HabitQuest</div>
              <div className="mx-4 hidden max-w-[28rem] flex-1 md:flex" />
              <div className="flex items-center gap-4">
                <button className="cursor-pointer text-on-surface-variant transition-colors hover:text-primary" type="button">
                  <MaterialIcon name="notifications" />
                </button>
                <button className="cursor-pointer text-on-surface-variant transition-colors hover:text-primary" type="button">
                  <MaterialIcon name="history_edu" />
                </button>
                <img alt="Hero Avatar" className="h-8 w-8 rounded-full object-cover md:hidden" src={mobileAvatar} />
              </div>
            </div>
          </header>

          <main className="mx-auto flex w-full max-w-container_max_width flex-1 flex-col p-margin_mobile md:p-margin_desktop">
            <header className="mb-8">
              <h1 className="mb-2 text-headline-lg text-on-surface">Analytics</h1>
              <p className="text-body-base text-on-surface-variant">See how consistent you have been this week.</p>
            </header>

            <div className="mb-8 grid grid-cols-1 gap-gutter md:grid-cols-12">
              <div className="grid grid-cols-2 gap-gutter md:col-span-12 md:grid-cols-4">
                {cards.map((card) => (
                  <div className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-surface-container-lowest p-6 shadow-[0px_4px_20px_rgba(15,23,42,0.05)] transition-transform hover:scale-[1.02]" key={card.label}>
                    <div className={`absolute -bottom-4 -right-4 opacity-5 ${card.tone}`}>
                      <MaterialIcon className="text-[100px]" name={card.icon} />
                    </div>
                    <p className="mb-2 text-label-sm text-on-surface-variant">{card.label}</p>
                    <p className={`text-display-xl ${card.tone}`}>{card.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col rounded-xl bg-surface-container-lowest p-6 shadow-[0px_4px_20px_rgba(15,23,42,0.05)] md:col-span-8">
                <h2 className="mb-6 text-title-md text-on-surface">Weekly Completions</h2>
                <div className="mt-auto flex h-48 flex-1 items-end justify-between gap-2 border-b border-outline-variant/30 pb-2">
                  {bars.map((entry, index) => (
                    <div className="group flex w-full flex-col items-center gap-2" key={`${entry.day}-${index}`}>
                      <div className={`w-full rounded-t-sm ${index % 2 ? "bg-success/80 group-hover:bg-success" : "bg-primary/80 group-hover:bg-primary"} transition-colors`} style={{ height: `${Math.max(entry.heightPercent, 15)}%` }} />
                      <span className="text-badge-xs text-on-surface-variant">{entry.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-gutter md:col-span-4">
                <div className="relative overflow-hidden rounded-xl bg-primary-container p-6 text-on-primary-container shadow-[0px_4px_20px_rgba(15,23,42,0.05)]">
                  <div className="absolute right-0 top-0 p-4 opacity-20">
                    <MaterialIcon className="text-6xl" name="emoji_events" />
                  </div>
                  <h3 className="mb-2 text-title-md">Top Quest</h3>
                  <p className="mb-4 text-body-base">
                    Your best habit is <strong className="font-bold">Morning Meditation</strong>.
                  </p>
                  <div className="inline-flex items-center gap-1 rounded-full bg-surface/20 px-3 py-1">
                    <MaterialIcon className="text-sm" name="trending_up" />
                    <span className="text-badge-xs">95% Success</span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-center rounded-xl bg-surface-container-lowest p-6 shadow-[0px_4px_20px_rgba(15,23,42,0.05)]">
                  <h3 className="mb-4 text-title-md text-on-surface">7-Day Heatmap</h3>
                  <div className="flex justify-between gap-2">
                    {heatmapDisplay.map((entry, index) => (
                      <div className={`h-8 w-8 rounded-full ${heatTone(entry.count ?? entry.completions ?? 0)}`} key={`${index}-${entry.date || entry.day}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>

          <StitchFooter />
        </div>
      </div>

      <StitchBottomNav activeKey={null} activeCircleOnly={false} />
    </div>
  );
};

export default Analytics;
