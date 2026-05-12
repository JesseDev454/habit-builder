import { useState } from "react";
import { ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import MaterialIcon from "../components/common/MaterialIcon";
import OnboardingNav from "../components/layout/OnboardingNav";
import { updateUserGoals } from "../api/userApi";
import useAuth from "../hooks/useAuth";

const goals = [
  { label: "Study", icon: "menu_book" },
  { label: "Coding", icon: "terminal" },
  { label: "Reading", icon: "auto_stories" },
  { label: "Fitness", icon: "fitness_center" },
  { label: "Water Intake", icon: "water_drop" },
  { label: "Wellness", icon: "self_improvement" },
  { label: "Productivity", icon: "trending_up" },
  { label: "Spiritual Growth", icon: "psychology" },
  { label: "Sleep", icon: "bedtime" },
];

const Onboarding = () => {
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const toggleGoal = (goal) => {
    setSelectedGoals((current) =>
      current.includes(goal) ? current.filter((item) => item !== goal) : [...current, goal]
    );
  };

  const saveGoals = async (goalsToSave = selectedGoals) => {
    try {
      setSaving(true);
      await updateUserGoals(goalsToSave);
      await refreshUser();
      toast.success(goalsToSave.length ? "Goals saved. Choose your starter quests." : "You can choose goals later.");
      navigate("/habit-templates");
    } catch (error) {
      toast.error(error.message || "Could not save goals.");
    } finally {
      setSaving(false);
    }
  };

  const handleContinue = () => {
    if (selectedGoals.length === 0) {
      toast("Choose at least one goal or skip for now.");
      return;
    }

    saveGoals();
  };

  return (
    <div className="min-h-screen bg-app-bg text-text-primary">
      <OnboardingNav step="Step 1 of 2" />
      <main className="flex min-h-[calc(100vh-64px)] w-full items-center justify-center px-md py-xl">
        <section className="relative mx-auto w-full max-w-[800px] overflow-hidden rounded-xl border border-border-neutral bg-surface-container-lowest p-lg shadow-[0_4px_24px_rgba(15,23,42,0.08)] sm:p-xl">
          <div className="absolute left-0 top-0 h-1 w-full bg-surface-container">
            <div className="h-full w-1/2 rounded-r-full bg-primary" />
          </div>

          <header className="mb-xl flex w-full flex-col items-center text-center">
            <h1 className="mb-sm font-page-heading text-page-heading-mobile font-bold text-text-primary sm:text-page-heading">What do you want to build?</h1>
            <p className="mx-auto block w-full max-w-[28rem] whitespace-normal break-normal text-center font-body-md text-body-md leading-[1.6] text-text-secondary [overflow-wrap:normal]">
              Choose your focus areas. We&apos;ll suggest starter habits for you.
            </p>
          </header>

          <div className="mb-xl grid grid-cols-1 gap-md sm:grid-cols-2 md:grid-cols-3">
            {goals.map((goal) => {
              const selected = selectedGoals.includes(goal.label);
              return (
                <button
                  className={`group relative flex min-h-[150px] flex-col items-center justify-center rounded-xl border-2 p-lg text-center transition-all duration-200 hover:-translate-y-1 ${
                    selected
                      ? "border-primary bg-primary-container/10 shadow-[0_4px_12px_rgba(83,65,205,0.15)]"
                      : "border-border-neutral bg-surface-container-lowest hover:border-primary/50 hover:bg-surface-container-low hover:shadow-[0_4px_12px_rgba(15,23,42,0.05)]"
                  }`}
                  disabled={saving}
                  key={goal.label}
                  onClick={() => toggleGoal(goal.label)}
                  type="button"
                >
                  {selected ? (
                    <MaterialIcon className="absolute right-sm top-sm text-[24px] text-primary" fill name="check_circle" />
                  ) : null}
                  <div className={`mb-sm flex h-16 w-16 items-center justify-center rounded-full transition-colors ${selected ? "bg-primary text-on-primary" : "bg-surface-container text-text-secondary group-hover:bg-primary-container/20 group-hover:text-primary"}`}>
                    <MaterialIcon className="text-[32px]" name={goal.icon} />
                  </div>
                  <span className={`font-card-heading text-card-heading font-semibold transition-colors ${selected ? "text-primary" : "text-text-primary group-hover:text-primary"}`}>{goal.label}</span>
                </button>
              );
            })}
          </div>

          <footer className="flex flex-col items-center justify-between gap-md border-t border-border-neutral pt-lg sm:flex-row">
            <Button className="w-full sm:w-auto" disabled={saving} onClick={() => saveGoals([])} variant="ghost">Skip for Now</Button>
            <Button className="w-full sm:w-auto px-xl" loading={saving} onClick={handleContinue}>
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          </footer>
        </section>
      </main>
    </div>
  );
};

export default Onboarding;
