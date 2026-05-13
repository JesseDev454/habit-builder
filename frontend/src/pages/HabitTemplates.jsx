import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import OnboardingNav from "../components/layout/OnboardingNav";
import HabitPreviewCard from "../components/habits/HabitPreviewCard";
import { createManyHabits } from "../api/habitApi";

const starterTemplates = [
  { id: "t1", name: "Code for 1 hour", description: "Practice coding daily with a focused build session.", category: "Coding", displayCategory: "Career", cadence: "Daily", icon: "terminal", frequency: "daily", targetType: "simple", targetValue: 1, difficulty: "hard", target: "1 hour", xpReward: 50 },
  { id: "t2", name: "Read for 20 minutes", description: "Read fiction, nonfiction, notes, or course material.", category: "Reading", displayCategory: "Learning", cadence: "Daily", icon: "menu_book", frequency: "daily", targetType: "simple", targetValue: 1, difficulty: "medium", target: "20 min", xpReward: 20 },
  { id: "t3", name: "Drink 8 cups of water", description: "Stay hydrated throughout the day.", category: "Water Intake", displayCategory: "Health", cadence: "Daily", icon: "water_drop", frequency: "daily", targetType: "count", targetValue: 8, difficulty: "easy", target: "8 cups", xpReward: 10 },
  { id: "t4", name: "Study for 2 hours", description: "Deep work block for classes, exams, or certification prep.", category: "Study", displayCategory: "Learning", cadence: "Weekdays", icon: "school", frequency: "daily", targetType: "simple", targetValue: 1, difficulty: "hard", target: "2 hours", xpReward: 40 },
  { id: "t5", name: "Workout for 30 minutes", description: "Build strength, energy, and consistency.", category: "Fitness", displayCategory: "Health", cadence: "4x/Week", icon: "fitness_center", frequency: "weekly", targetType: "simple", targetValue: 1, difficulty: "hard", target: "30 min", xpReward: 30 },
  { id: "t6", name: "Sleep before 11 PM", description: "Protect recovery with a steady bedtime routine.", category: "Sleep", displayCategory: "Health", cadence: "Daily", icon: "bedtime", frequency: "daily", targetType: "simple", targetValue: 1, difficulty: "medium", target: "Before 11 PM", xpReward: 20 },
  { id: "t7", name: "Pray or meditate", description: "A quiet reset for reflection and spiritual growth.", category: "Spiritual Growth", displayCategory: "Mindfulness", cadence: "Daily", icon: "self_improvement", frequency: "daily", targetType: "simple", targetValue: 1, difficulty: "medium", target: "10 min", xpReward: 15 },
  { id: "t8", name: "Review class notes", description: "Strengthen memory with a short review loop.", category: "Study", displayCategory: "Learning", cadence: "Weekdays", icon: "rate_review", frequency: "daily", targetType: "simple", targetValue: 1, difficulty: "medium", target: "15 min", xpReward: 25 },
];

const HabitTemplates = () => {
  const [selectedIds, setSelectedIds] = useState(["t1"]);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const toggleTemplate = (id) => {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const handleAddSelected = async () => {
    const selectedTemplates = starterTemplates.filter((template) => selectedIds.includes(template.id));

    if (selectedTemplates.length === 0) {
      toast("Select at least one starter habit.");
      return;
    }

    try {
      setSaving(true);
      await createManyHabits(
        selectedTemplates.map(({ id, displayCategory, cadence, icon, target, xpReward, ...habit }) => ({
          ...habit,
          difficulty: habit.difficulty,
        }))
      );
      toast.success("Starter habits added to your dashboard.");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Could not add starter habits.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-app-bg font-body-md text-text-primary">
      <OnboardingNav step="Step 2 of 2" />
      <main className="flex flex-grow justify-center px-lg pb-hero pt-hero">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-xl">
          <header className="flex w-full flex-col gap-sm text-center">
            <h1 className="w-full font-page-heading text-page-heading-mobile font-bold leading-tight text-text-primary sm:text-page-heading">
              Choose starter habits
            </h1>
            <p className="mx-auto block w-full max-w-[560px] whitespace-normal break-normal font-body-md text-body-md leading-[1.6] text-text-secondary [overflow-wrap:normal]">
              Pick a few habits to begin your quest.
            </p>
          </header>

          <section className="grid w-full grid-cols-1 gap-grid-gutter md:grid-cols-2 lg:grid-cols-4">
            {starterTemplates.map((template) => (
              <HabitPreviewCard
                disabled={saving}
                key={template.id}
                onToggle={() => toggleTemplate(template.id)}
                selected={selectedIds.includes(template.id)}
                template={template}
              />
            ))}
          </section>

          <div className="flex flex-col items-center justify-center gap-md border-t border-border-neutral pt-lg sm:flex-row">
            <Button className="w-full px-xl sm:w-auto" disabled={saving} onClick={() => navigate("/habits/new")} variant="secondary">
              Create Custom Habit
            </Button>
            <Button className="w-full px-xl sm:w-auto" loading={saving} onClick={handleAddSelected}>
              Add Selected Habits ({selectedIds.length})
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HabitTemplates;
