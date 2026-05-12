import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import BadgeCard from "../components/gamification/BadgeCard";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import LoadingSkeleton from "../components/common/LoadingSkeleton";
import { getBadgeProgress, seedDefaultBadges } from "../api/badgeApi";

const filters = ["All", "Unlocked", "Locked"];

const Achievements = () => {
  const [badges, setBadges] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  const loadBadges = async () => {
    try {
      setLoading(true);
      const data = await getBadgeProgress();
      setBadges(data.badges || []);
    } catch (error) {
      toast.error(error.message || "Could not load badges.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBadges();
  }, []);

  const filteredBadges = useMemo(() => {
    if (activeFilter === "Unlocked") return badges.filter((badge) => badge.isUnlocked);
    if (activeFilter === "Locked") return badges.filter((badge) => !badge.isUnlocked);
    return badges;
  }, [activeFilter, badges]);

  const handleSeedBadges = async () => {
    try {
      setSeeding(true);
      await seedDefaultBadges();
      toast.success("Default badges are ready.");
      await loadBadges();
    } catch (error) {
      toast.error(error.message || "Could not seed badges.");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-extrabold">Badge collection</h1>
          <h2 className="mt-2 font-display text-3xl font-extrabold">Achievements</h2>
          <p className="mt-2 text-[var(--color-secondary)]">Track your progress and showcase your hard-earned badges.</p>
        </div>
        <Button loading={seeding} onClick={handleSeedBadges} variant="secondary">Seed Badges</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
              activeFilter === filter ? "bg-primary text-white shadow-sm" : "bg-white text-text-secondary hover:bg-surface-container"
            }`}
            key={filter}
            onClick={() => setActiveFilter(filter)}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>

      {loading ? <LoadingSkeleton count={6} className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" /> : null}

      {!loading && badges.length === 0 ? (
        <EmptyState
          action="Seed Badges"
          message="No badges found. Seed default badges to begin."
          onAction={handleSeedBadges}
          title="No badges found"
        />
      ) : null}

      {!loading && badges.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredBadges.map((badge) => <BadgeCard key={badge._id} badge={badge} />)}
        </div>
      ) : null}
    </div>
  );
};

export default Achievements;
