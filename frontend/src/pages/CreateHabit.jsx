import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import MaterialIcon from "../components/common/MaterialIcon";
import StitchTopBar from "../components/stitch/StitchTopBar";
import { StitchBottomNav, StitchSidebar } from "../components/stitch/StitchNav";
import { createHabit } from "../api/habitApi";
import { findHabitCategory, getCategorySlug, habitCategories, normalizeHabitCategory } from "../data/habitCategories";

const quickTemplates = [
  { name: "Read for 20 mins", icon: "menu_book", category: "Reading", difficulty: "easy" },
  { name: "Drink 8 glasses of water", icon: "water_drop", category: "Water Intake", difficulty: "easy" },
  { name: "10 min Meditation", icon: "self_improvement", category: "Spiritual Growth", difficulty: "medium" },
];

const difficultyCards = [
  { value: "easy", label: "Easy Routine", xp: 10 },
  { value: "medium", label: "Medium Challenge", xp: 20 },
  { value: "hard", label: "Hard Quest", xp: 30 },
];

const dayOptions = ["M", "T", "W", "T", "F", "S", "S"];

const CreateHabit = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryCategory = searchParams.get("category");
  const matchedCategory = findHabitCategory(queryCategory);

  const [form, setForm] = useState({
    name: "",
    category: matchedCategory?.name || habitCategories[0].name,
    frequency: "daily",
    difficulty: "medium",
    description: "",
    activeDays: [0, 1, 2, 3, 4],
  });
  const [submitting, setSubmitting] = useState(false);

  const selectedCategory = useMemo(
    () => findHabitCategory(form.category) || matchedCategory || habitCategories[0],
    [form.category, matchedCategory]
  );

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const toggleDay = (index) => {
    setForm((current) => ({
      ...current,
      activeDays: current.activeDays.includes(index)
        ? current.activeDays.filter((item) => item !== index)
        : [...current.activeDays, index],
    }));
  };

  const applyTemplate = (template) => {
    setForm((current) => ({
      ...current,
      name: template.name,
      category: template.category,
      difficulty: template.difficulty,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      toast.error("Give your quest a name.");
      return;
    }

    try {
      setSubmitting(true);
      const data = await createHabit({
        name: form.name.trim(),
        description: form.description.trim(),
        category: normalizeHabitCategory(form.category),
        frequency: form.frequency,
        difficulty: form.difficulty,
        targetType: "simple",
        targetValue: 1,
        startDate: new Date().toISOString().slice(0, 10),
      });
      toast.success("Habit created.");
      const nextCategory = getCategorySlug(form.category) || "coding";
      navigate(data?.habit?._id ? `/habits/${data.habit._id}` : `/daily-habits/${nextCategory}`);
    } catch (error) {
      toast.error(error.message || "Could not create habit.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background">
      <div className="flex min-h-screen flex-col md:flex-row">
        <StitchSidebar activeKey="habits" brandVariant="text" ctaLabel="New Quest" />

        <main className="min-h-screen flex-1 pb-24 md:ml-[280px] md:pb-0">
          <StitchTopBar />

          <div className="animate-page-in mx-auto max-w-3xl px-margin_mobile pb-16 pt-8 md:px-margin_desktop">
            <button
              className="mb-6 hidden cursor-pointer items-center gap-2 text-label-sm text-on-surface-variant transition-colors hover:text-primary md:flex"
              onClick={() => navigate(selectedCategory ? `/daily-habits/${selectedCategory.id}` : "/daily-habits")}
              type="button"
            >
              <MaterialIcon name="arrow_back" />
              Back to Habits
            </button>
            <div className="mb-10 text-center md:text-left">
              <h1 className="mb-2 text-headline-lg text-on-surface">Create a New Habit</h1>
              <p className="text-body-base text-on-surface-variant">Turn a small routine into a daily quest.</p>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="rounded-xl border border-surface-container bg-surface-container-lowest p-6 shadow-[0px_4px_20px_rgba(15,23,42,0.05)]">
                <label className="mb-4 block text-title-md text-on-surface" htmlFor="habit-name">
                  Name Your Quest
                </label>
                <input
                  className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest p-4 text-body-base text-on-surface transition-all outline-none focus:border-primary focus:ring-4 focus:ring-primary/20"
                  id="habit-name"
                  onChange={(event) => setField("name", event.target.value)}
                  placeholder="e.g. Read 20 pages, Drink 2L water..."
                  type="text"
                  value={form.name}
                />
              </div>

              <div className="rounded-xl border border-surface-container bg-surface-container-lowest p-6 shadow-[0px_4px_20px_rgba(15,23,42,0.05)]">
                <label className="mb-4 block text-title-md text-on-surface">Select Category</label>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {habitCategories.slice(0, 8).map((category) => {
                    const active = form.category === category.name;
                    return (
                      <button
                        className={
                          active
                            ? "flex flex-col items-center justify-center rounded-xl border border-primary bg-primary-container p-4 text-primary shadow-sm transition-all scale-[1.02]"
                            : "flex flex-col items-center justify-center rounded-xl border border-transparent bg-surface-container p-4 text-on-surface-variant transition-colors hover:bg-surface-container-high"
                        }
                        key={category.id}
                        onClick={() => setField("category", category.name)}
                        type="button"
                      >
                        <MaterialIcon className="mb-2 text-2xl" fill={active} name={category.icon} />
                        <span className={`text-label-sm ${active ? "text-on-primary-container" : ""}`}>{category.shortName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="rounded-xl border border-surface-container bg-surface-container-lowest p-6 shadow-[0px_4px_20px_rgba(15,23,42,0.05)]">
                  <label className="mb-4 block text-title-md text-on-surface">Difficulty Level</label>
                  <div className="flex flex-col gap-3">
                    {difficultyCards.map((card) => {
                      const active = form.difficulty === card.value;
                      return (
                        <label
                          className={
                            active
                              ? "flex cursor-pointer items-center justify-between rounded-xl border-2 border-primary bg-primary-container p-4 shadow-sm transition-all scale-[1.02]"
                              : "flex cursor-pointer items-center justify-between rounded-xl border-2 border-outline-variant bg-surface-container-lowest p-4 transition-all hover:border-primary"
                          }
                          key={card.value}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              checked={active}
                              className="h-5 w-5 border-outline-variant text-primary focus:ring-primary"
                              name="difficulty"
                              onChange={() => setField("difficulty", card.value)}
                              type="radio"
                              value={card.value}
                            />
                            <span className={`text-label-sm ${active ? "text-on-primary-container" : "text-on-surface"}`}>{card.label}</span>
                          </div>
                          <span className="rounded-full bg-tertiary-fixed px-2 py-1 text-badge-xs text-on-tertiary-fixed">+{card.xp} XP</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-xl border border-surface-container bg-surface-container-lowest p-6 shadow-[0px_4px_20px_rgba(15,23,42,0.05)]">
                  <label className="mb-4 block text-title-md text-on-surface">Frequency</label>
                  <div className="mb-6 flex gap-4">
                    {["daily", "weekly"].map((value) => {
                      const active = form.frequency === value;
                      return (
                        <button
                          className={
                            active
                              ? "flex-1 rounded-full bg-primary px-4 py-3 text-label-sm text-on-primary shadow-md transition-transform scale-[1.02]"
                              : "flex-1 rounded-full bg-surface-container-highest px-4 py-3 text-label-sm text-on-surface-variant transition-colors hover:bg-surface-dim"
                          }
                          key={value}
                          onClick={() => setField("frequency", value)}
                          type="button"
                        >
                          {value === "daily" ? "Daily" : "Weekly"}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mb-3 text-sm text-on-surface-variant">Select active days:</p>
                  <div className="flex justify-between">
                    {dayOptions.map((day, index) => {
                      const active = form.activeDays.includes(index);
                      return (
                        <button
                          className={
                            active
                              ? "flex h-10 w-10 items-center justify-center rounded-full bg-primary text-label-sm text-on-primary"
                              : "flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-highest text-label-sm text-on-surface-variant"
                          }
                          key={`${day}-${index}`}
                          onClick={() => toggleDay(index)}
                          type="button"
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-surface-dim bg-surface-container p-6">
                <div className="mb-4 flex items-center gap-2">
                  <MaterialIcon className="text-primary" name="lightbulb" />
                  <h3 className="text-title-md text-on-surface">Quick Templates</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {quickTemplates.map((template) => (
                    <button
                      className="flex items-center gap-2 rounded-full border border-outline-variant bg-surface-container-lowest px-4 py-2 text-label-sm text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
                      key={template.name}
                      onClick={() => applyTemplate(template)}
                      type="button"
                    >
                      <MaterialIcon className="text-sm" name={template.icon} />
                      {template.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col-reverse justify-end gap-4 border-t border-outline-variant pt-6 md:flex-row">
                <button
                  className="rounded-xl px-6 py-4 text-label-sm text-on-surface-variant transition-colors hover:bg-surface-container-highest"
                  onClick={() => navigate(selectedCategory ? `/daily-habits/${selectedCategory.id}` : "/daily-habits")}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-label-sm text-on-primary shadow-[0px_4px_15px_rgba(83,65,205,0.4)] transition-transform hover:scale-[1.02]"
                  disabled={submitting}
                  type="submit"
                >
                  <MaterialIcon name="add_task" />
                  {submitting ? "Creating Habit..." : "Create Habit"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>

      <StitchBottomNav activeKey="habits" />
    </div>
  );
};

export default CreateHabit;
