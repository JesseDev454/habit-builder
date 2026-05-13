import { useEffect, useMemo, useState } from "react";
import MaterialIcon from "../components/common/MaterialIcon";
import StitchTopBar from "../components/stitch/StitchTopBar";
import { StitchBottomNav, StitchFooter, StitchSidebar } from "../components/stitch/StitchNav";
import {
  getAnalyticsSummary,
  getCategoryAnalytics,
  getHeatmapData,
  getWeeklyAnalytics,
} from "../api/analyticsApi";
import useAppAvatar from "../hooks/useAppAvatar";
import { formatWeeklyCompletionBars } from "../utils/stitch";

const heatTone = (count) => {
  if (count >= 4) return "bg-success";
  if (count >= 3) return "bg-success/80";
  if (count >= 2) return "bg-success/60";
  if (count >= 1) return "bg-success/20";
  return "bg-surface-container-highest";
};

const Analytics = () => {
  const avatarSrc = useAppAvatar();
  const [summary, setSummary] = useState(null);
  const [weekly, setWeekly] = useState([]);
  const [heatmap, setHeatmap] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      getAnalyticsSummary(),
      getWeeklyAnalytics(),
      getHeatmapData(7),
      getCategoryAnalytics(),
    ])
      .then(([summaryData, weeklyData, heatmapData, categoryData]) => {
        setSummary(summaryData.summary);
        setWeekly(weeklyData.weekly || []);
        setHeatmap(heatmapData.heatmap || []);
        setCategories(categoryData.categories || []);
        setError("");
      })
      .catch((loadError) => {
        setSummary(null);
        setWeekly([]);
        setHeatmap([]);
        setCategories([]);
        setError(loadError.message || "Could not load analytics.");
      });
  }, []);

  const cards = useMemo(
    () => [
      { label: "Total Habits", value: summary?.totalHabits ?? 0, icon: "checklist", tone: "text-primary" },
      { label: "Total Completions", value: summary?.totalCompletions ?? 0, icon: "task_alt", tone: "text-success" },
      { label: "Completion Rate", value: `${summary?.completionRate ?? 0}%`, icon: "pie_chart", tone: "text-on-surface" },
      { label: "Best Streak", value: summary?.longestStreak ?? 0, icon: "local_fire_department", tone: "text-tertiary" },
    ],
    [summary]
  );

  const topCategory = useMemo(
    () =>
      [...categories].sort(
        (left, right) =>
          (right.weeklyCompletion || 0) - (left.weeklyCompletion || 0) ||
          (right.xpEarned || 0) - (left.xpEarned || 0)
      )[0],
    [categories]
  );

  const bars = formatWeeklyCompletionBars(weekly);
  const heatmapDisplay = heatmap.slice(-7);

  return (
    <div className="min-h-screen bg-background text-on-background">
      <div className="flex min-h-screen flex-col md:flex-row">
        <StitchSidebar activeKey="analytics" avatarSrc={avatarSrc} brandVariant="circle" />

        <div className="flex min-h-screen flex-1 flex-col md:ml-[280px]">
          <StitchTopBar />

          <main className="mx-auto flex w-full max-w-container_max_width flex-1 flex-col p-margin_mobile md:p-margin_desktop">
            <header className="mb-8">
              <h1 className="mb-2 text-headline-lg text-on-surface">Analytics</h1>
              <p className="text-body-base text-on-surface-variant">See how consistent you have been this week.</p>
            </header>

            {error ? (
              <div className="mb-6 rounded-xl border border-error-container bg-surface-container-lowest p-4 text-body-base text-error">
                {error}
              </div>
            ) : null}

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
                {bars.length === 0 ? (
                  <p className="text-body-base text-on-surface-variant">No completion data yet this week.</p>
                ) : (
                  <div className="mt-auto flex h-48 flex-1 items-end justify-between gap-2 border-b border-outline-variant/30 pb-2">
                    {bars.map((entry, index) => (
                      <div className="group flex w-full flex-col items-center gap-2" key={`${entry.day}-${index}`}>
                        <div className={`w-full rounded-t-sm ${index % 2 ? "bg-success/80 group-hover:bg-success" : "bg-primary/80 group-hover:bg-primary"} transition-colors`} style={{ height: `${Math.max(entry.heightPercent, 6)}%` }} />
                        <span className="text-badge-xs text-on-surface-variant">{entry.day}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-gutter md:col-span-4">
                <div className="relative overflow-hidden rounded-xl bg-primary-container p-6 text-on-primary-container shadow-[0px_4px_20px_rgba(15,23,42,0.05)]">
                  <div className="absolute right-0 top-0 p-4 opacity-20">
                    <MaterialIcon className="text-6xl" name="emoji_events" />
                  </div>
                  <h3 className="mb-2 text-title-md">Top Quest</h3>
                  <p className="mb-4 text-body-base">
                    {topCategory ? (
                      <>
                        Your strongest category is <strong className="font-bold">{topCategory.name}</strong>.
                      </>
                    ) : (
                      "Complete a few habits to reveal your strongest category."
                    )}
                  </p>
                  <div className="inline-flex items-center gap-1 rounded-full bg-surface/20 px-3 py-1">
                    <MaterialIcon className="text-sm" name="trending_up" />
                    <span className="text-badge-xs">{topCategory?.weeklyCompletion ?? 0}% Success</span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-center rounded-xl bg-surface-container-lowest p-6 shadow-[0px_4px_20px_rgba(15,23,42,0.05)]">
                  <h3 className="mb-4 text-title-md text-on-surface">7-Day Heatmap</h3>
                  {heatmapDisplay.length === 0 ? (
                    <p className="text-body-base text-on-surface-variant">No recent completions yet.</p>
                  ) : (
                    <div className="flex justify-between gap-2">
                      {heatmapDisplay.map((entry) => (
                        <div className={`h-8 w-8 rounded-full ${heatTone(entry.count ?? 0)}`} key={entry.date} />
                      ))}
                    </div>
                  )}
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
