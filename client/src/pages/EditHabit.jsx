import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmationModal from "../components/common/ConfirmationModal";
import LoadingSkeleton from "../components/common/LoadingSkeleton";
import HabitForm from "../components/habits/HabitForm";
import { archiveHabit, getHabitById, updateHabit } from "../api/habitApi";

const EditHabit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [archiving, setArchiving] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);

  useEffect(() => {
    const loadHabit = async () => {
      try {
        setLoading(true);
        const data = await getHabitById(id);
        setHabit(data.habit);
      } catch (error) {
        toast.error(error.message || "Could not load habit.");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadHabit();
  }, [id, navigate]);

  const handleSubmit = async (payload) => {
    try {
      setSaving(true);
      const data = await updateHabit(id, payload);
      toast.success("Habit updated successfully");
      navigate(`/habits/${data.habit._id}`);
    } catch (error) {
      toast.error(error.message || "Could not update habit.");
    } finally {
      setSaving(false);
    }
  };

  const handleArchive = async () => {
    try {
      setArchiving(true);
      await archiveHabit(id);
      toast.success("Habit archived");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Could not archive habit.");
    } finally {
      setArchiving(false);
      setShowArchiveModal(false);
    }
  };

  if (loading) {
    return <LoadingSkeleton count={2} className="grid gap-4" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-extrabold">Edit Habit</h1>
          <p className="mt-2 text-[var(--color-secondary)]">Update the configuration for your daily habit.</p>
        </div>
        <button className="rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-bold text-error-red hover:bg-red-100" onClick={() => setShowArchiveModal(true)} type="button">
          Archive Habit
        </button>
      </div>
      <HabitForm initialValues={habit} loading={saving} onCancel={() => navigate(`/habits/${id}`)} onSubmit={handleSubmit} submitLabel="Save changes" />
      <ConfirmationModal
        confirmLabel="Archive Habit"
        isOpen={showArchiveModal}
        loading={archiving}
        message="This habit will be hidden from your active dashboard. Your completion history will stay saved."
        onCancel={() => setShowArchiveModal(false)}
        onConfirm={handleArchive}
        title="Archive habit?"
      />
    </div>
  );
};

export default EditHabit;
