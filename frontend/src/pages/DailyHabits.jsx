import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MaterialIcon from "../components/common/MaterialIcon";
import StitchTopBar from "../components/stitch/StitchTopBar";
import { StitchBottomNav, StitchFooter, StitchSidebar } from "../components/stitch/StitchNav";
import { getCategoryAnalytics } from "../api/analyticsApi";
import { getHabits } from "../api/habitApi";
import { habitCategories } from "../data/habitCategories";
import useAppAvatar from "../hooks/useAppAvatar";
import { normalizeSearchText } from "../utils/search";

const cardStyles = {
  study: { glow: "bg-primary-fixed/30", iconWrap: "bg-secondary-fixed text-on-secondary-fixed-variant" },
  coding: { glow: "bg-tertiary-fixed/30", iconWrap: "bg-tertiary-container text-on-tertiary-container" },
  reading: { glow: "bg-primary-container/20", iconWrap: "bg-primary-fixed-dim text-on-primary-fixed" },
  fitness: { glow: "bg-error-container/30", iconWrap: "bg-error-container text-on-error-container" },
  water: { glow: "bg-secondary-fixed/40", iconWrap: "bg-secondary-fixed-dim text-on-secondary-fixed" },
  wellness: { glow: "bg-surface-container-high", iconWrap: "bg-surface-variant text-on-surface" },
  productivity: { glow: "bg-primary/10", iconWrap: "bg-primary-container text-on-primary-container" },
  "spiritual-growth": { glow: "bg-tertiary-fixed-dim/30", iconWrap: "bg-tertiary-fixed text-on-tertiary-fixed-variant" },
  sleep: { glow: "bg-primary-fixed-dim/20", iconWrap: "bg-primary-fixed text-on-primary-fixed-variant" },
};

const DailyHabits = () => {
  const avatarSrc = useAppAvatar();
  const location = useLocation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  useEffect(() => {
    const incomingSearch = location.state?.habitSearchQuery;

    if (!incomingSearch) {
      return;
    }

    const normalizedSearch = String(incomingSearch).trim();
    setActiveSearch(normalizedSearch);
    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        setError("");
        const [categoryData, habitData] = await Promise.all([getCategoryAnalytics(), getHabits()]);
        setCategories(categoryData.categories || []);
        setHabits(habitData.habits || []);
      } catch (loadError) {
        setError(loadError.message || "Could not load category progress.");
        setCategories([]);
        setHabits([]);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const categoryCards = useMemo(() => {
    const map = new Map(categories.map((category) => [category.slug, category]));
    const habitNamesByCategory = habits.reduce((accumulator, habit) => {
      const key = String(habit.category || "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      if (!accumulator[key]) {
        accumulator[key] = [];
      }

      accumulator[key].push(habit.name || "");
      return accumulator;
    }, {});
    const normalizedQuery = normalizeSearchText(activeSearch);

    return habitCategories
      .map((category) => {
        const liveCategory = map.get(category.id);
        const habitNames = habitNamesByCategory[category.id] || [];

        return {
          ...category,
          habitCount: liveCategory?.habitCount ?? 0,
          bestStreak: liveCategory?.bestStreak ?? 0,
          completionPercent: liveCategory?.weeklyCompletion ?? 0,
          habitNames,
          styles: cardStyles[category.id],
        };
      })
      .filter((category) => {
        if (!normalizedQuery) {
          return true;
        }

        const haystack = normalizeSearchText(
          [category.name, category.shortName, category.description, ...category.habitNames].join(" ")
        );

        return haystack.includes(normalizedQuery);
      });
  }, [activeSearch, categories, habits]);

  return (
    <div className="min-h-screen bg-background text-on-background">
      <div className="flex min-h-screen flex-col md:flex-row">
        <StitchSidebar activeKey="habits" avatarSrc={avatarSrc} brandVariant="square" />

        <main className="relative flex min-h-screen w-full flex-1 flex-col pb-24 md:ml-[280px] md:pb-0">
          <StitchTopBar />

          <div className="mx-auto flex-1 w-full max-w-container_max_width px-margin_mobile py-8 md:px-margin_desktop">
            <div className="mb-10 text-center md:text-left">
              <h2 className="mb-2 text-headline-lg text-on-background">Daily Habits</h2>
              <p className="text-body-base text-on-surface-variant">
                {activeSearch
                  ? `Showing results for "${activeSearch}".`
                  : "Choose a habit category to view progress."}
              </p>
            </div>

            {error ? (
              <div className="mb-6 rounded-xl border border-error-container bg-surface-container-lowest p-4 text-body-base text-error">
                {error}
              </div>
            ) : null}

            <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
              {categoryCards.map((category) => (
                <button
                  className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-transparent bg-surface-container-lowest p-6 text-left shadow-[0px_4px_20px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-primary hover:shadow-lg"
                  key={category.id}
                  onClick={() => {
                    setActiveSearch("");
                    navigate(`/daily-habits/${category.id}`);
                  }}
                  type="button"
                >
                  <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full ${category.styles.glow} blur-2xl transition-colors`} />
                  <div className="mb-4 flex items-start justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-sm ${category.styles.iconWrap}`}>
                      <MaterialIcon className="text-[28px]" name={category.icon} />
                    </div>
                    <span className="flex items-center gap-1 rounded-full bg-surface-container-highest px-3 py-1 text-badge-xs text-on-surface-variant">
                      <MaterialIcon className="text-[14px]" name="local_fire_department" />
                      {category.bestStreak} days
                    </span>
                  </div>
                  <h3 className="mb-1 text-title-md text-on-background">{category.shortName}</h3>
                  <p className="mb-6 flex-1 text-sm text-on-surface-variant">{category.description}</p>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-label-sm">
                      <span className="text-on-surface-variant">{category.habitCount} habits</span>
                      <span className="font-bold text-primary">{category.completionPercent}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
                      <div className="h-full rounded-full bg-primary transition-all duration-1000 ease-out" style={{ width: `${category.completionPercent}%` }} />
                    </div>
                    <div className="mt-4 flex justify-end border-t border-surface-variant/50 pt-4">
                      <span className="flex items-center gap-1 text-label-sm text-primary group-hover:underline">
                        Open Quest
                        <MaterialIcon className="text-[16px]" name="arrow_forward" />
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {!loading && !error && activeSearch && categoryCards.length === 0 ? (
              <div className="mt-6 rounded-xl bg-surface-container-lowest p-6 text-body-base text-on-surface-variant shadow-[0px_4px_20px_rgba(15,23,42,0.05)]">
                No habit categories matched your search yet.
              </div>
            ) : null}

            {loading ? (
              <p className="mt-6 text-body-base text-on-surface-variant">Loading category progress...</p>
            ) : null}
          </div>

          <StitchFooter />
        </main>
      </div>

      <StitchBottomNav activeKey="habits" />
    </div>
  );
};

export default DailyHabits;
