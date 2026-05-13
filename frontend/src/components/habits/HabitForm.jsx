import { useEffect, useState } from "react";
import Button from "../common/Button";
import Card from "../common/Card";
import Input from "../common/Input";
import { habitCategories } from "../../data/habitCategories";

const categories = habitCategories.map((category) => category.name);
const frequencies = ["daily", "weekly"];
const difficulties = ["easy", "medium", "hard"];

const defaultValues = {
  name: "",
  description: "",
  category: "Coding",
  frequency: "daily",
  targetType: "simple",
  targetValue: 1,
  difficulty: "easy",
  reminderTime: "",
  startDate: new Date().toISOString().slice(0, 10),
};

const normalizeInitialValues = (values = {}) => ({
  ...defaultValues,
  ...values,
  startDate: values.startDate ? new Date(values.startDate).toISOString().slice(0, 10) : defaultValues.startDate,
});

const HabitForm = ({ initialValues, onSubmit, submitLabel = "Create Habit", loading = false, onCancel }) => {
  const [form, setForm] = useState(() => normalizeInitialValues(initialValues));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(normalizeInitialValues(initialValues));
  }, [initialValues]);

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const selectValue = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Habit name is required.";
    if (!form.category.trim()) nextErrors.category = "Category is required.";
    if (!frequencies.includes(form.frequency)) nextErrors.frequency = "Choose daily or weekly.";
    if (!["simple", "count"].includes(form.targetType)) nextErrors.targetType = "Choose a target type.";
    if (Number(form.targetValue) < 1) nextErrors.targetValue = "Target value must be at least 1.";
    if (!difficulties.includes(form.difficulty)) nextErrors.difficulty = "Choose a valid difficulty.";

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    await onSubmit({
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category.trim(),
      targetValue: Number(form.targetValue),
    });
  };

  return (
    <Card className="max-w-3xl">
      <form onSubmit={handleSubmit}>
        <h2 className="mb-md border-b border-border-neutral/40 pb-xs font-section-heading text-card-heading font-semibold text-text-primary">Basic Details</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <Input label="Habit Name" onChange={updateField("name")} placeholder="e.g., Drink 2L of Water" value={form.name} />
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Category</span>
            <select className="w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[#eeeafe]" onChange={updateField("category")} value={form.category}>
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
            {errors.category ? <p className="mt-1 text-xs font-semibold text-error-red">{errors.category}</p> : null}
          </label>
          {errors.name ? <p className="-mt-3 text-xs font-semibold text-error-red md:col-span-2">{errors.name}</p> : null}
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-semibold">Description <span className="font-normal text-text-muted">(Optional)</span></span>
            <textarea
              className="min-h-32 w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[#eeeafe]"
              onChange={updateField("description")}
              placeholder="Why is this habit important?"
              value={form.description}
            />
          </label>
        </div>

        <h2 className="mb-md mt-lg border-b border-border-neutral/40 pb-xs font-section-heading text-card-heading font-semibold text-text-primary">Configuration &amp; Goals</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Frequency</span>
            <div className="flex rounded-xl bg-surface-container p-1">
              {frequencies.map((item) => (
                <button key={item} className={`flex-1 rounded-lg py-sm text-label-sm font-semibold capitalize ${form.frequency === item ? "bg-card-surface text-primary shadow-sm" : "text-text-secondary"}`} onClick={() => selectValue("frequency", item)} type="button">{item}</button>
              ))}
            </div>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Target Type</span>
            <div className="flex rounded-xl bg-surface-container p-1">
              {["simple", "count"].map((item) => (
                <button key={item} className={`flex-1 rounded-lg py-sm text-label-sm font-semibold capitalize ${form.targetType === item ? "bg-card-surface text-primary shadow-sm" : "text-text-secondary"}`} onClick={() => selectValue("targetType", item)} type="button">{item}</button>
              ))}
            </div>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Target Value</span>
            <Input min="1" onChange={updateField("targetValue")} placeholder="1" type="number" value={form.targetValue} />
            {errors.targetValue ? <p className="mt-1 text-xs font-semibold text-error-red">{errors.targetValue}</p> : null}
          </label>
          <Input label="Reminder Time" onChange={updateField("reminderTime")} type="time" value={form.reminderTime} />
          <Input label="Start Date" onChange={updateField("startDate")} type="date" value={form.startDate} />
          <label className="block md:col-span-2">
            <span className="mb-2 flex items-center justify-between text-sm font-semibold">Difficulty <span className="font-normal text-text-muted">XP reward changes later by difficulty</span></span>
            <div className="grid gap-sm sm:grid-cols-3">
              {difficulties.map((item) => (
                <button key={item} className={`h-[48px] rounded-[12px] border bg-surface font-label-sm capitalize ${form.difficulty === item ? "border-primary bg-primary/5 text-primary" : "border-outline-variant text-text-secondary"}`} onClick={() => selectValue("difficulty", item)} type="button">{item}</button>
              ))}
            </div>
          </label>
        </div>

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Button variant="outline" onClick={onCancel} type="button">Cancel</Button>
          <Button loading={loading} type="submit">{submitLabel}</Button>
        </div>
      </form>
    </Card>
  );
};

export default HabitForm;
